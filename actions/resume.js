"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const GEMINI_MODELS = [
  process.env.GEMINI_MODEL,
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
].filter(Boolean);

async function generateWithFallback(prompt) {
  let lastError = null;

  for (const modelName of [...new Set(GEMINI_MODELS)]) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      const content = result.response.text().trim();

      if (content) {
        return content;
      }
    } catch (error) {
      lastError = error;

      // Fallback attempts can fail for unavailable models; avoid noisy stack logs.
      const is404 = error?.status === 404 || error?.statusText === "Not Found";
      if (is404) {
        console.warn(`Gemini model unavailable: ${modelName}`);
      } else {
        console.error(`Gemini request failed for model ${modelName}:`, error?.message || error);
      }
    }
  }

  throw lastError || new Error("No Gemini model could generate content");
}

export async function saveResume(content) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

export async function getResume() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

export async function improveWithAI({ current, type }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  if (!process.env.GEMINI_API_KEY) {
    console.error("GEMINI_API_KEY is missing. Returning original content.");
    return current;
  }

  let user;
  try {
    user = await db.user.findUnique({
      where: { clerkUserId: userId },
      include: {
        industryInsight: true,
      },
    });
  } catch (error) {
    // Neon/DB network interruptions (ex: Prisma P1001) should not break UX.
    console.error("Error loading user for AI improvement:", error);
    return current;
  }

  if (!user) throw new Error("User not found");

  const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.industry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    
    Format the response as a single paragraph without any additional text or explanations.
  `;

  try {
    return await generateWithFallback(prompt);
  } catch (error) {
    console.warn("AI improve unavailable, returning original content.", error?.message || error);
    // Prevent a hard 500 for users when AI service is unavailable.
    return current;
  }
}
