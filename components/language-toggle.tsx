'use client';

import { useLanguage } from '@/lib/language-context';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'rw' : 'en')}
      className="gap-2 bg-card hover:bg-muted border-border"
    >
      <Globe className="h-4 w-4" />
      <span className="font-medium">{language === 'en' ? 'RW' : 'EN'}</span>
    </Button>
  );
}
