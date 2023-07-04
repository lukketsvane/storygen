import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Button, Image, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const LanguageButton = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    router.push(router.asPath, router.route, { locale: lng }).then(() => {
      window.location.reload(); // Reload the page after changing the language
    });
  };

  const languageIcons = {
    no: "/no-icon.png",
    en: "/en-icon.png",
    fr: "/fr-icon.png",
    ar: "/ar-icon.png",
    es: "/es-icon.png",
    zh: "/zh-icon.png",
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        position="fixed"
        top={5}
        right={5}
        zIndex={20} // Adjust the zIndex value to be higher than HelpOverlay
      >
        <Image src={languageIcons[i18n.language]} boxSize="24px" />
      </MenuButton>
      <MenuList zIndex={20}>
        <MenuItem onClick={() => changeLanguage('no')}>
          <Image src="/no-icon.png" boxSize="20px" mr={2} />
          Norsk
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('en')}>
          <Image src="/en-icon.png" boxSize="20px" mr={2} />
          English
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('fr')}>
          <Image src="/fr-icon.png" boxSize="20px" mr={2} />
          Français
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('ar')}>
          <Image src="/ar-icon.png" boxSize="20px" mr={2} />
          العربية
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('es')}>
          <Image src="/es-icon.png" boxSize="20px" mr={2} />
          Español
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('zh')}>
          <Image src="/zh-icon.png" boxSize="20px" mr={2} />
          中文
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default LanguageButton;
