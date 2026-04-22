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
import { ArrowLeft, ArrowRight, MapPin, Wheat, Ruler, Check, Locate } from 'lucide-react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { cropTypes } from '@/lib/data';

export default function RegisterFarmPage() {
  const router = useRouter();
  const { t, language } = useLanguage();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cropType: '',
    landSize: '',
    location: '',
    gpsCoordinates: '',
  });

  const steps = language === 'en' 
    ? ['Crop', 'Size', 'Location', 'Confirm']
    : ['Igihingwa', 'Ingano', 'Aho Uri', 'Emeza'];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGetLocation = () => {
    // Simulate getting GPS location
    setFormData(prev => ({ 
      ...prev, 
      gpsCoordinates: '-1.9403, 29.8739' 
    }));
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

  const selectedCrop = cropTypes.find(c => c.value === formData.cropType);

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

        <h1 className="text-2xl font-bold text-foreground mb-2">{t('dashboard.registerFarm')}</h1>
        <p className="text-muted-foreground mb-6">
          {language === 'en' ? 'Add your farm details' : 'Andika amakuru y\'umurima'}
        </p>

        <ProgressSteps steps={steps} currentStep={step} />

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {step === 0 && <Wheat className="h-5 w-5 text-primary" />}
              {step === 1 && <Ruler className="h-5 w-5 text-primary" />}
              {step === 2 && <MapPin className="h-5 w-5 text-primary" />}
              {step === 3 && <Check className="h-5 w-5 text-primary" />}
              {step === 0 && t('form.cropType')}
              {step === 1 && t('form.landSize')}
              {step === 2 && t('form.farmLocation')}
              {step === 3 && (language === 'en' ? 'Confirm Details' : 'Emeza amakuru')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 0 && (
              <div className="grid grid-cols-2 gap-3">
                {cropTypes.map((crop) => (
                  <button
                    key={crop.value}
                    onClick={() => handleInputChange('cropType', crop.value)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      formData.cropType === crop.value
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <Wheat className={`h-8 w-8 mx-auto mb-2 ${
                      formData.cropType === crop.value ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <span className="font-medium">{crop.label[language]}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="landSize" className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-muted-foreground" />
                    {t('form.landSize')}
                  </Label>
                  <Input
                    id="landSize"
                    type="number"
                    step="0.1"
                    placeholder="2.5"
                    value={formData.landSize}
                    onChange={(e) => handleInputChange('landSize', e.target.value)}
                    className="text-lg py-6"
                  />
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Enter size in hectares' : 'Andika ingano muri hegitari'}
                  </p>
                </div>
                
                {/* Visual size reference */}
                <div className="bg-muted/50 rounded-xl p-4">
                  <p className="text-sm font-medium mb-2">
                    {language === 'en' ? 'Size Reference:' : 'Urugero rw\'ingano:'}
                  </p>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>1 ha = 10,000 m²</p>
                    <p>1 ha = 2.47 acres</p>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="location">{t('form.farmLocation')}</Label>
                  <Input
                    id="location"
                    placeholder={language === 'en' ? 'e.g., Kayonza, Eastern Province' : 'urugero: Kayonza, Intara y\'Iburasirazuba'}
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="text-lg py-6"
                  />
                </div>

                <div className="space-y-2">
                  <Label>GPS Coordinates</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="-1.9403, 29.8739"
                      value={formData.gpsCoordinates}
                      onChange={(e) => handleInputChange('gpsCoordinates', e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleGetLocation}
                      className="px-4"
                    >
                      <Locate className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Tap button to get current location' : 'Kanda buto kugira ngo ubone aho uri'}
                  </p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                  <DetailRow 
                    label={t('form.cropType')} 
                    value={selectedCrop?.label[language] || '-'} 
                  />
                  <DetailRow 
                    label={t('form.landSize')} 
                    value={formData.landSize ? `${formData.landSize} ha` : '-'} 
                  />
                  <DetailRow 
                    label={t('form.farmLocation')} 
                    value={formData.location} 
                  />
                  <DetailRow 
                    label="GPS" 
                    value={formData.gpsCoordinates} 
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
                <Button onClick={handleNext} className="flex-1 py-6" disabled={
                  (step === 0 && !formData.cropType) ||
                  (step === 1 && !formData.landSize)
                }>
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
