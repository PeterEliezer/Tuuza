'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageToggle } from '@/components/language-toggle';
import { useLanguage } from '@/lib/language-context';
import { ArrowLeft, CheckCircle2, XCircle, Clock, HandCoins, FileText } from 'lucide-react';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';

export default function StatusPage() {
  const { t, language } = useLanguage();

  // Simulated application status data
  const applications = [
    {
      id: '1',
      type: 'grant',
      title: language === 'en' ? 'Season A Grant 2024' : 'Impano y\'Igihembwe A 2024',
      status: 'approved',
      date: '2024-02-05',
      amount: 'RWF 150,000',
    },
    {
      id: '2',
      type: 'claim',
      title: language === 'en' ? 'Drought Damage Claim' : 'Ikibazo cy\'Amapfa',
      status: 'pending',
      date: '2024-04-15',
    },
    {
      id: '3',
      type: 'grant',
      title: language === 'en' ? 'Fertilizer Support' : 'Ubufasha bw\'Ifumbire',
      status: 'rejected',
      date: '2024-03-20',
      reason: language === 'en' ? 'Exceeded land size limit' : 'Ingano y\'ubutaka yarenze',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-5 w-5 text-primary" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <Clock className="h-5 w-5 text-accent-foreground" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved':
        return t('result.approved');
      case 'rejected':
        return t('result.rejected');
      default:
        return t('result.pending');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'rejected':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-accent/20 text-accent-foreground border-accent/30';
    }
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

        <h1 className="text-2xl font-bold text-foreground mb-2">{t('dashboard.viewStatus')}</h1>
        <p className="text-muted-foreground mb-6">
          {t('status.trackApplications')}
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-primary/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-primary">1</div>
            <div className="text-xs text-muted-foreground">{t('result.approved')}</div>
          </div>
          <div className="bg-accent/20 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-accent-foreground">1</div>
            <div className="text-xs text-muted-foreground">{t('result.pending')}</div>
          </div>
          <div className="bg-destructive/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-destructive">1</div>
            <div className="text-xs text-muted-foreground">{t('result.rejected')}</div>
          </div>
        </div>

        {/* Applications List */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-lg">
              {t('status.yourApplications')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {applications.map((app) => (
              <div 
                key={app.id} 
                className={`rounded-xl border-2 p-4 ${getStatusColor(app.status)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-card rounded-lg">
                    {app.type === 'grant' 
                      ? <HandCoins className="h-5 w-5 text-accent-foreground" />
                      : <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">{app.title}</h3>
                      {getStatusIcon(app.status)}
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        app.status === 'approved' ? 'bg-primary text-primary-foreground' :
                        app.status === 'rejected' ? 'bg-destructive text-white' :
                        'bg-accent text-accent-foreground'
                      }`}>
                        {getStatusLabel(app.status)}
                      </span>
                      <span className="text-xs text-muted-foreground">{app.date}</span>
                    </div>
                    {app.amount && (
                      <p className="text-sm font-medium">{app.amount}</p>
                    )}
                    {app.reason && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {t('result.reason')}: {app.reason}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-3 mt-6">
          <Link href="/farmer/apply-grant" className="flex-1">
            <Button variant="outline" className="w-full py-6">
              <HandCoins className="h-4 w-4 mr-2" />
              {t('dashboard.applyGrant')}
            </Button>
          </Link>
          <Link href="/farmer/submit-claim" className="flex-1">
            <Button variant="outline" className="w-full py-6">
              <FileText className="h-4 w-4 mr-2" />
              {t('dashboard.submitClaim')}
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
