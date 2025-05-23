import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import SectionHeader from '../common/SectionHeader/SectionHeader';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'envoi du formulaire à implémenter
    console.log('Form data:', formData);
  };

  return (
    <section id="contact" className="macos-section">
      <div className="macos-section-header">
        <h2>Contact</h2>
      </div>

      <div className="macos-section-content">
        <SectionHeader 
          badge="Contact"
          title="Parlons de votre projet"
          subtitle="N'hésitez pas à me contacter pour discuter de vos idées"
        />

        <div className="contact-content">
          <div className="contact-info">
            <motion.div 
              className="macos-card contact-item"
              whileHover={{ y: -5 }}
            >
              <Mail size={24} />
              <h3>Email</h3>
              <p>{personalInfo.email}</p>
            </motion.div>

            <motion.div 
              className="macos-card contact-item"
              whileHover={{ y: -5 }}
            >
              <Phone size={24} />
              <h3>Téléphone</h3>
              <p>{personalInfo.phone}</p>
            </motion.div>

            <motion.div 
              className="macos-card contact-item"
              whileHover={{ y: -5 }}
            >
              <MapPin size={24} />
              <h3>Localisation</h3>
              <p>{personalInfo.location}</p>
            </motion.div>
          </div>

          <motion.form 
            className="macos-card contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="form-group">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                className="macos-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="macos-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Sujet</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="macos-input"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                className="macos-input"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
              ></textarea>
            </div>

            <motion.button
              type="submit"
              className="macos-button submit-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send size={20} />
              Envoyer le message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact; 