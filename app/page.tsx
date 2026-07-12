import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Diferenciais } from "@/components/landing/Diferenciais";
import { Destaques } from "@/components/landing/Destaques";
import { Linhas } from "@/components/landing/Linhas";
import { Sobre } from "@/components/landing/Sobre";
import { Contato } from "@/components/landing/Contato";
import { Footer } from "@/components/landing/Footer";

export default function Page() {
  return (
    <>
      <Header overlay />
      <main>
        <Hero />
        <Diferenciais />
        <Destaques />
        <Linhas />
        <Sobre />
        <Contato />
      </main>
      <Footer />
    </>
  );
}
