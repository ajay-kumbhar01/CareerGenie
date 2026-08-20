"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
});

const getDefaultInsights = (industry) => ({
  salaryRanges: [
    { role: "Entry Level", min: 30000, max: 50000, median: 40000, location: "United States" },
    { role: "Junior", min: 45000, max: 70000, median: 55000, location: "United States" },
    { role: "Mid Level", min: 65000, max: 95000, median: 80000, location: "United States" },
    { role: "Senior", min: 90000, max: 130000, median: 110000, location: "United States" },
    { role: "Lead/Manager", min: 110000, max: 160000, median: 135000, location: "United States" },
  ],
  growthRate: 8.5,
  demandLevel: "Medium",
  topSkills: ["Communication", "Problem Solving", "Leadership", "Technical Skills", "Adaptability"],
  marketOutlook: "Positive",
  keyTrends: ["AI Integration", "Remote Work", "Sustainability", "Digital Transformation", "Upskilling"],
  recommendedSkills: ["Data Analysis", "Project Management", "Cloud Computing", "AI/ML Basics", "Communication"],
});

export const generateAIInsights = async (industry) => {
  try {
    const prompt = `
            Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
            {
              "salaryRanges": [
                { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
              ],
              "growthRate": number,
              "demandLevel": "High" | "Medium" | "Low",
              "topSkills": ["skill1", "skill2"],
              "marketOutlook": "Positive" | "Neutral" | "Negative",
              "keyTrends": ["trend1", "trend2"],
              "recommendedSkills": ["skill1", "skill2"]
            }
            
            IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
            Include at least 5 common roles for salary ranges.
            Growth rate should be a percentage.
            Include at least 5 skills and trends.
          `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

    return JSON.parse(cleanedText);
  } catch (error) {
    console.warn("AI insights generation failed, using defaults:", error.message);
    return getDefaultInsights(industry);
  }
};

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    include: {
      industryInsight: true,
    },
  });

  if (!user) throw new Error("User not found");

  // If no insights exist, generate them
  if (!user.industryInsight) {
    const insights = await generateAIInsights(user.industry);

    const industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return industryInsight;
  }

  return user.industryInsight;
}
