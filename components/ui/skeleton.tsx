import { cn } from "@/lib/utils";

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "inline-block h-3.5 rounded bg-[linear-gradient(90deg,hsl(var(--muted))_0%,hsl(var(--border))_50%,hsl(var(--muted))_100%)] bg-[length:200px_100%] animate-shimmer",
        className
      )}
      {...props}
    />
  );
}
