import React from 'react';
import './Hero.css';
import video from './video.mp4';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h2>SAFARI ADVENTURE</h2>
        <p>EXPERT TRAVEL GROUP</p>
        <div className="hero-image">
        <video width="900" controls loop autoPlay muted>
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
        </div>
      </div>
    </section>
  );
};

export default Hero;