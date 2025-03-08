import { Button } from "@/components/ui/button"
import { BookOpen, FileText, MessageCircle, Phone } from "lucide-react"

export default function HelpPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-120px)]">
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
        <p className="text-gray-400 mb-6">
          Need help with your stablecoins? Check out our resources or contact support.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-card p-4 rounded-lg border border-border text-left">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen size={20} className="text-teal" />
              <h3 className="font-medium">Documentation</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">Read our comprehensive guides and documentation.</p>
            <Button variant="outline" size="sm" className="w-full">
              View Docs
            </Button>
          </div>

          <div className="bg-card p-4 rounded-lg border border-border text-left">
            <div className="flex items-center gap-2 mb-2">
              <FileText size={20} className="text-teal" />
              <h3 className="font-medium">FAQs</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">Find answers to commonly asked questions.</p>
            <Button variant="outline" size="sm" className="w-full">
              View FAQs
            </Button>
          </div>

          <div className="bg-card p-4 rounded-lg border border-border text-left">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle size={20} className="text-teal" />
              <h3 className="font-medium">Chat Support</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">Chat with our support team in real-time.</p>
            <Button variant="outline" size="sm" className="w-full">
              Start Chat
            </Button>
          </div>

          <div className="bg-card p-4 rounded-lg border border-border text-left">
            <div className="flex items-center gap-2 mb-2">
              <Phone size={20} className="text-teal" />
              <h3 className="font-medium">Contact Us</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">Get in touch with our support team.</p>
            <Button variant="outline" size="sm" className="w-full">
              Contact
            </Button>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          Need immediate assistance? Email us at{" "}
          <a href="mailto:support@stable.fun" className="text-teal">
            support@stable.fun
          </a>
        </div>
      </div>
    </div>
  )
}

