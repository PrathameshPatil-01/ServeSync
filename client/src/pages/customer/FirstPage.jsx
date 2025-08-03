import React from 'react'
import PromoSlider from './../../components/FirstPage/PromoSlider';

import AdCardSlider from './../../components/FirstPage/AdCardSlider';
import PeopleCardSlider from './../../components/FirstPage/PeopleCardSlider';
import './FirstPage.css';
import Footer from './../../components/Footer';
import CategoriesGrid from '../../components/newHome/CategoriesGrid';

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
