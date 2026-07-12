import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative inline-flex w-full items-center">
    <select
      ref={ref}
      className={cn(
        "h-11 w-full appearance-none rounded-md border border-input bg-background pl-3 pr-9 text-sm shadow-sm cursor-pointer transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </select>
    <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-muted-foreground" />
  </div>
));
NativeSelect.displayName = "NativeSelect";

export { NativeSelect };
