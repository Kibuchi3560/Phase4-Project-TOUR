import React from 'react';
import Hero from './Hero';
import TipsCard from './TipsCard';
import ReviewsCard from './ReviewsCard';
import AdventureCard from './AdventureCard';
import ContactCard from './ContactCard';
import './Home.css';

const Home = () => {
  return (
    <main>
      <Hero />
      <div className="card-grid">
        <TipsCard />
        <ReviewsCard /> 
        <AdventureCard />
        <ContactCard />
      </div>
    </main>
  );
};

export default Home;