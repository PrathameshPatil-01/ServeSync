
import './Home.css';
import ImageCarousel from './../../components/newHome/ImageCarousel';
import RoleCards from './../../components/newHome/RoleCards';
//import CategoryGrid from './../../components/home/CategoryGrid';
import WorkerSection from './../../components/newHome/WorkerSection';
import CategoriesGrid from './../../components/newHome/CategoriesGrid';
import Navbar from '../../components/newHome/Navbar';
import Footer from '../../components/Footer';
export default function Home() {
  return (
    <div className ="home-wrapper" >
      <Navbar/>
     <ImageCarousel/>
     <RoleCards/>
     <CategoriesGrid/>
     <WorkerSection/>
     <Footer/>

    </div>
  );
}
