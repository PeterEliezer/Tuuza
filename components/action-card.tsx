'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

interface ActionCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description?: string;
  color: 'green' | 'yellow' | 'blue' | 'orange';
}

const colorStyles = {
  green: 'bg-primary/10 text-primary hover:bg-primary/20 border-primary/20',
  yellow: 'bg-accent/20 text-accent-foreground hover:bg-accent/30 border-accent/30',
  blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200',
  orange: 'bg-orange-50 text-orange-700 hover:bg-orange-100 border-orange-200',
};

const iconColors = {
  green: 'bg-primary text-primary-foreground',
  yellow: 'bg-accent text-accent-foreground',
  blue: 'bg-blue-500 text-white',
  orange: 'bg-orange-500 text-white',
};

export function ActionCard({ href, icon: Icon, title, description, color }: ActionCardProps) {
  return (
    <Link href={href}>
      <Card className={`transition-all duration-200 hover:scale-[1.02] hover:shadow-lg cursor-pointer border-2 ${colorStyles[color]}`}>
        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
          <div className={`p-4 rounded-2xl ${iconColors[color]}`}>
            <Icon className="h-10 w-10" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
