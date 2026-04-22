'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageToggle } from '@/components/language-toggle';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';
import { useLanguage } from '@/lib/language-context';
import { 
  LogOut, 
  Wheat, 
  HandCoins, 
  FileText, 
  BarChart3, 
  User,
  MapPin,
  Leaf,
  Clock,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ChevronRight
} from 'lucide-react';

// Mock data for the dashboard
const farmerData = {
  name: 'Jean Baptiste',
  farms: 2,
  totalLand: 3.5,
  grants: 1,
  claims: 0,
  pendingClaims: 1,
  approvedGrants: 1,
  activeCrops: ['Maize', 'Beans'],
};

const recentActivity = [
  { id: 1, type: 'farm', action: 'registered', date: '2024-01-15', details: 'Musanze Farm - 2.5 ha' },
  { id: 2, type: 'grant', action: 'approved', date: '2024-01-10', details: 'Seed Grant - 50,000 RWF' },
  { id: 3, type: 'claim', action: 'pending', date: '2024-01-05', details: 'Drought damage claim' },
];

export default function FarmerDashboard() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-muted-foreground">
                <LogOut className="h-4 w-4" />
                <span className="sr-only">{t('common.logout')}</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Welcome Section */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 rounded-2xl p-6 mb-6 border border-primary/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-primary/20 p-4 rounded-full">
                <User className="h-10 w-10 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">{t('dashboard.welcome')}</p>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{farmerData.name}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Musanze, Northern Province</span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            icon={MapPin}
            value={`${farmerData.totalLand}`}
            label={t('dashboard.hectares')}
            title={t('dashboard.totalLand')}
            color="primary"
          />
          <StatCard 
            icon={Leaf}
            value={farmerData.activeCrops.length.toString()}
            label={t('dashboard.activeCrops')}
            title={t('dashboard.activeCrops')}
            color="green"
          />
          <StatCard 
            icon={Clock}
            value={farmerData.pendingClaims.toString()}
            label={t('dashboard.pendingClaims')}
            title={t('dashboard.pendingClaims')}
            color="yellow"
          />
          <StatCard 
            icon={CheckCircle2}
            value={farmerData.approvedGrants.toString()}
            label={t('dashboard.approvedGrants')}
            title={t('dashboard.approvedGrants')}
            color="blue"
          />
        </div>

        {/* Main Actions Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <ActionCard
            href="/farmer/register-farm"
            icon={Wheat}
            title={t('dashboard.registerFarm')}
            description={t('dashboard.registerFarm.desc')}
            color="green"
          />
          <ActionCard
            href="/farmer/apply-grant"
            icon={HandCoins}
            title={t('dashboard.applyGrant')}
            description={t('dashboard.applyGrant.desc')}
            color="yellow"
          />
          <ActionCard
            href="/farmer/submit-claim"
            icon={FileText}
            title={t('dashboard.submitClaim')}
            description={t('dashboard.submitClaim.desc')}
            color="blue"
          />
          <ActionCard
            href="/farmer/status"
            icon={BarChart3}
            title={t('dashboard.viewStatus')}
            description={t('dashboard.viewStatus.desc')}
            color="orange"
          />
        </div>

        {/* Bottom Section - Activity and Crops */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {t('dashboard.recentActivity')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <ActivityItem 
                    key={activity.id} 
                    activity={activity}
                    language={language}
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  {t('dashboard.noActivity')}
                </p>
              )}
            </CardContent>
          </Card>

          {/* My Farms Overview */}
          <Card className="border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Wheat className="h-5 w-5 text-primary" />
                {t('dashboard.farms')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <FarmCard 
                name="Musanze Farm"
                location="Musanze District"
                size={2.5}
                crops={['Maize', 'Beans']}
                language={language}
              />
              <FarmCard 
                name="Rubavu Farm"
                location="Rubavu District"
                size={1.0}
                crops={['Irish Potatoes']}
                language={language}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function StatCard({ 
  icon: Icon, 
  value, 
  label, 
  title,
  color 
}: { 
  icon: typeof MapPin;
  value: string;
  label: string;
  title: string;
  color: 'primary' | 'green' | 'yellow' | 'blue';
}) {
  const colorStyles = {
    primary: 'bg-primary/10 text-primary',
    green: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    yellow: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  };

  return (
    <Card className="border-border">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${colorStyles[color]}`}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionCard({ 
  href, 
  icon: Icon, 
  title, 
  description,
  color 
}: { 
  href: string;
  icon: typeof Wheat;
  title: string;
  description: string;
  color: 'green' | 'yellow' | 'blue' | 'orange';
}) {
  const colorStyles = {
    green: 'bg-primary hover:bg-primary/90',
    yellow: 'bg-accent hover:bg-accent/90',
    blue: 'bg-blue-500 hover:bg-blue-600',
    orange: 'bg-orange-500 hover:bg-orange-600',
  };

  return (
    <Link href={href} className="group">
      <Card className="h-full border-border hover:shadow-lg transition-all duration-200 hover:border-primary/30">
        <CardContent className="p-5 flex flex-col h-full">
          <div className={`self-start p-3 rounded-xl mb-4 text-white ${colorStyles[color]}`}>
            <Icon className="h-6 w-6" strokeWidth={2} />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground flex-1">{description}</p>
          <div className="flex items-center gap-1 text-primary text-sm font-medium mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function ActivityItem({ activity, language }: { 
  activity: { id: number; type: string; action: string; date: string; details: string };
  language: 'en' | 'rw';
}) {
  const statusStyles = {
    registered: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    approved: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    rejected: 'bg-red-500/10 text-red-600 dark:text-red-400',
  };

  const statusIcons = {
    registered: CheckCircle2,
    approved: CheckCircle2,
    pending: Clock,
    rejected: AlertCircle,
  };

  const StatusIcon = statusIcons[activity.action as keyof typeof statusIcons] || Clock;

  const actionLabels = {
    registered: { en: 'Registered', rw: 'Byanditswe' },
    approved: { en: 'Approved', rw: 'Byemejwe' },
    pending: { en: 'Pending', rw: 'Bitegerejwe' },
    rejected: { en: 'Rejected', rw: 'Byanzwe' },
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className={`p-2 rounded-lg ${statusStyles[activity.action as keyof typeof statusStyles]}`}>
        <StatusIcon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{activity.details}</p>
        <p className="text-xs text-muted-foreground">
          {actionLabels[activity.action as keyof typeof actionLabels]?.[language] || activity.action} - {activity.date}
        </p>
      </div>
    </div>
  );
}

function FarmCard({ name, location, size, crops, language }: {
  name: string;
  location: string;
  size: number;
  crops: string[];
  language: 'en' | 'rw';
}) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
      <div className="bg-primary/10 p-3 rounded-xl">
        <MapPin className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground">{name}</p>
        <p className="text-sm text-muted-foreground">{location}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {size} {language === 'en' ? 'ha' : 'hegitari'}
          </span>
          {crops.map((crop) => (
            <span key={crop} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
              {crop}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
