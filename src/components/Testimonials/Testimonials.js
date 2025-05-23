import React from 'react';
import SectionHeader from '../common/SectionHeader/SectionHeader';

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <SectionHeader 
          badge="Témoignages"
          title="Ce qu'ils disent"
        />
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          Section Témoignages - En cours de développement
        </p>
      </div>
    </section>
  );
};

export default Testimonials; 