'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from '@/lib/language-context';
import { ResultCard } from '@/components/result-card';
import { ArrowLeft, HandCoins, Wheat, MapPin, Ruler, Search, Home } from 'lucide-react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

export default function ApplyGrantPage() {
  const { t, language } = useLanguage();
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<{ eligible: boolean; reason: string } | null>(null);

  // Pre-filled farmer info (simulated)
  const farmerInfo = {
    name: 'Jean Baptiste Habimana',
    nationalId: '1199880012345678',
    farm: {
      cropType: language === 'en' ? 'Maize' : 'Ibigori',
      landSize: '2.5 ha',
      location: 'Kayonza, Eastern Province',
    },
  };

  const handleCheckEligibility = async () => {
    setIsChecking(true);
    // Simulate API call with processing delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Simulate random result
    const isEligible = Math.random() > 0.3;
    setResult({
      eligible: isEligible,
      reason: isEligible
        ? (language === 'en' 
            ? 'All eligibility criteria met. Your farm qualifies for the Season A agricultural support grant.'
            : 'Ibisabwa byose byujujwe. Umurima wawe ukwiye impano y\'ubuhinzi.')
        : (language === 'en'
            ? 'Land size below minimum requirement of 1 hectare for this grant program.'
            : 'Ingano y\'ubutaka iri munsi y\'igipimo cy\'hegitari 1 gisabwa muri iki gihembo.'),
    });
    setIsChecking(false);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Logo size="sm" href="/farmer/dashboard" />
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-md">
        <Link href="/farmer/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>{t('common.back')}</span>
        </Link>

        <h1 className="text-2xl font-bold text-foreground mb-2">{t('dashboard.applyGrant')}</h1>
        <p className="text-muted-foreground mb-6">
          {language === 'en' ? 'Check your eligibility for grants' : 'Reba niba ukwiye impano'}
        </p>

        {!result ? (
          <>
            {/* Farmer Info Card */}
            <Card className="border-2 mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <HandCoins className="h-5 w-5 text-accent-foreground" />
                  {language === 'en' ? 'Your Information' : 'Amakuru yawe'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                  <DetailRow 
                    icon={<span className="font-bold text-primary">ID</span>}
                    label={t('form.nationalId')} 
                    value={farmerInfo.nationalId} 
                  />
                  <hr className="border-border" />
                  <DetailRow 
                    icon={<Wheat className="h-4 w-4 text-primary" />}
                    label={t('form.cropType')} 
                    value={farmerInfo.farm.cropType} 
                  />
                  <DetailRow 
                    icon={<Ruler className="h-4 w-4 text-primary" />}
                    label={t('form.landSize')} 
                    value={farmerInfo.farm.landSize} 
                  />
                  <DetailRow 
                    icon={<MapPin className="h-4 w-4 text-primary" />}
                    label={t('form.farmLocation')} 
                    value={farmerInfo.farm.location} 
                  />
                </div>

                <Button 
                  onClick={handleCheckEligibility} 
                  disabled={isChecking}
                  className="w-full py-6 text-lg"
                >
                  {isChecking ? (
                    <span className="flex items-center gap-3">
                      <span className="animate-spin h-5 w-5 border-3 border-white border-t-transparent rounded-full" />
                      {t('common.processing')}
                    </span>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      {t('common.checkEligibility')}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Info Box */}
            <div className="bg-accent/20 border border-accent/30 rounded-xl p-4 text-sm">
              <p className="font-medium text-accent-foreground mb-1">
                {language === 'en' ? 'Grant Program Info' : 'Amakuru ku mpano'}
              </p>
              <p className="text-muted-foreground">
                {language === 'en' 
                  ? 'This grant supports small-holder farmers with land between 1-5 hectares growing maize, beans, or Irish potatoes.'
                  : 'Iyi mpano ifasha abahinzi bato bafite ubutaka hagati ya hegitari 1-5 bahinga ibigori, ibishyimbo, cyangwa ibirayi.'}
              </p>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <ResultCard success={result.eligible} reason={result.reason} />
            
            <div className="flex flex-col gap-3">
              {result.eligible && (
                <Button className="w-full py-6 text-lg">
                  {language === 'en' ? 'Complete Application' : 'Rangiza ubusabe'}
                </Button>
              )}
              <Button variant="outline" onClick={handleReset} className="w-full py-6">
                <Search className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Check Again' : 'Ongera urebe'}
              </Button>
              <Link href="/farmer/dashboard">
                <Button variant="ghost" className="w-full py-6">
                  <Home className="h-4 w-4 mr-2" />
                  {language === 'en' ? 'Back to Dashboard' : 'Subira ku rupapuro rw\'ibanze'}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 flex justify-center">{icon}</div>
      <div className="flex-1">
        <span className="text-muted-foreground text-sm">{label}</span>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
