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
      "Stable.fun is a platform that enables users to create and manage stablecoins backed by various sovereign bonds. Our platform provides a simple way to gain exposure to global fixed income markets.",
  },
  {
    question: "How do stablecoins work on Stable.fun?",
    answer:
      "Our stablecoins are backed by government bonds, providing stability and yield. When you mint a stablecoin, the funds are used to purchase the corresponding sovereign bond, and the stablecoin inherits the yield from that bond.",
  },
  {
    question: "What bonds back the stablecoins?",
    answer:
      "We currently support stablecoins backed by US Treasury Bonds (USTRY), UK Gilts (GILTS), Euro Bonds (EUROB), Mexican CETES, and Brazilian Tesouro bonds. Each stablecoin inherits the yield profile of its underlying bond.",
  },
  {
    question: "How is APY calculated?",
    answer:
      "The APY (Annual Percentage Yield) is based on the current yield of the underlying sovereign bond. This rate adjusts with market conditions and is paid automatically through the appreciation of the stablecoin value.",
  },
  {
    question: "Are there any fees?",
    answer:
      "We charge a small fee (0.1%) for minting and redeeming stablecoins. There are no ongoing management fees, as we only earn from the spread between the bond yield and the stablecoin APY.",
  },
  {
    question: "How secure are the stablecoins?",
    answer:
      "Our stablecoins are secured by the underlying sovereign bonds and implemented on the Solana blockchain. The smart contracts have been audited by leading security firms to ensure they function as intended.",
  },
  {
    question: "Can I transfer stablecoins to others?",
    answer:
      "Yes, you can transfer stablecoins to any Solana wallet address. They function like any other token on the Solana blockchain, making them easily transferable and usable across the ecosystem.",
  },
  {
    question: "How do I redeem my stablecoins?",
    answer:
      "You can redeem your stablecoins directly on our platform. Navigate to the Swap page, select the stablecoin you want to redeem, and exchange it for the token of your choice.",
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