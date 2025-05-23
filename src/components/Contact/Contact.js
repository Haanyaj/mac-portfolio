import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { personalInfo } from '../../data/portfolio';
import SectionHeader from '../common/SectionHeader/SectionHeader';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message envoyé ! Je vous répondrai bientôt.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <SectionHeader 
          badge="Contact"
          title="Travaillons Ensemble"
          subtitle="Vous avez un projet en tête ? Discutons-en !"
        />

        <div className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="contact-item">
              <Mail className="contact-icon" />
              <div>
                <h4>Email</h4>
                <p>{personalInfo.email}</p>
              </div>
            </div>
            <div className="contact-item">
              <Phone className="contact-icon" />
              <div>
                <h4>Téléphone</h4>
                <p>{personalInfo.phone}</p>
              </div>
            </div>
            <div className="contact-item">
              <MapPin className="contact-icon" />
              <div>
                <h4>Localisation</h4>
                <p>{personalInfo.location}</p>
              </div>
            </div>

            <div className="social-links">
              <motion.a 
                href={personalInfo.socialLinks.github}
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={24} />
              </motion.a>
              <motion.a 
                href={personalInfo.socialLinks.linkedin}
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={24} />
              </motion.a>
              <motion.a 
                href={personalInfo.socialLinks.twitter}
                className="social-link"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter size={24} />
              </motion.a>
            </div>
          </motion.div>

          <motion.form 
            className="contact-form"
            onSubmit={handleFormSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Votre email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Votre message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <motion.button 
              type="submit"
              className="submit-button"
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