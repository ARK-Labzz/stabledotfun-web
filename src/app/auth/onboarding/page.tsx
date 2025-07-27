"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { 
  ArrowRight, 
  ArrowLeft,
  Loader2, 
  User, 
  Shield, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle, 
  Sparkles, 
  Camera, 
  Upload,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/auth-context";

interface OnboardingData {
  username: string;
  displayName: string;
  bio: string;
  referralCode: string;
  walletPassword: string;
  confirmPassword: string;
  createWallet: boolean;
}

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [uploadedAvatarUrl, setUploadedAvatarUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState<OnboardingData>({
    username: "",
    displayName: "",
    bio: "",
    referralCode: "",
    walletPassword: "",
    confirmPassword: "",
    createWallet: true,
  });
  
  const router = useRouter();
  const { completeProfile, uploadAvatar, refreshUser } = useAuth();

  const handleInputChange = (field: keyof OnboardingData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match(/^image\/(jpeg|png|gif)$/)) {
      setError("Please select a JPEG, PNG, or GIF image");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5MB");
      return;
    }

    setAvatarFile(file);
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    setError("");
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;

    setIsUploadingAvatar(true);
    setError("");

    try {
      const result = await uploadAvatar(avatarFile);
      
      if (result.success && result.avatarUrl) {
        setUploadedAvatarUrl(result.avatarUrl);
        setSuccess("Avatar uploaded successfully!");
        // Clear the preview and file since it's now uploaded
        setAvatarFile(null);
        setAvatarPreview("");
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(result.message || "Failed to upload avatar");
      }
    } catch (error) {
      setError("Failed to upload avatar. Please try again.");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview("");
    setUploadedAvatarUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateStep1 = () => {
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters");
      return false;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setError("Username can only contain letters, numbers, and underscores");
      return false;
    }
    if (!formData.displayName.trim()) {
      setError("Display name is required");
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (formData.createWallet) {
      if (!formData.walletPassword) {
        setError("Wallet password is required");
        return false;
      }
      if (formData.walletPassword.length < 8) {
        setError("Wallet password must be at least 8 characters");
        return false;
      }
      if (formData.walletPassword !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
      setError("");
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const payload: any = {
        username: formData.username.trim(),
        displayName: formData.displayName.trim(),
        bio: formData.bio.trim(),
      };

      if (formData.referralCode.trim()) {
        payload.referralCode = formData.referralCode.trim();
      }

      if (formData.createWallet && formData.walletPassword) {
        payload.walletPassword = formData.walletPassword;
      }

      const result = await completeProfile(payload);

      if (result.success) {
        setSuccess("Profile completed successfully! Welcome to Stable.fun!");
        
        // Refresh user context
        await refreshUser();
        
        // Redirect to dashboard after success
        setTimeout(() => {
          router.push('/');
        }, 1500);
      } else {
        setError(result.message || "Failed to complete profile. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8"
      style={{ backgroundColor: 'hsl(194, 100%, 5%)' }}
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + i * 0.1}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 space-y-6">
          {/* Logo */}
          <div className="flex justify-center">
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

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center justify-center gap-2">
              Complete Your Profile
              <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </h1>
            <p className="text-white/70">
              {step === 1 ? "Let's get to know you better" : "Secure your digital assets"}
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex justify-center space-x-2">
            <div className={`w-3 h-3 rounded-full transition-colors ${step >= 1 ? 'bg-primary' : 'bg-white/20'}`} />
            <div className={`w-3 h-3 rounded-full transition-colors ${step >= 2 ? 'bg-primary' : 'bg-white/20'}`} />
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl">
          <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
            {step === 1 ? (
              <>
                {/* Step 1: Basic Profile with Avatar */}
                <div className="space-y-6">
                  {/* Avatar Upload Section */}
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-white/80">
                      Profile Photo (Optional)
                    </label>
                    
                    <div className="flex flex-col items-center space-y-4">
                      {/* Avatar Preview */}
                      <div className="relative group">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-white/10 border-2 border-white/20 flex items-center justify-center relative">
                          {avatarPreview ? (
                            <Image
                              src={avatarPreview}
                              alt="Avatar preview"
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          ) : uploadedAvatarUrl ? (
                            <Image
                              src={uploadedAvatarUrl}
                              alt="Uploaded avatar"
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-8 h-8 text-white/40" />
                          )}
                          
                          {/* Remove button for uploaded avatar */}
                          {(avatarPreview || uploadedAvatarUrl) && (
                            <button
                              type="button"
                              onClick={handleRemoveAvatar}
                              className="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors transform translate-x-1 -translate-y-1"
                            >
                              <X className="w-3 h-3 text-white" />
                            </button>
                          )}
                        </div>
                        
                        {/* Camera icon overlay */}
                        {!avatarPreview && !uploadedAvatarUrl && (
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                          >
                            <Camera className="w-4 h-4 text-white" />
                          </button>
                        )}
                      </div>

                      {/* Hidden file input */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/gif"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />

                      {/* Action buttons */}
                      <div className="flex flex-col items-center space-y-2">
                        {!avatarPreview && !uploadedAvatarUrl && (
                          <Button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            variant="outline"
                            size="sm"
                            className="border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                          >
                            <Camera className="w-4 h-4 mr-2" />
                            Choose Photo
                          </Button>
                        )}

                        {avatarFile && !uploadedAvatarUrl && (
                          <Button
                            type="button"
                            onClick={handleAvatarUpload}
                            disabled={isUploadingAvatar}
                            size="sm"
                            className="bg-primary hover:bg-primary/80"
                          >
                            {isUploadingAvatar ? (
                              <div className="flex items-center gap-2">
                                <Loader2 className="w-3 h-3 animate-spin" />
                                Uploading...
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Upload className="w-3 h-3" />
                                Upload Photo
                              </div>
                            )}
                          </Button>
                        )}

                        <p className="text-xs text-white/50 text-center">
                          JPEG, PNG, or GIF • Max 5MB
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="username" className="text-sm font-medium text-white/80">
                        Username *
                      </label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                        <Input
                          id="username"
                          type="text"
                          value={formData.username}
                          onChange={(e) => handleInputChange('username', e.target.value.toLowerCase())}
                          placeholder="your_username"
                          required
                          className="pl-10 h-12 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 rounded-xl transition-all duration-300"
                        />
                      </div>
                      <p className="text-xs text-white/50">Letters, numbers, and underscores only</p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="displayName" className="text-sm font-medium text-white/80">
                        Display Name *
                      </label>
                      <Input
                        id="displayName"
                        type="text"
                        value={formData.displayName}
                        onChange={(e) => handleInputChange('displayName', e.target.value)}
                        placeholder="Your Display Name"
                        required
                        className="h-12 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 rounded-xl transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="bio" className="text-sm font-medium text-white/80">
                        Bio (Optional)
                      </label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        placeholder="Tell us about yourself..."
                        className="h-20 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 rounded-xl transition-all duration-300 resize-none"
                        maxLength={150}
                      />
                      <p className="text-xs text-white/50">{formData.bio.length}/150 characters</p>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="referralCode" className="text-sm font-medium text-white/80">
                        Referral Code (Optional)
                      </label>
                      <Input
                        id="referralCode"
                        type="text"
                        value={formData.referralCode}
                        onChange={(e) => handleInputChange('referralCode', e.target.value.toUpperCase())}
                        placeholder="FRIEND-12345678"
                        className="h-12 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 rounded-xl transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Step 2: Wallet Setup */}
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="w-6 h-6 text-primary" />
                      <h3 className="text-lg font-semibold text-white">Secure Wallet</h3>
                    </div>
                    <p className="text-sm text-white/70 mb-4">
                      Create a secure wallet to manage your digital assets. Your wallet will be encrypted with your password.
                    </p>
                    
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="createWallet"
                        checked={formData.createWallet}
                        onChange={(e) => handleInputChange('createWallet', e.target.checked)}
                        className="w-4 h-4 text-primary bg-white/10 border-white/20 rounded focus:ring-primary/20 focus:ring-2"
                      />
                      <label htmlFor="createWallet" className="text-sm text-white/80">
                        Create secure wallet (Recommended)
                      </label>
                    </div>
                  </div>

                  {formData.createWallet && (
                    <>
                      <div className="space-y-2">
                        <label htmlFor="walletPassword" className="text-sm font-medium text-white/80">
                          Wallet Password *
                        </label>
                        <div className="relative group">
                          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                          <Input
                            id="walletPassword"
                            type={showPassword ? "text" : "password"}
                            value={formData.walletPassword}
                            onChange={(e) => handleInputChange('walletPassword', e.target.value)}
                            placeholder="Enter wallet password"
                            required={formData.createWallet}
                            className="pl-10 pr-12 h-12 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 rounded-xl transition-all duration-300"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        <p className="text-xs text-white/50">Minimum 8 characters</p>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-white/80">
                          Confirm Password *
                        </label>
                        <div className="relative group">
                          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-primary transition-colors" />
                          <Input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            placeholder="Confirm wallet password"
                            required={formData.createWallet}
                            className="pl-10 pr-12 h-12 bg-white/5 border-white/20 text-white placeholder:text-white/40 focus:border-primary focus:ring-primary/20 rounded-xl transition-all duration-300"
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </>
            )}

            {/* Success message */}
            {success && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 text-green-200 text-sm flex items-start gap-2">
                <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
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

            {/* Navigation buttons */}
            <div className="flex flex-col space-y-3">
              {/* Main action button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating your profile...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {step === 1 ? "Continue" : "Complete Setup"}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>

              {/* Back button for step 2 */}
              {step === 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleBack}
                  disabled={isLoading}
                  className="w-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Profile Info
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}