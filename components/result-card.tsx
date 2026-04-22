'use client';

import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

interface ResultCardProps {
  success: boolean;
  reason?: string;
}

export function ResultCard({ success, reason }: ResultCardProps) {
  const { t } = useLanguage();

  return (
    <Card className={`border-4 ${success ? 'border-primary bg-primary/5' : 'border-destructive bg-destructive/5'}`}>
      <CardContent className="p-8 flex flex-col items-center text-center gap-6">
        <div className={`p-6 rounded-full ${success ? 'bg-primary' : 'bg-destructive'}`}>
          {success ? (
            <CheckCircle2 className="h-16 w-16 text-white" strokeWidth={2.5} />
          ) : (
            <XCircle className="h-16 w-16 text-white" strokeWidth={2.5} />
          )}
        </div>
        <div>
          <h2 className={`text-3xl font-bold ${success ? 'text-primary' : 'text-destructive'}`}>
            {success ? t('result.eligible') : t('result.notEligible')}
          </h2>
          {reason && (
            <div className="mt-4 p-4 bg-muted rounded-xl">
              <p className="text-sm font-medium text-muted-foreground">{t('result.reason')}:</p>
              <p className="text-foreground mt-1">{reason}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
