import { Button } from "@/components/ui/button";
import { BookOpen, FileText } from "lucide-react";
import { FaqModal } from "./components/faq-modal";
import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
      <div className="flex flex-col gap-4 text-center max-w-2xl">
        <div className="">
          <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
          <p className="text-gray-400 mb-6">
            Need help with your stablecoins? Check out our resources or contact
            support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-card p-4 rounded-lg border border-border text-left flex flex-col justify-between gap-2">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={20} />
              <h3 className="font-medium">Documentation</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Read our comprehensive guides and documentation.
            </p>
            <Button variant="outline" size="lg" className="w-full" asChild>
              <Link href={"https://docs.stable.fun"} target="_blank">
                View Docs
              </Link>
            </Button>
          </div>

          <div className="bg-card p-4 rounded-lg border border-border text-left flex flex-col justify-between gap-2">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={20} />
              <h3 className="font-medium">FAQs</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Find answers to commonly asked questions.
            </p>
            <FaqModal />
          </div>
        </div>

        <div className="text-sm text-gray-400">
          Need immediate assistance? Email us at{" "}
          <a href="mailto:support@stable.fun" className="text-primary">
            support@stable.fun
          </a>
        </div>
      </div>
    </div>
  );
}
