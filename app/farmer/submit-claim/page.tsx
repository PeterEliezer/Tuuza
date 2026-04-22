'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from '@/lib/language-context';
import { ProgressSteps } from '@/components/progress-steps';
import { ResultCard } from '@/components/result-card';
import { ArrowLeft, ArrowRight, FileText, AlertTriangle, Upload, Check, Home } from 'lucide-react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { lossTypes } from '@/lib/data';

export default function SubmitClaimPage() {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{ approved: boolean; reason: string } | null>(null);
  const [formData, setFormData] = useState({
    lossType: '',
    description: '',
    imageUploaded: false,
  });

  const steps = language === 'en' 
    ? ['Type', 'Details', 'Photo', 'Submit']
    : ['Ubwoko', 'Ibisobanuro', 'Ifoto', 'Ohereza'];

  const handleInputChange = (field: string, value: string | boolean) => {
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
    setIsSubmitting(true);
    // Simulate API call with processing delay
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Simulate random result
    const isApproved = Math.random() > 0.4;
    setResult({
      approved: isApproved,
      reason: isApproved
        ? (language === 'en' 
            ? 'Your claim has been verified. Satellite imagery confirms the reported damage. Compensation will be processed within 7 business days.'
            : 'Ikibazo cyawe cyemejwe. Amafoto y\'ikinyamakuru yemeza ibyangirika byatanzwe. Indishyi zizakorwa mu minsi 7 y\'akazi.')
        : (language === 'en'
            ? 'Claim requires additional verification. Our team will contact you within 48 hours for an on-site inspection.'
            : 'Ikibazo gisaba kugenzurwa kurushaho. Itsinda ryacu rizakuvugisha mu masaha 48 kugira ngo basuzume aho biri.'),
    });
    setIsSubmitting(false);
  };

  const selectedLoss = lossTypes.find(l => l.value === formData.lossType);

  if (result) {
    return (
      <div className="min-h-screen bg-background">
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
          <h1 className="text-2xl font-bold text-foreground mb-6 text-center">
            {language === 'en' ? 'Claim Result' : 'Ibisubizo by\'ikibazo'}
          </h1>
          
          <div className="space-y-6">
            <ResultCard success={result.approved} reason={result.reason} />
            
            <Link href="/farmer/dashboard">
              <Button className="w-full py-6">
                <Home className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Back to Dashboard' : 'Subira ku rupapuro rw\'ibanze'}
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

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

        <h1 className="text-2xl font-bold text-foreground mb-2">{t('dashboard.submitClaim')}</h1>
        <p className="text-muted-foreground mb-6">
          {language === 'en' ? 'Report crop damage or loss' : 'Menyesha ibyangirika cyangwa igihombo'}
        </p>

        <ProgressSteps steps={steps} currentStep={step} />

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              {step === 0 && <AlertTriangle className="h-5 w-5 text-orange-500" />}
              {step === 1 && <FileText className="h-5 w-5 text-primary" />}
              {step === 2 && <Upload className="h-5 w-5 text-blue-500" />}
              {step === 3 && <Check className="h-5 w-5 text-primary" />}
              {step === 0 && t('form.lossType')}
              {step === 1 && t('form.description')}
              {step === 2 && t('form.uploadImage')}
              {step === 3 && (language === 'en' ? 'Review & Submit' : 'Suzuma hanyuma wohereze')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 0 && (
              <div className="grid grid-cols-2 gap-3">
                {lossTypes.map((loss) => (
                  <button
                    key={loss.value}
                    onClick={() => handleInputChange('lossType', loss.value)}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      formData.lossType === loss.value
                        ? 'border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-400'
                        : 'border-border bg-card hover:border-amber-400/50'
                    }`}
                  >
                    <AlertTriangle className={`h-6 w-6 mx-auto mb-2 ${
                      formData.lossType === loss.value ? 'text-amber-500' : 'text-muted-foreground'
                    }`} />
                    <span className="font-medium text-sm">{loss.label[language]}</span>
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-2">
                <Label htmlFor="description">{t('form.description')}</Label>
                <Textarea
                  id="description"
                  placeholder={language === 'en' 
                    ? 'Describe what happened to your crops...'
                    : 'Sobanura ibyabaye ku bihingwa byawe...'}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={5}
                  className="text-base"
                />
                <p className="text-sm text-muted-foreground">
                  {language === 'en' 
                    ? 'Be specific about the damage and affected area'
                    : 'Sobanura neza ibyangirika n\'ahantu habishyizeho'}
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div 
                  onClick={() => handleInputChange('imageUploaded', true)}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                    formData.imageUploaded 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {formData.imageUploaded ? (
                    <div className="text-primary">
                      <Check className="h-12 w-12 mx-auto mb-2" />
                      <p className="font-medium">
                        {language === 'en' ? 'Image uploaded' : 'Ifoto yoherejwe'}
                      </p>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="font-medium text-foreground">
                        {language === 'en' ? 'Tap to upload photo' : 'Kanda hano winjize ifoto'}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {language === 'en' ? 'Optional but recommended' : 'Si ngombwa ariko birasabwa'}
                      </p>
                    </>
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                  <DetailRow 
                    label={t('form.lossType')} 
                    value={selectedLoss?.label[language] || '-'} 
                  />
                  <DetailRow 
                    label={t('form.description')} 
                    value={formData.description || '-'} 
                  />
                  <DetailRow 
                    label={t('form.uploadImage')} 
                    value={formData.imageUploaded 
                      ? (language === 'en' ? 'Yes' : 'Yego') 
                      : (language === 'en' ? 'No' : 'Oya')} 
                  />
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-sm">
                  <p className="font-medium text-amber-700 dark:text-amber-400 mb-1">
                    {language === 'en' ? 'Important' : "Iby'ingenzi"}
                  </p>
                  <p className="text-amber-600 dark:text-amber-500">
                    {language === 'en' 
                      ? 'False claims may result in account suspension and legal action.'
                      : 'Ibibazo by\'ibinyoma bishobora gutera gufungwa kwa konti n\'ibirego mu mategeko.'}
                  </p>
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
                <Button 
                  onClick={handleNext} 
                  className="flex-1 py-6" 
                  disabled={step === 0 && !formData.lossType}
                >
                  {t('common.next')}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1 py-6">
                  {isSubmitting ? (
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
    <div>
      <span className="text-muted-foreground text-sm">{label}</span>
      <p className="font-medium mt-0.5">{value}</p>
    </div>
  );
}
