'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageToggle } from '@/components/language-toggle';
import { LanguageProvider, useLanguage } from '@/lib/language-context';
import { ThemeProvider } from '@/lib/theme-context';
import { 
  LayoutDashboard, 
  FileText, 
  AlertTriangle, 
  Users,
  Menu,
  X,
  LogOut
} from 'lucide-react';

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { href: '/admin', label: t('admin.overview'), icon: LayoutDashboard },
    { href: '/admin/applications', label: t('admin.applications'), icon: FileText },
    { href: '/admin/suspicious', label: t('admin.suspiciousClaims'), icon: AlertTriangle },
    { href: '/admin/farmers', label: t('admin.farmerRecords'), icon: Users },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-card border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <Logo size="sm" href="/admin" />
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}>
          {/* Logo */}
          <div className="hidden lg:flex items-center justify-between px-6 py-5 border-b border-border">
            <div className="flex items-center gap-2">
              <Logo size="sm" href="/admin" />
              <span className="text-xs text-muted-foreground block">{t('admin.portal')}</span>
            </div>
            <div className="flex items-center gap-1">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1 mt-4 lg:mt-0">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }
                  `}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                  {item.href === '/admin/suspicious' && (
                    <span className="ml-auto bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                      23
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                <LogOut className="h-5 w-5" />
                {t('admin.exitAdmin')}
              </Button>
            </Link>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}

  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AdminLayoutContent>{children}</AdminLayoutContent>
      </LanguageProvider>
    </ThemeProvider>
  );
}
