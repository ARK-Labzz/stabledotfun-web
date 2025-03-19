import Link from "next/link";
import Image from "next/image";
import { ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Forbidden() {
  return (
    <div className="absolute top-0 left-0 flex flex-1 w-full h-screen bg-secondary/70 backdrop-blur-md items-center justify-center">
      <div className="lg:w-1/3 bg-secondary/90 border border-white/50 rounded-2xl p-8 gap-6 flex flex-col items-center">
        <Image
          src="/stable-fun-logo.svg"
          alt="Stable.fun"
          width={140}
          height={34}
          className="w-[200px]"
        />

        <div className="flex justify-center items-center gap-3">
          <ShieldAlert size={24} />
          <h2 className="text-2xl text-white">403 - Access Denied</h2>
        </div>

        <div className="flex flex-1 flex-col gap-4 justify-center items-center">
          <p className="text-white/90 text-sm text-center w-full">
            {
              "You don't have permission to access this page. Please contact support if you believe this is an error."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant={"link"} className="text-sm" asChild>
              <Link href="/">Return to Dashboard</Link>
            </Button>

            <Button variant={"link"} className="text-sm" asChild>
              <Link href="/support" className="text-sm">
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
