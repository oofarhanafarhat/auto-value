import Hero from "@/components/Landingpage"
import BrandsSection from "@/components/Brand"
import FeaturedCars from "@/components/featured" 
import Modal from "@/components/M";
import Customer from "@/components/customer";
import { ChooseUs}  from "@/components/Choosus";
import FeaturedListings from "@/components/autovalue";
import UsedCar from "@/components/UsedCar"
import CarCategories from "@/components/categories";
import WhyElectricVehicle from "@/components/vehicles";

export default function Home() {
  return (
 <main>
 <Hero/>
   <CarCategories/>
   <BrandsSection/>
   <FeaturedListings/>
   <WhyElectricVehicle/>
  <Modal/>
  <UsedCar/>
  
<Customer/>
<FeaturedCars/>
<ChooseUs/>

  
  
   


 



 </main>
  );
}
