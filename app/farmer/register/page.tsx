'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from '@/lib/language-context';
import { ProgressSteps } from '@/components/progress-steps';
import { ArrowLeft, ArrowRight, User, Phone, MapPin, Check } from 'lucide-react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { provinces } from '@/lib/data';

export default function RegisterPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nationalId: '',
    fullName: '',
    phone: '',
    province: '',
    district: '',
    sector: '',
  });

  const steps = language === 'en' 
    ? ['Personal Info', 'Contact', 'Location', 'Confirm']
    : ['Amakuru', 'Telefone', 'Aho Uri', 'Emeza'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push('/farmer/dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-md">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>{t('common.back')}</span>
        </Link>

        <h1 className="text-2xl font-bold text-foreground mb-2">{t('landing.register')}</h1>
        <p className="text-muted-foreground mb-6">{t('auth.createAccount')}</p>

        <ProgressSteps steps={steps} currentStep={step} />

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg">
              {step === 0 && t('auth.personalInfo')}
              {step === 1 && t('auth.contactDetails')}
              {step === 2 && t('auth.farmLocation')}
              {step === 3 && t('auth.confirmDetails')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 0 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="nationalId" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    {t('form.nationalId')}
                  </Label>
                  <Input
                    id="nationalId"
                    placeholder="1199880012345678"
                    value={formData.nationalId}
                    onChange={(e) => handleInputChange('nationalId', e.target.value)}
                    className="text-lg py-6"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    {t('form.fullName')}
                  </Label>
                  <Input
                    id="fullName"
                    placeholder={t('auth.enterFullName')}
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="text-lg py-6"
                  />
                </div>
              </>
            )}

            {step === 1 && (
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  {t('form.phone')}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+250 788 123 456"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="text-lg py-6"
                />
              </div>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="province" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {t('form.province')}
                  </Label>
                  <select
                    id="province"
                    value={formData.province}
                    onChange={(e) => handleInputChange('province', e.target.value)}
                    className="w-full h-14 px-4 rounded-lg border border-input bg-background text-lg"
                  >
                    <option value="">{t('auth.selectProvince')}</option>
                    {provinces.map(p => (
                      <option key={p.value} value={p.value}>
                        {p.label[language]}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="district">{t('form.district')}</Label>
                  <Input
                    id="district"
                    placeholder={t('auth.enterDistrict')}
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="text-lg py-6"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sector">{t('form.sector')}</Label>
                  <Input
                    id="sector"
                    placeholder={t('auth.enterSector')}
                    value={formData.sector}
                    onChange={(e) => handleInputChange('sector', e.target.value)}
                    className="text-lg py-6"
                  />
                </div>
              </>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                  <DetailRow label={t('form.nationalId')} value={formData.nationalId} />
                  <DetailRow label={t('auth.name')} value={formData.fullName} />
                  <DetailRow label={t('auth.phone')} value={formData.phone} />
                  <DetailRow 
                    label={t('auth.location')} 
                    value={`${formData.sector}, ${formData.district}`} 
                  />
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              {step > 0 && (
                <Button variant="outline" onClick={handleBack} className="flex-1 py-6">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  {t('common.back')}
                </Button>
              )}
              {step < steps.length - 1 ? (
                <Button onClick={handleNext} className="flex-1 py-6">
                  {t('common.next')}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isLoading} className="flex-1 py-6">
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      {t('common.processing')}
                    </span>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      {t('form.submit')}
                    </>
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {t('auth.alreadyRegistered')}{' '}
          <Link href="/farmer/login" className="text-primary font-medium hover:underline">
            {t('landing.login')}
          </Link>
        </p>
      </main>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="font-medium">{value || '-'}</span>
    </div>
  );
}
