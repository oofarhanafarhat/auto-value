import LandingPage from "@/components/Landingpage"
import FeaturedCars from "@/components/featured"
import About from "@/components/about"; 
import { CoreServices } from "@/components/Coreservices";
import { ChooseUs } from "@/components/Choosus";
import Autovalues from "@/components/autovalue";
import UsedCar from "@/components/UsedCar"

export default function Home() {
  return (
 <main>
   <LandingPage/>
    <About/>
    <ChooseUs/>
<CoreServices/>
<Autovalues/>
<UsedCar/>
   <FeaturedCars/>
  
   


 



 </main>
  );
}
