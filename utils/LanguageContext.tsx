import { createContext, useState, useContext, FC } from 'react';

type LanguageContextType = {
  language: string;
  switchLanguage: (language: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: FC = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const switchLanguage = (lang: string) => {
    const languages = ['en', 'no', 'ar', 'fr', 'es'];
    const currentLangIndex = languages.indexOf(language);
    const nextLangIndex = (currentLangIndex + 1) % languages.length;
    setLanguage(languages[nextLangIndex]);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
