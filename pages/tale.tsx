import { useState, useRef } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Textarea } from "@chakra-ui/react";
import TaleOutput from "@/components/TaleOutput";
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router';

export default function Tale() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');
  const [theme, setTheme] = useState('');
  const [tale, setTale] = useState('');
  const [loading, setLoading] = useState(false);
  const cancelGeneration = useRef(false);
  const { t } = useTranslation(['common', 'examples']);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    cancelGeneration.current = false;
    setLoading(true);
    setTale('');

    const res = await fetch('/api/talegen', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        age: parseInt(age),
        role,
        theme,
        locale: router.locale,
      })
    });

    if (res.body) {
      const reader = res.body.getReader();
      let story = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done || cancelGeneration.current) {
          break;
        }

        const chunk = new TextDecoder().decode(value);
        story += chunk;

        setTale(story);
      }
    }

    if (!cancelGeneration.current) {
      setLoading(false);
    }
  }

  const handleCancel = (e) => {
    e.preventDefault();
    cancelGeneration.current = true;
    setLoading(false);
  }

  return (
    <Stack spacing={4}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="name">
            <FormLabel>{t('name')}</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </FormControl>
          <FormControl id="age">
            <FormLabel>{t('age')}</FormLabel>
            <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
          </FormControl>
          <FormControl id="role">
            <FormLabel>{t('role')}</FormLabel>
            <Input type="text" value={role} onChange={(e) => setRole(e.target.value)} required />
          </FormControl>
          <FormControl id="theme">
            <FormLabel>{t('theme')}</FormLabel>
            <Input type="text" value={theme} onChange={(e) => setTheme(e.target.value)} required />
          </FormControl>
          <Button type="submit" isLoading={loading} loadingText={t('generating')}>
            {t('generate')}
          </Button>
          {loading && <Button onClick={handleCancel}>{t('cancel')}</Button>}
        </Stack>
      </form>
      <TaleOutput tale={tale} loading={loading} />
    </Stack>
  )
}