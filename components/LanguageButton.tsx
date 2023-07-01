import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Button, Image } from '@chakra-ui/react';

const LanguageButton = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    router.push(router.asPath, router.route, { locale: lng });
  };

  return (
    <Button onClick={() => changeLanguage(i18n.language === 'en' ? 'no' : 'en')}>
      <Image src={`/${i18n.language === "en" ? "norwegian-icon" : "english-icon"}.png`} boxSize="24px" />
    </Button>
  );
};

export default LanguageButton;
