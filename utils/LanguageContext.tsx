import { createContext, useState, useContext, FC } from 'react';

type LanguageContextType = {
  language: string;
  switchLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: FC = ({ children }) => {
  const [language, setLanguage] = useState('no');

  const switchLanguage = () => {
    setLanguage((prevLang) => (prevLang === 'no' ? 'en' : 'no'));
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
