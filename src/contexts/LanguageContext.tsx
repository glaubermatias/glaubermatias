import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pt' | 'es';

interface Translations {
  nav: {
    work: string;
    about: string;
    services: string;
    testimonials: string;
    contact: string;
  };
  hero: {
    greeting: string;
    tagline: string;
    cta: string;
  };
  work: {
    title: string;
    subtitle: string;
    viewProject: string;
    categories: {
      all: string;
      pitchDecks: string;
      internalComms: string;
      events: string;
      personal: string;
    };
  };
  about: {
    title: string;
    subtitle: string;
    experience: string;
    description: string;
  };
  services: {
    title: string;
    subtitle: string;
  };
  testimonials: {
    title: string;
    subtitle: string;
  };
  contact: {
    title: string;
    subtitle: string;
    cta: string;
  };
  footer: {
    rights: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      work: 'Work',
      about: 'About',
      services: 'Services',
      testimonials: 'Testimonials',
      contact: 'Contact',
    },
    hero: {
      greeting: "Hi, I'm Glauber Matias",
      tagline: 'Strategic Design for Presentations',
      cta: 'View My Work',
    },
    work: {
      title: 'Selected Work',
      subtitle: 'A collection of projects that showcase strategic thinking and visual excellence',
      viewProject: 'View Project',
      categories: {
        all: 'All',
        pitchDecks: 'Pitch Decks',
        internalComms: 'Internal Comms',
        events: 'Events & Keynotes',
        personal: 'Personal Projects',
      },
    },
    about: {
      title: 'About Me',
      subtitle: 'The story behind the slides',
      experience: '7+ years of experience',
      description: 'I believe presentations are more than slides — they are strategic communication tools that can transform ideas into action. My approach combines visual storytelling with business strategy to create presentations that captivate and convert.',
    },
    services: {
      title: 'Services',
      subtitle: 'How I can help bring your ideas to life',
    },
    testimonials: {
      title: 'What Clients Say',
      subtitle: 'Words from those who trusted me with their stories',
    },
    contact: {
      title: "Let's Create Together",
      subtitle: 'Have a project in mind? I would love to hear about it.',
      cta: 'Get in Touch',
    },
    footer: {
      rights: 'All rights reserved.',
    },
  },
  pt: {
    nav: {
      work: 'Trabalhos',
      about: 'Sobre',
      services: 'Serviços',
      testimonials: 'Depoimentos',
      contact: 'Contato',
    },
    hero: {
      greeting: 'Olá, sou Glauber Matias',
      tagline: 'Design Estratégico para Apresentações',
      cta: 'Ver Meus Trabalhos',
    },
    work: {
      title: 'Trabalhos Selecionados',
      subtitle: 'Uma coleção de projetos que demonstram pensamento estratégico e excelência visual',
      viewProject: 'Ver Projeto',
      categories: {
        all: 'Todos',
        pitchDecks: 'Pitch Decks',
        internalComms: 'Comunicação Interna',
        events: 'Eventos & Keynotes',
        personal: 'Projetos Pessoais',
      },
    },
    about: {
      title: 'Sobre Mim',
      subtitle: 'A história por trás dos slides',
      experience: '7+ anos de experiência',
      description: 'Acredito que apresentações são mais do que slides — são ferramentas estratégicas de comunicação que podem transformar ideias em ação. Minha abordagem combina storytelling visual com estratégia de negócios para criar apresentações que cativam e convertem.',
    },
    services: {
      title: 'Serviços',
      subtitle: 'Como posso ajudar a dar vida às suas ideias',
    },
    testimonials: {
      title: 'O Que Dizem os Clientes',
      subtitle: 'Palavras de quem confiou em mim para contar suas histórias',
    },
    contact: {
      title: 'Vamos Criar Juntos',
      subtitle: 'Tem um projeto em mente? Adoraria saber mais.',
      cta: 'Entre em Contato',
    },
    footer: {
      rights: 'Todos os direitos reservados.',
    },
  },
  es: {
    nav: {
      work: 'Trabajos',
      about: 'Sobre Mí',
      services: 'Servicios',
      testimonials: 'Testimonios',
      contact: 'Contacto',
    },
    hero: {
      greeting: 'Hola, soy Glauber Matias',
      tagline: 'Diseño Estratégico para Presentaciones',
      cta: 'Ver Mi Trabajo',
    },
    work: {
      title: 'Trabajos Seleccionados',
      subtitle: 'Una colección de proyectos que demuestran pensamiento estratégico y excelencia visual',
      viewProject: 'Ver Proyecto',
      categories: {
        all: 'Todos',
        pitchDecks: 'Pitch Decks',
        internalComms: 'Comunicación Interna',
        events: 'Eventos & Keynotes',
        personal: 'Proyectos Personales',
      },
    },
    about: {
      title: 'Sobre Mí',
      subtitle: 'La historia detrás de las diapositivas',
      experience: '7+ años de experiencia',
      description: 'Creo que las presentaciones son más que diapositivas — son herramientas estratégicas de comunicación que pueden transformar ideas en acción. Mi enfoque combina storytelling visual con estrategia de negocios para crear presentaciones que cautivan y convierten.',
    },
    services: {
      title: 'Servicios',
      subtitle: 'Cómo puedo ayudar a dar vida a tus ideas',
    },
    testimonials: {
      title: 'Lo Que Dicen los Clientes',
      subtitle: 'Palabras de quienes confiaron en mí para contar sus historias',
    },
    contact: {
      title: 'Creemos Juntos',
      subtitle: '¿Tienes un proyecto en mente? Me encantaría saber más.',
      cta: 'Contáctame',
    },
    footer: {
      rights: 'Todos los derechos reservados.',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
