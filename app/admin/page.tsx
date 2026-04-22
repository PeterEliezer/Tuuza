'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Clock,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { dashboardStats, dummyGrantApplications, dummyInsuranceClaims } from '@/lib/data';

export default function AdminOverviewPage() {
  const recentApplications = dummyGrantApplications.slice(0, 3);
  const recentClaims = dummyInsuranceClaims.slice(0, 3);

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">Monitor platform activity and key metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatCard
          title="Total Farmers"
          value={dashboardStats.totalFarmers.toLocaleString()}
          icon={Users}
          trend={{ value: 12, positive: true }}
          color="primary"
        />
        <StatCard
          title="Total Applications"
          value={dashboardStats.totalApplications.toLocaleString()}
          icon={FileText}
          trend={{ value: 8, positive: true }}
          color="blue"
        />
        <StatCard
          title="Approved"
          value={dashboardStats.approvedApplications.toLocaleString()}
          icon={CheckCircle2}
          trend={{ value: 15, positive: true }}
          color="green"
        />
        <StatCard
          title="Suspicious Claims"
          value={dashboardStats.suspiciousClaims.toString()}
          icon={AlertTriangle}
          trend={{ value: 3, positive: false }}
          color="orange"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-primary/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">{dashboardStats.approvedApplications}</div>
          <div className="text-sm text-muted-foreground">Approved</div>
        </div>
        <div className="bg-accent/20 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-accent-foreground">{dashboardStats.pendingApplications}</div>
          <div className="text-sm text-muted-foreground">Pending</div>
        </div>
        <div className="bg-destructive/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-destructive">{dashboardStats.rejectedApplications}</div>
          <div className="text-sm text-muted-foreground">Rejected</div>
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Applications</CardTitle>
            <a href="/admin/applications" className="text-sm text-primary hover:underline">
              View all
            </a>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div key={app.id} className="flex items-center gap-4 p-3 bg-muted/50 rounded-xl">
                  <div className={`p-2 rounded-lg ${
                    app.status === 'approved' ? 'bg-primary/20' :
                    app.status === 'rejected' ? 'bg-destructive/20' :
                    'bg-accent/20'
                  }`}>
                    {app.status === 'approved' ? <CheckCircle2 className="h-4 w-4 text-primary" /> :
                     app.status === 'rejected' ? <XCircle className="h-4 w-4 text-destructive" /> :
                     <Clock className="h-4 w-4 text-accent-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{app.farmerName}</p>
                    <p className="text-sm text-muted-foreground">{app.cropType} - {app.landSize} ha</p>
                  </div>
                  <StatusBadge status={app.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Claims */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Claims</CardTitle>
            <a href="/admin/suspicious" className="text-sm text-primary hover:underline">
              View suspicious
            </a>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentClaims.map((claim) => (
                <div key={claim.id} className={`flex items-center gap-4 p-3 rounded-xl ${
                  claim.isSuspicious ? 'bg-orange-50 border border-orange-200' : 'bg-muted/50'
                }`}>
                  <div className={`p-2 rounded-lg ${
                    claim.isSuspicious ? 'bg-orange-200' :
                    claim.status === 'approved' ? 'bg-primary/20' :
                    claim.status === 'rejected' ? 'bg-destructive/20' :
                    'bg-accent/20'
                  }`}>
                    {claim.isSuspicious ? <AlertTriangle className="h-4 w-4 text-orange-600" /> :
                     claim.status === 'approved' ? <CheckCircle2 className="h-4 w-4 text-primary" /> :
                     claim.status === 'rejected' ? <XCircle className="h-4 w-4 text-destructive" /> :
                     <Clock className="h-4 w-4 text-accent-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{claim.farmerName}</p>
                    <p className="text-sm text-muted-foreground capitalize">{claim.lossType}</p>
                  </div>
                  {claim.isSuspicious ? (
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-500 text-white">
                      Review
                    </span>
                  ) : (
                    <StatusBadge status={claim.status} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend,
  color 
}: { 
  title: string;
  value: string;
  icon: typeof Users;
  trend?: { value: number; positive: boolean };
  color: 'primary' | 'blue' | 'green' | 'orange';
}) {
  const colorStyles = {
    primary: 'bg-primary/10 text-primary',
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-primary/10 text-primary',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <Card>
      <CardContent className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-3">
          <div className={`p-2 rounded-lg ${colorStyles[color]}`}>
            <Icon className="h-5 w-5" />
          </div>
          {trend && (
            <div className={`flex items-center gap-1 text-xs font-medium ${
              trend.positive ? 'text-primary' : 'text-destructive'
            }`}>
              {trend.positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {trend.value}%
            </div>
          )}
        </div>
        <div className="text-2xl lg:text-3xl font-bold text-foreground">{value}</div>
        <div className="text-sm text-muted-foreground mt-1">{title}</div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles = {
    approved: 'bg-primary/20 text-primary',
    rejected: 'bg-destructive/20 text-destructive',
    pending: 'bg-accent/30 text-accent-foreground',
    suspicious: 'bg-orange-100 text-orange-700',
  };

  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${styles[status as keyof typeof styles] || styles.pending}`}>
      {status}
    </span>
  );
}
