import Link from "next/link";
import Image from "next/image";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'hsl(194, 100%, 5%)' }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/10 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        <div className="flex items-center justify-center">
          <div 
            className="text-8xl md:text-9xl font-bold text-primary animate-pulse"
            style={{
              transform: 'translateY(-20px)',
              textShadow: '0 0 30px rgba(127, 205, 211, 0.5)'
            }}
          >
            4
          </div>
          <div 
            className="mx-4 animate-bounce"
            style={{
              animationDuration: '2s',
              animationTimingFunction: 'ease-in-out'
            }}
          >
            <Image
              src="/android/android-launchericon-192-192.png"
              alt="Stable.fun"
              width={120}
              height={120}
              className="w-24 h-24 md:w-32 md:h-32 drop-shadow-2xl"
            />
          </div>
          <div 
            className="text-8xl md:text-9xl font-bold text-primary animate-pulse"
            style={{
              transform: 'translateY(20px)',
              textShadow: '0 0 30px rgba(127, 205, 211, 0.5)',
              animationDelay: '0.5s'
            }}
          >
            4
          </div>
        </div>
        <div className="text-center space-y-4 max-w-md px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            Page Not Found
          </h1>
          <p className="text-lg text-white/70">
            The page you're looking for seems to be non-existent.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button 
            asChild
            className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home size={18} />
              Back to Dashboard
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            asChild
            className="border-primary/50 text-primary hover:bg-primary/10 font-medium px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <Link href="javascript:history.back()" className="flex items-center gap-2">
              <ArrowLeft size={18} />
              Go Back
            </Link>
          </Button>
        </div>
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-ping" 
             style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-primary/20 rounded-full animate-ping" 
             style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-primary/40 rounded-full animate-ping" 
             style={{ animationDelay: '3s' }} />
      </div>
    </div>
  );
}