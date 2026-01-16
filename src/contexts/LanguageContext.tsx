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
    welcome: string;
    headline: string;
    description: string;
    cta: string;
  };
  work: {
    title: string;
    subtitle: string;
    viewProject: string;
    categories: {
      all: string;
      executiveDecks: string;
      externalEvents: string;
      templates: string;
      freelance: string;
      personalProjects: string;
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
      welcome: 'Welcome!',
      headline: 'Amplifying the impact of your message with world-class presentations',
      description: 'From C-suite pitch decks to global keynotes, I craft visual stories that make complex ideas simple and memorable.',
      cta: 'View my work',
    },
    work: {
      title: 'Selected work',
      subtitle: 'A collection of projects that showcase strategic thinking and visual excellence',
      viewProject: 'View project',
      categories: {
        all: 'All',
        executiveDecks: 'Executive decks',
        externalEvents: 'External events',
        templates: 'Templates',
        freelance: 'Freelance',
        personalProjects: 'Personal projects',
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
      welcome: 'Bem-vindo!',
      headline: 'Amplificando o impacto da sua mensagem com apresentações de classe mundial',
      description: 'De pitch decks para C-level a keynotes globais, eu crio histórias visuais que tornam ideias complexas simples e memoráveis.',
      cta: 'Ver meus trabalhos',
    },
    work: {
      title: 'Trabalhos selecionados',
      subtitle: 'Uma coleção de projetos que demonstram pensamento estratégico e excelência visual',
      viewProject: 'Ver projeto',
      categories: {
        all: 'Todos',
        executiveDecks: 'Decks executivos',
        externalEvents: 'Eventos externos',
        templates: 'Templates',
        freelance: 'Freelance',
        personalProjects: 'Projetos pessoais',
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
      welcome: '¡Bienvenido!',
      headline: 'Amplificando el impacto de tu mensaje con presentaciones de clase mundial',
      description: 'Desde pitch decks para C-suite hasta keynotes globales, creo historias visuales que hacen que las ideas complejas sean simples y memorables.',
      cta: 'Ver mi trabajo',
    },
    work: {
      title: 'Trabajos seleccionados',
      subtitle: 'Una colección de proyectos que demuestran pensamiento estratégico y excelencia visual',
      viewProject: 'Ver proyecto',
      categories: {
        all: 'Todos',
        executiveDecks: 'Decks ejecutivos',
        externalEvents: 'Eventos externos',
        templates: 'Plantillas',
        freelance: 'Freelance',
        personalProjects: 'Proyectos personales',
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