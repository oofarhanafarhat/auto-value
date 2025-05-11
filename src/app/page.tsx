import Hero from "@/app/hero/page"
import BrandsSection from "@/components/Brand"
import Customer from "@/components/customer"
import UsedCar from "@/components/Blogs"
import ExploreSection from "@/app/featurs/page"

import OurServicesSection from "@/components/servicess";

export default function Home() {
  return (
    <main>
      <Hero />
      <BrandsSection />
      <ExploreSection />
      <OurServicesSection />
        <Customer />
      <UsedCar />
    
    </main>
  );
}
