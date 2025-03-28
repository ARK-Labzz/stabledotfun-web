"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ data
const faqs = [
  {
    question: "What is Stable.fun?",
    answer:
      "Stable.fun is a platform that provides stable and fun solutions for your needs. We focus on delivering reliable and enjoyable experiences for our users.",
  },
  {
    question: "How do I get started?",
    answer:
      "Getting started is easy! Simply create an account, set up your profile, and you'll be ready to explore all the features we offer.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "Yes, we offer a 14-day free trial for all new users. This gives you full access to all features so you can experience the platform before committing.",
  },
  {
    question: "How do I upgrade my subscription?",
    answer:
      "You can upgrade your subscription at any time by visiting your account settings and selecting the 'Subscription' tab. From there, you can choose the plan that best fits your needs.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers for business accounts. All payments are processed securely through our payment providers.",
  },
  {
    question: "How can I cancel my subscription?",
    answer:
      "You can cancel your subscription at any time through your account settings. Navigate to the 'Subscription' tab and click on 'Cancel Subscription'. Your access will continue until the end of your current billing period.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take data security very seriously. We use industry-standard encryption and security practices to ensure your data is protected at all times.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can reach our support team by emailing team@stable.fun or by using the contact form on our website. We aim to respond to all inquiries within 24 hours.",
  },
];

export function FaqModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="w-full">
          View FAQs
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Frequently Asked Questions</DialogTitle>
          <DialogDescription>
            Find answers to common questions about our platform.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </DialogContent>
    </Dialog>
  );
}
