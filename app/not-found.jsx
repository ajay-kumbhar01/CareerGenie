import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

      <div className="relative z-10 space-y-6">
        <h1 className="text-8xl md:text-9xl font-black animated-gradient-text">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto text-lg">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/">
            <Button className="rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white shadow-lg shadow-violet-500/25 px-6 py-5 font-medium">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
