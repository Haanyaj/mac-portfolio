export const personalInfo = {
  name: "Alvyn",
  title: "Développeur Full-Stack Passionné",
  description: "Je crée des expériences numériques exceptionnelles avec des technologies modernes. Spécialisé en React, Node.js et design UI/UX.",
  email: "alvyn.yang@gmail.com",
  phone: "**********",
  location: "Paris, France",
  socialLinks: {
    github: "https://github.com",
    linkedin: "https://linkedin.com/in",
  },
  stats: {
    projectsCompleted: "50+",
    yearsExperience: "3+",
    happyClients: "25+"
  }
};

export const navigation = [
  { id: 'home', label: 'Accueil' },
  { id: 'about', label: 'À Propos' },
  { id: 'projects', label: 'Projets' },
  { id: 'experience', label: 'Expérience' },
  { id: 'contact', label: 'Contact' }
];

export const skills = [
  { name: "React", level: 95, icon: "⚛️" },
  { name: "JavaScript", level: 90, icon: "🟨" },
  { name: "TypeScript", level: 85, icon: "🔷" },
  { name: "Node.js", level: 88, icon: "🟢" },
  { name: "Python", level: 80, icon: "🐍" },
  { name: "CSS/SASS", level: 92, icon: "🎨" },
  { name: "MongoDB", level: 75, icon: "🍃" },
  { name: "PostgreSQL", level: 78, icon: "🐘" },
  { name: "Docker", level: 70, icon: "🐳" },
  { name: "AWS", level: 72, icon: "☁️" }
];

export const services = [
  {
    id: 1,
    title: "Développement Web",
    description: "Sites web modernes et applications web sur mesure avec les dernières technologies.",
    features: ["React/Vue.js", "Responsive Design", "SEO Optimisé", "Performance"],
    icon: "Globe"
  },
  {
    id: 2,
    title: "Applications Mobile",
    description: "Apps natives et cross-platform pour iOS et Android avec UI/UX soignée.",
    features: ["React Native", "Flutter", "App Store", "UI/UX Design"],
    icon: "Smartphone"
  },
  {
    id: 3,
    title: "Backend & API",
    description: "Services backend robustes, APIs REST/GraphQL et architecture cloud.",
    features: ["Node.js/Python", "Bases de données", "Cloud AWS/GCP", "Microservices"],
    icon: "Database"
  },
  {
    id: 4,
    title: "UI/UX Design",
    description: "Interfaces modernes et intuitives centrées sur l'expérience utilisateur.",
    features: ["Figma/Adobe XD", "Prototypage", "Design System", "User Research"],
    icon: "Palette"
  }
];

export const projects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    description: "Plateforme e-commerce complète avec panier, paiements et gestion des commandes",
    longDescription: "Une application e-commerce moderne développée avec React, Node.js et MongoDB. Intègre Stripe pour les paiements, Redux pour la gestion d'état, et un dashboard admin complet.",
    image: "/api/placeholder/400/250",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    githubUrl: "https://github.com/username/ecommerce",
    liveUrl: "https://ecommerce-demo.com",
    color: "#6366f1",
    category: "web"
  },
  {
    id: 2,
    name: "Mobile Fitness App",
    description: "Application mobile de fitness avec suivi d'entraînements et nutrition",
    longDescription: "App React Native avec suivi des calories, programmes d'entraînement personnalisés, et synchronisation avec appareils fitness. Backend Firebase avec authentification.",
    image: "/api/placeholder/400/250",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    githubUrl: "https://github.com/username/fitness-app",
    liveUrl: "https://fitness-app-demo.com",
    color: "#8b5cf6",
    category: "mobile"
  },
  {
    id: 3,
    name: "AI Dashboard",
    description: "Dashboard d'analyse de données avec IA et visualisations interactives",
    longDescription: "Interface d'administration avec graphiques D3.js, machine learning pour prédictions, et API REST. Intégration TensorFlow.js pour l'analyse prédictive.",
    image: "/api/placeholder/400/250",
    technologies: ["Vue.js", "D3.js", "Python", "TensorFlow", "PostgreSQL"],
    githubUrl: "https://github.com/username/ai-dashboard",
    liveUrl: "https://ai-dashboard-demo.com",
    color: "#ec4899",
    category: "data"
  },
  {
    id: 4,
    name: "Blockchain Wallet",
    description: "Portefeuille crypto sécurisé avec échange de devises",
    longDescription: "Wallet Web3 avec connexion MetaMask, échange de tokens, historique des transactions, et portfolio tracking. Smart contracts Solidity.",
    image: "/api/placeholder/400/250",
    technologies: ["React", "Web3.js", "Solidity", "Ethers.js"],
    githubUrl: "https://github.com/username/crypto-wallet",
    liveUrl: "https://crypto-wallet-demo.com",
    color: "#f59e0b",
    category: "blockchain"
  }
];

