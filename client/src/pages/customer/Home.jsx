
import './Home.css';
import ImageCarousel from '@/components/Customer/newHome/ImageCarousel';
import RoleCards from '@/components/Customer/newHome/RoleCards';
//import CategoryGrid from './../../components/home/CategoryGrid';
import WorkerSection from '@/components/Customer/newHome/WorkerSection';
import CategoriesGrid from '@/components/Customer/newHome/CategoriesGrid';
import Navbar from '@/components/Customer/newHome/Navbar';
export default function Home() {
  return (
    <div className ="home-wrapper" >
      <Navbar/>
     <ImageCarousel/>
     <RoleCards/>
     <CategoriesGrid/>
     <WorkerSection/>

    </div>
  );
}
