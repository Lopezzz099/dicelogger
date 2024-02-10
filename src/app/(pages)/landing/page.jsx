import Features from "@/components/sections/landing/Features/Features";
import Hero from "@/components/sections/landing/Hero/Hero";
import Member from "@/components/sections/landing/Member/Member";
import Footer from "@/components/sections/landing/Footer/Footer";

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
