import LandingPage from "@/components/Landingpage"
import FeaturedCars from "@/components/featured"
import About from "@/components/about"; 
import { Coreservices } from "@/components/Coreservices";
import { Choosus } from "@/components/Choosus";
import Autovalues from "@/components/autovalue";
import UsedCar from "@/components/UsedCar"

export default function Home() {
  return (
 <main>
   <LandingPage/>
    <About/>
<Coreservices/>
   <FeaturedCars/>
    <Autovalues/>
    <UsedCar/>


 

   <Choosus/>

 </main>
  );
}
