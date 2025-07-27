"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Loader2, CheckCircle, RotateCcw, AlertCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { auth, handleAuthError } from "@/lib/auth";

export default function VerifyPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [authFlow, setAuthFlow] = useState<"signup" | "login">("signup");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('from');
  const { refreshUser } = useAuth();

  // Get email and auth flow from sessionStorage (more secure than localStorage)
  useEffect(() => {
    // Try to get from URL params first (more reliable)
    const emailParam = searchParams.get('email');
    const flowParam = searchParams.get('flow');
    
    if (emailParam && flowParam) {
      setEmail(emailParam);
      setAuthFlow(flowParam as "signup" | "login");
    } else {
      // Fallback to sessionStorage
      const signupEmail = sessionStorage.getItem("signup_email");
      const loginEmail = sessionStorage.getItem("login_email");
      const flow = sessionStorage.getItem("auth_flow");
      
      if (signupEmail && (!flow || flow === "signup")) {
        setEmail(signupEmail);
        setAuthFlow("signup");
      } else if (loginEmail && flow === "login") {
        setEmail(loginEmail);
        setAuthFlow("login");
      } else {
        // No valid email found, redirect based on flow or default to signup
        router.push(flow === "login" ? "/auth/login" : "/auth/signup");
        return;
      }
    }
  }, [router, searchParams]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(""); // Clear error when user types

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, 6);
    
    if (digits.length === 6) {
      const newOtp = digits.split("");
      setOtp(newOtp);
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    
    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const result = await auth.verifyOTP(email, otpCode);

      if (result.success) {
        // Clean up storage - no tokens needed, sessions handle everything
        sessionStorage.removeItem("signup_email");
        sessionStorage.removeItem("login_email");
        sessionStorage.removeItem("auth_flow");
        
        // Refresh user context to get session data
        await refreshUser();
        
        // Handle routing based on backend response message
        if (result.message?.includes("Please complete your profile")) {
          // User needs onboarding (new user or incomplete profile)
          setSuccess("Please complete your profile...");
          setTimeout(() => {
            router.push("/auth/onboarding");
          }, 1000);
        } else if (result.message === "Login successful" && result.user) {
          // Existing user with complete profile
          setSuccess("Login successful! Welcome back!");
          setTimeout(() => {
            const redirectUrl = returnUrl && 
              returnUrl !== '/auth/login' && 
              returnUrl !== '/auth/signup' && 
              returnUrl !== '/auth/verify'
              ? returnUrl 
              : '/';
            router.push(redirectUrl);
          }, 1000);
        } else {
          // Fallback: check if user has complete profile
          if (result.user?.username) {
            // User has username = complete profile
            setSuccess("Welcome back!");
            setTimeout(() => {
              const redirectUrl = returnUrl && 
                returnUrl !== '/auth/login' && 
                returnUrl !== '/auth/signup' && 
                returnUrl !== '/auth/verify'
                ? returnUrl 
                : '/';
              router.push(redirectUrl);
            }, 1000);
          } else {
            // No username = incomplete profile
            setSuccess("Let's complete your profile...");
            setTimeout(() => {
              router.push("/auth/onboarding");
            }, 1000);
          }
        }
      } else {
        setError(result.message || "Invalid verification code. Please try again.");
        // Clear OTP on error
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      setError(handleAuthError(error));
      // Clear OTP on error
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setError("");
    setSuccess("");

    try {
      let result;
      if (authFlow === "login") {
        result = await auth.loginEmail(email);
      } else {
        result = await auth.register(email);
      }

      if (result.success) {
        setSuccess("New code sent to your email!");
        setTimeLeft(60);
        setCanResend(false);
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else {
        setError(result.message || "Failed to resend code. Please try again.");
      }
    } catch (error) {
      setError(handleAuthError(error));
    } finally {
      setIsResending(false);
    }
  };

  const isComplete = otp.every(digit => digit !== "");

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8"
      style={{ backgroundColor: 'hsl(194, 100%, 5%)' }}
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + i * 0.1}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 space-y-6">
          {/* Back button */}
          <div className="flex justify-start">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(authFlow === "login" ? "/auth/login" : "/auth/signup")}
              className="text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <Image
                src="/android/android-launchericon-192-192.png"
                alt="Stable.fun"
                width={60}
                height={60}
                className="relative w-15 h-15 drop-shadow-2xl"
                priority
              />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              {authFlow === "login" ? "Welcome back!" : "Check your email"}
            </h1>
            <p className="text-white/70">
              We sent a 6-digit {authFlow === "login" ? "login" : "verification"} code to
            </p>
            <p className="text-primary font-medium">{email}</p>
          </div>
        </div>

        {/* OTP Form */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div className="space-y-4">
              <div className="flex justify-center gap-2 md:gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={isLoading}
                    className="w-12 h-12 md:w-14 md:h-14 text-center text-xl font-bold bg-white/10 border border-white/20 rounded-xl text-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 disabled:opacity-50"
                  />
                ))}
              </div>

              {/* Timer */}
              <div className="text-center">
                {!canResend ? (
                  <p className="text-sm text-white/60">
                    Resend code in{" "}
                    <span className="text-primary font-medium">
                      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                    </span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isResending}
                    className="text-sm text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-1 mx-auto disabled:opacity-50"
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <RotateCcw className="w-3 h-3" />
                        Resend code
                      </>
                    )}
                  </button>
                )}
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
              disabled={!isComplete || isLoading}
              className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {authFlow === "login" ? "Login & Continue" : "Verify & Continue"}
                </div>
              )}
            </Button>
          </form>

          {/* Help text */}
          <div className="mt-4 pt-4 border-t border-white/10 text-center">
            <p className="text-xs text-white/50">
              Didn't receive the code? Check your spam folder or{" "}
              <button
                onClick={handleResend}
                disabled={!canResend || isResending}
                className="text-primary hover:underline disabled:text-white/30 disabled:no-underline"
              >
                resend
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Success animation elements */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-32 h-32 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}