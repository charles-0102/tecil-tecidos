import { MessageCircle } from "lucide-react";

import { COMPANY, whatsappHref } from "@/lib/company";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappHref("Olá! Estava no site da Tecil Tecidos e gostaria de atendimento.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar no WhatsApp ${COMPANY.whatsapp.display}`}
      className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-leaf-600 text-white shadow-lg transition hover:bg-leaf-700 hover:shadow-xl"
    >
      <MessageCircle className="h-6 w-6" strokeWidth={1.75} />
    </a>
  );
}
