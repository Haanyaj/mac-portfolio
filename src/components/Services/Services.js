import React from 'react';
import SectionHeader from '../common/SectionHeader/SectionHeader';

const Services = () => {
  return (
    <section id="services" className="services-section">
      <div className="container">
        <SectionHeader 
          badge="Services"
          title="Ce que je propose"
          subtitle="Des solutions complètes pour vos projets numériques"
        />
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          Section Services - En cours de développement
        </p>
      </div>
    </section>
  );
};

export default Services; 