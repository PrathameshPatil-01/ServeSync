import React from 'react'
import PromoSlider from '@/components/Customer/FirstPage/PromoSlider';

import AdCardSlider from '@/components/Customer/FirstPage/AdCardSlider';
import PeopleCardSlider from '@/components/Customer/FirstPage/PeopleCardSlider';
import './FirstPage.css';
import Footer from '@/components/Footer';
import CategoriesGrid from '@/components/Customer/newHome/CategoriesGrid';

function FirstPage() {
  return (
      
    <div className='main-content' >
        <PromoSlider/>
        <PromoSlider/>
        <div>
            <CategoriesGrid/>
        </div>
        <AdCardSlider/>
        <hr></hr>
        <PeopleCardSlider/>
        <hr></hr>
        <Footer/>
        
    </div>
  )
}

export default FirstPage
