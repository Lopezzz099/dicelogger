import Features from "@/components/landing/Features/Features";
import Hero from "@/components/landing/Hero/Hero";
import Member from "@/components/landing/Member/Member";
import Footer from "@/components/landing/Footer/Footer";

export default function Landing() {
  return (
    <main>
      <Hero />
      <Features />
      <Member/>
      <Footer/>
    </main>
  );
}
