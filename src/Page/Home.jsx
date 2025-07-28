import React from 'react';
import Banner from '../Component/Banner';
import AboutBuilding from '../Component/AboutBuilding';
import Coupon from '../Component/Coupon';
import LocationSection from '../Component/LocationSection';

const Home = () => {
    return (
        <>
         <Banner></Banner>
       <AboutBuilding></AboutBuilding>
       <Coupon></Coupon>
       <LocationSection></LocationSection>        
        </>
      
       
    );
};

export default Home;