import { Routes, Route } from 'react-router-dom';

import Home from '../pages/customer/Home.jsx';
import MainLayout from './../components/Customer/FirstPage/MainLayout';
import FirstPage from '@/pages/customer/FirstPage.jsx';
import ProfileSettings from '@/pages/customer/ProfileSettings.jsx';
import CategoryPage from '@/pages/customer/CategoryPage.jsx';
import Login from "../pages/customer/auth/Login.jsx"
import Signup from "../pages/customer/auth/Signup.jsx"
import ForgotPasswordForm from '@/pages/customer/auth/ForgotPassword.jsx';
import ProviderCards from '@/pages/customer/ProviderCards.jsx';
import MyListPage from '@/components/Customer/Liked/MyListPage.jsx';


export default function CustomerRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<Login/>} />
      <Route path="signup" element={<Signup/>} />
      <Route path="forgot-password" element={<ForgotPasswordForm />} />
      <Route element={<MainLayout/>}>
        <Route path="firstPage" element={<FirstPage/>}/>
        <Route path="profile" element={<ProfileSettings/>}/>
        <Route path="Category" element={<CategoryPage />} />
        <Route path="category/:slug" element={<CategoryPage/>} />
        <Route path="provider/:name" element={<ProviderCards />} />
        <Route path="/my-list" element={<MyListPage />} />
        <Route path="cart" element={<CategoryPage/>}/>
      </Route>
    </Routes>
  );
}
