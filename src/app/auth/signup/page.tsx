"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowRight, Loader2, Sparkles, TrendingUp, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, handleAuthError } from "@/lib/auth";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [floatingElements, setFloatingElements] = useState<Array<{id: number, x: number, y: number}>>([]);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('from');

  // Generate floating elements for background animation
  useEffect(() => {
    const elements = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setFloatingElements(elements);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await auth.register(email);

      if (result.success) {
        setSuccess("Verification code sent to your email!");
        
        // Store email and auth flow for the verify page (use sessionStorage for better security)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem("signup_email", email);
          sessionStorage.setItem("auth_flow", "signup");
        }
        
        // Redirect to verify page with return URL if present
        const verifyUrl = `/auth/verify${returnUrl ? `?from=${encodeURIComponent(returnUrl)}` : ''}`;
        router.push(verifyUrl);
      } else {
        setError(result.message || "Registration failed");
      }
    } catch (error) {
      setError(handleAuthError(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8"
      style={{ backgroundColor: 'hsl(194, 100%, 5%)' }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animationDelay: `${element.id * 0.5}s`,
              animationDuration: `${3 + (element.id * 0.2)}s`,
            }}
          />
        ))}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8 space-y-6">
          {/* Logo with glow effect */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <Image
                src="/android/android-launchericon-192-192.png"
                alt="Stable.fun"
                width={80}
                height={80}
                className="relative w-20 h-20 drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Animated title */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-2 flex-wrap">
              <span className="text-center leading-tight">Stop praying for money, start earning it now</span>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary animate-pulse flex-shrink-0" />
            </h1>
            <p className="text-base sm:text-lg text-white/70">
              You&apos;re just a few taps away from stable income.
            </p>
            <p className="text-sm text-primary/80 font-medium">
              Don&apos;t miss out.
            </p>
          </div>
        </div>

        {/* Main signup form */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input with floating label effect */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-white/80">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@gmail.com"
                  required
                  disabled={isLoading}
                  className="pl-10 h-12 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 rounded-xl transition-all duration-300 disabled:opacity-50"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none" />
              </div>
            </div>

            {/* Success message */}
            {success && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-200 text-sm flex items-start gap-2">
                <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{success}</span>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-200 text-sm flex items-start gap-2 animate-in slide-in-from-top-2">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isLoading || !email.trim()}
              className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Just a moment...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Continue with email
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Features preview */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="space-y-1">
                <TrendingUp className="w-6 h-6 text-primary mx-auto" />
                <p className="text-xs text-white/60">Yield-bearing</p>
              </div>
              <div className="space-y-1">
                <Sparkles className="w-6 h-6 text-primary mx-auto" />
                <p className="text-xs text-white/60">Next-gen DeFi</p>
              </div>
            </div>
          </div>

          {/* Login link */}
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-sm text-white/60">
              Already have an account?{" "}
              <Link 
                href={`/auth/login${returnUrl ? `?from=${encodeURIComponent(returnUrl)}` : ''}`} 
                className="text-primary hover:text-primary/80 font-medium transition-colors hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-xs text-white/50">
            By continuing, you agree with the{" "}
            <Link href="/terms" className="text-primary hover:underline">Terms</Link>{" "}
            &{" "}
            <Link href="/privacy" className="text-primary hover:underline">Privacy policy</Link>
          </p>
        </div>
      </div>

      {/* Floating coins animation */}
      <div className="absolute bottom-10 left-4 sm:left-10 opacity-20">
        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute top-20 right-4 sm:right-10 opacity-20">
        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}