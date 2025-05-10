import {
  Book,
  HelpCircle,
  Users,
  Mail,
  FileText,
  Twitter,
  Linkedin,
  Instagram,
  Video,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaqModal } from "./components/faq-modal";
import { cn } from "@/lib/utils";

interface Resource {
  title: string;
  description: string;
  icon: React.ElementType;
  href?: string;
  external?: boolean;
  component?: React.ElementType;
}

interface Social {
  name: string;
  icon: React.ElementType;
  href: string;
}

const resources: Resource[] = [
  {
    title: "Documentation",
    description: "Read our comprehensive guides and documentation",
    icon: Book,
    href: "https://docs.stable.fun",
    external: true,
  },
  {
    title: "FAQs",
    description: "Find answers to commonly asked questions",
    icon: HelpCircle,
    component: FaqModal,
    href: "#", // Added default href for type safety
  },
  {
    title: "Join Community",
    description: "Connect with other stablecoin creators and users",
    icon: Users,
    href: "https://discord.gg/stabledotfun",
    external: true,
  },
  {
    title: "Blog Posts",
    description: "Read our latest updates and insights",
    icon: FileText,
    href: "https://stabledotfun.substack.com",
    external: true,
  },
  {
    title: "Email Us",
    description: "Get in touch with our support team",
    icon: Mail,
    href: "mailto:support@stable.fun",
    external: true,
  }
];

const socials: Social[] = [
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com/stabledotfun",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://linkedin.com/company/stabledotfun",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/stabledotfun",
  },
  {
    name: "TikTok",
    icon: Video,
    href: "https://tiktok.com/@stabledotfun",
  },
];

export default function ResourcesPage() {
  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Help & Resources</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Find helpful resources, documentation, and ways to connect with our community. 
          We&apos;re here to help you get the most out of your stablecoins.
        </p>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} />
          ))}
        </div>
      </div>
      
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Connect With Us</h2>
        <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
          {socials.map((social, index) => (
            <SocialButton key={index} social={social} />
          ))}
        </div>
      </div>
      
      <div className="bg-white/5 rounded-2xl border border-secondary/30 p-6 text-center">
        <h2 className="text-xl font-bold mb-4">Need More Help?</h2>
        <p className="text-gray-400 mb-6">
          Can&apos;t find what you&apos;re looking for? Our support team is ready to assist you.
        </p>
        <Button asChild>
          <Link href="mailto:support@stable.fun">
            <Mail className="mr-2 h-4 w-4" /> Email Support
          </Link>
        </Button>
      </div>
    </div>
  );
}

function ResourceCard({ resource }: { resource: Resource }) {
  if (resource.component) {
    const Component = resource.component;
    return (
      <div className="bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-primary/10 text-primary">
            <resource.icon className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-medium">{resource.title}</h3>
        </div>
        <p className="text-gray-400 mb-6 flex-grow">{resource.description}</p>
        <div>
          <Component />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-lg p-6 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          <resource.icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-medium">{resource.title}</h3>
      </div>
      <p className="text-gray-400 mb-6 flex-grow">{resource.description}</p>
      <Button
        variant="outline"
        className="w-full flex items-center gap-2"
        asChild
      >
        <Link href={resource.href || "#"} target={resource.external ? "_blank" : undefined}>
          Visit {resource.title} {resource.external && <ExternalLink className="h-4 w-4 ml-1" />}
        </Link>
      </Button>
    </div>
  );
}

function SocialButton({ social }: { social: Social }) {
  return (
    <Link
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center gap-3 px-6 py-3 rounded-full",
        "bg-white/5 border border-white/10 hover:bg-white/10",
        "transition-colors duration-200"
      )}
    >
      <social.icon className="h-5 w-5" />
      <span className="font-medium">{social.name}</span>
    </Link>
  );
}