export const experiences = [
  {
    id: 1,
    title: "Senior Full-Stack Developer",
    company: "TechCorp Solutions",
    period: "2022 - Présent",
    description: "Lead développeur sur des projets e-commerce et fintech. Management d'équipe de 5 développeurs.",
    technologies: ["React", "Node.js", "AWS", "MongoDB"]
  },
  {
    id: 2,
    title: "Consultant Technique",
    company: "Digital Consulting Group",
    period: "2023 - Présent",
    description: "Conseils en architecture logicielle et modernisation d'applications legacy. Expertise en migration cloud et optimisation des performances.",
    technologies: ["Docker", "Kubernetes", "Azure", "Microservices"]
  },
  {
    id: 3,
    title: "Tech Lead Mobile",
    company: "MobileFirst Inc.",
    period: "2021 - 2022",
    description: "Direction technique du développement d'applications mobiles cross-platform. Mise en place des bonnes pratiques et CI/CD.",
    technologies: ["React Native", "Flutter", "Firebase", "Redux"]
  },
  {
    id: 4,
    title: "Front-End Developer",
    company: "StartupXYZ",
    period: "2020 - 2022",
    description: "Développement d'interfaces utilisateur modernes et responsive. Optimisation des performances.",
    technologies: ["Vue.js", "TypeScript", "Tailwind"]
  },
  {
    id: 5,
    title: "Développeur Full-Stack",
    company: "E-commerce Solutions",
    period: "2020 - 2021",
    description: "Création de plateformes e-commerce personnalisées. Intégration de systèmes de paiement et gestion d'inventaire.",
    technologies: ["Laravel", "Vue.js", "MySQL", "Stripe"]
  },
  {
    id: 6,
    title: "Développeur Backend",
    company: "DataFlow Systems",
    period: "2019 - 2020",
    description: "Développement d'APIs robustes et systèmes de traitement de données en temps réel. Optimisation des requêtes et architecture scalable.",
    technologies: ["Python", "Django", "PostgreSQL", "Redis"]
  },
  {
    id: 7,
    title: "Junior Developer",
    company: "WebAgency",
    period: "2019 - 2020",
    description: "Premiers pas dans le développement web. Sites vitrines et applications simples.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP"]
  },
  {
    id: 8,
    title: "Stagiaire Développeur",
    company: "InnovateLab",
    period: "2018 - 2019",
    description: "Initiation au développement logiciel et participation à des projets open-source. Apprentissage des méthodologies agiles.",
    technologies: ["JavaScript", "Git", "Linux", "Scrum"]
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "CEO, TechStart",
    text: "Un développeur exceptionnel qui livre toujours des solutions créatives et efficaces.",
    rating: 5,
    avatar: "/api/placeholder/60/60"
  },
  {
    id: 2,
    name: "Marc Dubois",
    position: "CTO, InnovaCorp",
    text: "Compétences techniques impressionnantes et excellente communication. Recommandé !",
    rating: 5,
    avatar: "/api/placeholder/60/60"
  },
  {
    id: 3,
    name: "Lisa Chen",
    position: "Product Manager",
    text: "Travail de qualité, respect des délais, et grande attention aux détails.",
    rating: 5,
    avatar: "/api/placeholder/60/60"
  }
]; 