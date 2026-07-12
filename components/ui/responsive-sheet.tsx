"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Drawer } from "vaul";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface ResponsiveSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  /**
   * Largura do Sheet desktop. Default "max-w-md".
   * Use "max-w-lg", "max-w-xl" etc para sheets mais largos.
   */
  desktopWidth?: string;
}

/**
 * Sheet lateral (direita) no desktop (>= md) e Drawer inferior no mobile.
 * Compartilha API entre os dois para uso uniforme nos consumidores.
 */
export function ResponsiveSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  desktopWidth = "max-w-md",
}: ResponsiveSheetProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay
            className={cn(
              "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm",
              "data-[state=open]:animate-in data-[state=open]:fade-in-0",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
            )}
          />
          <Dialog.Content
            className={cn(
              "fixed inset-y-0 right-0 z-50 flex h-full w-full flex-col",
              "border-l border-border bg-card shadow-lg",
              "data-[state=open]:animate-in data-[state=open]:slide-in-from-right",
              "data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right",
              "duration-200",
              desktopWidth
            )}
          >
            <SheetHeader title={title} description={description} desktop />
            <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
            {footer && (
              <div className="border-t border-border bg-warm-50 px-6 py-4">
                {footer}
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <Drawer.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 flex max-h-[92vh] flex-col",
            "rounded-t-2xl border-t border-border bg-card shadow-lg",
            "focus:outline-none"
          )}
        >
          {/* Handle visual */}
          <div className="mx-auto mt-3 h-1.5 w-12 flex-shrink-0 rounded-full bg-warm-200" />
          <SheetHeader title={title} description={description} />
          <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
          {footer && (
            <div className="border-t border-border bg-warm-50 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {footer}
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function SheetHeader({
  title,
  description,
  desktop = false,
}: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  desktop?: boolean;
}) {
  if (!title && !description && !desktop) return null;

  const TitleComp = desktop ? Dialog.Title : Drawer.Title;
  const DescComp = desktop ? Dialog.Description : Drawer.Description;
  const CloseComp = desktop ? Dialog.Close : Drawer.Close;

  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 border-b border-border",
        desktop ? "px-6 py-4" : "px-5 py-3"
      )}
    >
      <div className="flex-1 min-w-0">
        {title && (
          <TitleComp className="font-serif text-lg text-foreground truncate">
            {title}
          </TitleComp>
        )}
        {description && (
          <DescComp className="mt-1 text-sm text-muted-foreground">
            {description}
          </DescComp>
        )}
      </div>
      <CloseComp
        className={cn(
          "flex-shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors",
          "hover:bg-warm-100 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        )}
        aria-label="Fechar"
      >
        <X className="h-4 w-4" />
      </CloseComp>
    </div>
  );
}
