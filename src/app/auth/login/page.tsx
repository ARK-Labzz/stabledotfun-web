"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowRight, Loader2, LogIn, UserPlus, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, handleAuthError } from "@/lib/auth";

export default function LoginPage() {
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
    const elements = Array.from({ length: 10 }, (_, i) => ({
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
      const result = await auth.loginEmail(email);

      if (result.success) {
        setSuccess("Login code sent to your email!");
        
        // Store email and auth flow for verify page (use sessionStorage for better security)
        if (typeof window !== 'undefined') {
          sessionStorage.setItem("login_email", email);
          sessionStorage.setItem("auth_flow", "login");
        }
        
        // Redirect to verify page with return URL if present
        const verifyUrl = `/auth/verify${returnUrl ? `?from=${encodeURIComponent(returnUrl)}` : ''}`;
        router.push(verifyUrl);
      } else {
        setError(result.message || "Login failed");
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
              <span className="text-center leading-tight">Back again? We love to see it</span>
              <LogIn className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
            </h1>
            <p className="text-base sm:text-lg text-white/70">
              They can&apos;t say you were lucky
            </p>
            <p className="text-sm text-primary/80 font-medium">
              They&apos;ll see you worked for it
            </p>
          </div>
        </div>

        {/* Main login form */}
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
                  placeholder="Enter your email"
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
                  Sending login code...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Send login code
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-transparent px-2 text-white/50">Or</span>
            </div>
          </div>

          {/* Sign up link */}
          <div className="text-center">
            <p className="text-sm text-white/60 mb-3">
              Don&apos;t have an account yet?
            </p>
            <Button
              variant="outline"
              asChild
              className="w-full h-10 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 rounded-lg transition-all duration-300"
            >
              <Link 
                href={`/auth/signup${returnUrl ? `?from=${encodeURIComponent(returnUrl)}` : ''}`} 
                className="flex items-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                Create new account
              </Link>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-white/50">
            Secure login powered by blockchain technology
          </p>
        </div>
      </div>

      {/* Floating coins animation - different positions for login */}
      <div className="absolute bottom-20 right-4 sm:right-10 opacity-20">
        <div className="w-4 h-4 sm:w-6 sm:h-6 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
      </div>
      <div className="absolute top-32 left-4 sm:left-10 opacity-20">
        <div className="w-3 h-3 sm:w-4 sm:h-4 bg-primary/30 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
      </div>
    </div>
  );
}