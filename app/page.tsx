'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';
import { LanguageProvider, useLanguage } from '@/lib/language-context';
import { Shield, HandCoins, ArrowRight, Leaf, Sprout } from 'lucide-react';

function LandingContent() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                {t('common.admin')}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-20">
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 opacity-10">
            <Leaf className="h-32 w-32 text-primary" />
          </div>
          <div className="absolute bottom-10 right-10 opacity-10">
            <Sprout className="h-40 w-40 text-primary" />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              <span>{t('landing.badge')}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
              {t('landing.hero.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
              {t('landing.hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/farmer/register">
                <Button size="lg" className="text-lg px-8 py-6 rounded-xl w-full sm:w-auto gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  {t('landing.register')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/farmer/login">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl w-full sm:w-auto bg-card">
                  {t('landing.login')}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t('landing.howHelps')}</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">{t('landing.howHelpsSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <FeatureCard
              icon={Sprout}
              title={t('feature.registerFarm.title')}
              description={t('feature.registerFarm.desc')}
              color="green"
            />
            <FeatureCard
              icon={HandCoins}
              title={t('feature.applyGrants.title')}
              description={t('feature.applyGrants.desc')}
              color="yellow"
            />
            <FeatureCard
              icon={Shield}
              title={t('feature.cropInsurance.title')}
              description={t('feature.cropInsurance.desc')}
              color="blue"
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4">
            <Stats />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-primary p-2 rounded-lg">
              <Sprout className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold">TUUZA</span>
          </div>
          <p className="text-background/60 text-sm">
            {t('footer.tagline')}
          </p>
          <p className="text-background/40 text-xs mt-4">
            &copy; 2024 TUUZA. {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
}

function Stats() {
  const { t } = useLanguage();
  
  const stats = [
    { number: '1,200+', labelKey: 'stats.farmersRegistered' },
    { number: '850+', labelKey: 'stats.grantsApproved' },
    { number: '95%', labelKey: 'stats.claimSuccessRate' },
    { number: '5', labelKey: 'stats.provincesCovered' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {stats.map((stat) => (
        <div key={stat.labelKey}>
          <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.number}</div>
          <div className="text-muted-foreground text-sm">{t(stat.labelKey)}</div>
        </div>
      ))}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color }: {
  icon: typeof Sprout;
  title: string;
  description: string;
  color: 'green' | 'yellow' | 'blue';
}) {
  const colorStyles = {
    green: 'bg-primary/10 text-primary',
    yellow: 'bg-accent/20 text-accent-foreground',
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  };

  return (
    <div className="bg-card p-6 rounded-2xl border border-border text-center hover:shadow-lg transition-shadow">
      <div className={`inline-flex p-4 rounded-xl mb-4 ${colorStyles[color]}`}>
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}

export default function LandingPage() {
  return (
    <LanguageProvider>
      <LandingContent />
    </LanguageProvider>
  );
}
