"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface MaxInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  availableAmount?: string | number;
  onMaxClick?: () => void;
  showInfoIcon?: boolean;
  className?: string;
}

export function MaxInput({
  availableAmount,
  onMaxClick,
  showInfoIcon = false,
  className,
  ...props
}: MaxInputProps) {
  return (
    <div
      className={cn(
        "relative px-4 py-2 rounded-xl bg-white/10 border-white/10 border",
        className
      )}
    >
      <div className="relative">
        <Input
          className="h-14 outline-none ring-0 px-0 text-lg !border-none focus-visible:ring-transparent focus-visible:border-b focus-visible:border-b-primary/50"
          {...props}
        />
        {onMaxClick && (
          <Button
            onClick={onMaxClick}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-secondary/50 hover:bg-secondary/60 text-white rounded-md px-2 py-1 text-xs h-8 border border-[#7FCDD380] cursor-pointer"
          >
            MAX
          </Button>
        )}
      </div>
      {availableAmount && (
        <div className="flex flex-wrap gap-1.5 items-center mt-2 text-sm text-muted-foreground">
          Available:
          <span className="text-primary">{availableAmount}</span>
          {showInfoIcon && (
            <Info className="h-4 w-4 ml-1 text-muted-foreground cursor-help" />
          )}
        </div>
      )}
    </div>
  );
}
