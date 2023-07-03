import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Button, Image, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const LanguageButton = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    router.push(router.asPath, router.route, { locale: lng });
  };

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        <Image src={`${i18n.language}-icon.png`} boxSize="24px" />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
        <MenuItem onClick={() => changeLanguage('no')}>Norsk</MenuItem>
        <MenuItem onClick={() => changeLanguage('fr')}>Français</MenuItem>
        <MenuItem onClick={() => changeLanguage('ar')}>العربية</MenuItem>
        <MenuItem onClick={() => changeLanguage('es')}>Español</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LanguageButton;
