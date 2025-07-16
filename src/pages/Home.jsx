import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/Section/HeroSection';
import PopularPolicies from '../components/Section/PopularPolicies';
import Benefits from '../components/Section/Benefits';
import CustomerReviews from '../components/Section/CustomerReviews';
import LatestBlogs from '../components/Section/LatestBlogs';
import NewsletterSubscription from '../components/Section/NewsletterSubscription';
import AgentSection from '../components/Section/AgentSection';

const Home = () => {
    useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);
    return (
        <div>
            <Helmet>
                <title>SecureLife | Home</title>
            </Helmet>
            <HeroSection></HeroSection>
            <PopularPolicies></PopularPolicies>
            <Benefits></Benefits>
            <CustomerReviews></CustomerReviews>
            <LatestBlogs></LatestBlogs>
            <AgentSection></AgentSection>
            <NewsletterSubscription></NewsletterSubscription>
        </div>
    );
};

export default Home;