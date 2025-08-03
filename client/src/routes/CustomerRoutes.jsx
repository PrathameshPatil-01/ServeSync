import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/customer/Home";
import FirstPage from "../pages/customer/FirstPage";
import HLayout from "../components/newHome/HLayout";
import ProfileSettings from "../pages/customer/ProfileSettings";
import CategoryPage from './../pages/customer/CategoryPage';



export default function CustomerRoutes() {
  return (
   <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<MainLayout />}>
          
          <Route path="firstpage" element={<FirstPage/>}/>
          <Route path = "profile" element={<ProfileSettings/>}/>
          <Route path="Category" element={<CategoryPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          
        </Route>
      </Routes>
  );
}
