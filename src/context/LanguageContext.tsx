import React, { createContext, useState, ReactNode } from 'react';

// Defina os tipos para o contexto
interface LanguageContextProps {
  language: string;
  switchLanguage: (lang: string) => void;
}

// Inicialize o contexto com valores padrões
export const LanguageContext = createContext<LanguageContextProps>({
  language: 'en', // Idioma padrão
  switchLanguage: () => {},
});

// Defina o tipo para as props do provider
interface LanguageProviderProps {
  children: ReactNode;
}

// Crie o provider
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');

  const switchLanguage = (lang: string) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};