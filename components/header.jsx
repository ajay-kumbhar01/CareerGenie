import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  StarsIcon,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  await checkUser();

  return (
    <header className="fixed top-0 w-full border-b border-white/5 bg-background/70 backdrop-blur-xl z-50 supports-[backdrop-filter]:bg-background/50 transition-all duration-500">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 logo-shimmer">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-black animated-gradient-text">
              CareerGenie
            </h1>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 md:space-x-3">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="ghost"
                className="hidden md:inline-flex items-center gap-2 rounded-xl hover:bg-violet-500/10 hover:text-violet-400 transition-all duration-300"
              >
                <LayoutDashboard className="h-4 w-4" />
                Industry Insights
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0 rounded-xl hover:bg-violet-500/10">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/20 transition-all duration-300 hover:shadow-violet-500/30">
                  <StarsIcon className="h-4 w-4" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-52 rounded-xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-xl shadow-violet-500/10 p-2"
              >
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer hover:bg-violet-500/10 transition-colors">
                  <Link href="/resume" className="flex items-center gap-3 py-2 px-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-violet-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Build Resume</p>
                      <p className="text-xs text-muted-foreground">ATS-optimized</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer hover:bg-cyan-500/10 transition-colors">
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-3 py-2 px-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                      <PenBox className="h-4 w-4 text-cyan-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Cover Letter</p>
                      <p className="text-xs text-muted-foreground">AI-generated</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer hover:bg-pink-500/10 transition-colors">
                  <Link href="/interview" className="flex items-center gap-3 py-2 px-3">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                      <GraduationCap className="h-4 w-4 text-pink-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">Interview Prep</p>
                      <p className="text-xs text-muted-foreground">Practice & improve</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/20 px-6 font-medium">
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-violet-500/20 rounded-xl",
                  userButtonPopoverCard: "shadow-xl rounded-xl border border-white/10",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
