'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  ChevronDown
} from 'lucide-react';
import { dummyGrantApplications } from '@/lib/data';
import type { GrantApplication } from '@/lib/types';

export default function ApplicationsPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<GrantApplication | null>(null);

  const filteredApplications = dummyGrantApplications.filter(app => {
    const matchesFilter = filter === 'all' || app.status === filter;
    const matchesSearch = app.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.cropType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="h-4 w-4 text-primary" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-accent-foreground" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-primary/20 text-primary';
      case 'rejected':
        return 'bg-destructive/20 text-destructive';
      default:
        return 'bg-accent/30 text-accent-foreground';
    }
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Applications Management</h1>
        <p className="text-muted-foreground mt-1">Review and manage grant applications</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by farmer name or crop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(status)}
              className="capitalize"
            >
              {status}
            </Button>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Applications ({filteredApplications.length})</span>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Farmer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Crop</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Land Size</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-foreground">{app.farmerName}</p>
                        <p className="text-sm text-muted-foreground">ID: {app.farmerId}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 capitalize">{app.cropType}</td>
                    <td className="py-4 px-4">{app.landSize} ha</td>
                    <td className="py-4 px-4 text-muted-foreground">{app.appliedAt}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full capitalize ${getStatusStyle(app.status)}`}>
                        {getStatusIcon(app.status)}
                        {app.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedApp(app)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {filteredApplications.map((app) => (
              <div key={app.id} className="bg-muted/50 rounded-xl p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-foreground">{app.farmerName}</p>
                    <p className="text-sm text-muted-foreground">ID: {app.farmerId}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full capitalize ${getStatusStyle(app.status)}`}>
                    {getStatusIcon(app.status)}
                    {app.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <span className="text-muted-foreground">Crop:</span>
                    <span className="ml-1 capitalize">{app.cropType}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Size:</span>
                    <span className="ml-1">{app.landSize} ha</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{app.appliedAt}</span>
                  <Button variant="outline" size="sm" onClick={() => setSelectedApp(app)}>
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {filteredApplications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No applications found</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Application Details</span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedApp(null)}>
                  <XCircle className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Farmer Name</p>
                  <p className="font-medium">{selectedApp.farmerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Farmer ID</p>
                  <p className="font-medium">{selectedApp.farmerId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Crop Type</p>
                  <p className="font-medium capitalize">{selectedApp.cropType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Land Size</p>
                  <p className="font-medium">{selectedApp.landSize} hectares</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Applied Date</p>
                  <p className="font-medium">{selectedApp.appliedAt}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full capitalize ${getStatusStyle(selectedApp.status)}`}>
                    {getStatusIcon(selectedApp.status)}
                    {selectedApp.status}
                  </span>
                </div>
              </div>

              {selectedApp.decision && (
                <div className="bg-muted/50 rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-1">Decision Reason</p>
                  <p className="text-foreground">{selectedApp.decision.reason}</p>
                </div>
              )}

              {selectedApp.status === 'pending' && (
                <div className="flex gap-3">
                  <Button className="flex-1" variant="default">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                  <Button className="flex-1" variant="destructive">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
