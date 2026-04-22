'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Users,
  Eye,
  XCircle,
  MapPin,
  Phone,
  Calendar,
  Wheat,
  FileText
} from 'lucide-react';
import { dummyFarmers, dummyFarms, dummyGrantApplications, dummyInsuranceClaims } from '@/lib/data';
import type { Farmer } from '@/lib/types';

export default function FarmersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

  const filteredFarmers = dummyFarmers.filter(farmer => 
    farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farmer.nationalId.includes(searchQuery)
  );

  const getFarmerFarms = (farmerId: string) => {
    return dummyFarms.filter(farm => farm.farmerId === farmerId);
  };

  const getFarmerApplications = (farmerId: string) => {
    return dummyGrantApplications.filter(app => app.farmerId === farmerId);
  };

  const getFarmerClaims = (farmerId: string) => {
    return dummyInsuranceClaims.filter(claim => claim.farmerId === farmerId);
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-xl">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Farmer Records</h1>
        </div>
        <p className="text-muted-foreground">View and manage registered farmers</p>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or National ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 max-w-md"
        />
      </div>

      {/* Farmers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFarmers.map((farmer) => {
          const farms = getFarmerFarms(farmer.id);
          const applications = getFarmerApplications(farmer.id);
          
          return (
            <Card key={farmer.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{farmer.name}</h3>
                    <p className="text-sm text-muted-foreground">ID: {farmer.nationalId.slice(-8)}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{farmer.location.district}, {farmer.location.province}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{farmer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Registered: {farmer.registeredAt}</span>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  <div className="flex-1 bg-muted/50 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-foreground">{farms.length}</div>
                    <div className="text-xs text-muted-foreground">Farms</div>
                  </div>
                  <div className="flex-1 bg-muted/50 rounded-lg p-2 text-center">
                    <div className="text-lg font-bold text-foreground">{applications.length}</div>
                    <div className="text-xs text-muted-foreground">Applications</div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setSelectedFarmer(farmer)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredFarmers.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No farmers found</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedFarmer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center justify-between">
                <span>Farmer Profile</span>
                <Button variant="ghost" size="sm" onClick={() => setSelectedFarmer(null)}>
                  <XCircle className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selectedFarmer.name}</h2>
                  <p className="text-muted-foreground">National ID: {selectedFarmer.nationalId}</p>
                </div>
              </div>

              {/* Contact & Location */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-xl p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Contact</h3>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{selectedFarmer.phone}</span>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-xl p-4">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Location</h3>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{selectedFarmer.location.sector}, {selectedFarmer.location.district}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{selectedFarmer.location.province}</p>
                </div>
              </div>

              {/* Farms */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <Wheat className="h-4 w-4" />
                  Registered Farms
                </h3>
                <div className="space-y-2">
                  {getFarmerFarms(selectedFarmer.id).map((farm) => (
                    <div key={farm.id} className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium capitalize">{farm.cropType.replace('_', ' ')}</span>
                        <span className="text-sm text-muted-foreground">{farm.landSize} ha</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{farm.location}</p>
                    </div>
                  ))}
                  {getFarmerFarms(selectedFarmer.id).length === 0 && (
                    <p className="text-muted-foreground text-sm">No farms registered</p>
                  )}
                </div>
              </div>

              {/* Applications */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Grant Applications
                </h3>
                <div className="space-y-2">
                  {getFarmerApplications(selectedFarmer.id).map((app) => (
                    <div key={app.id} className="bg-muted/50 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <span className="font-medium capitalize">{app.cropType} - {app.landSize} ha</span>
                        <p className="text-sm text-muted-foreground">{app.appliedAt}</p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${
                        app.status === 'approved' ? 'bg-primary/20 text-primary' :
                        app.status === 'rejected' ? 'bg-destructive/20 text-destructive' :
                        'bg-accent/30 text-accent-foreground'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                  ))}
                  {getFarmerApplications(selectedFarmer.id).length === 0 && (
                    <p className="text-muted-foreground text-sm">No applications</p>
                  )}
                </div>
              </div>

              {/* Claims */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Insurance Claims
                </h3>
                <div className="space-y-2">
                  {getFarmerClaims(selectedFarmer.id).map((claim) => (
                    <div key={claim.id} className={`rounded-xl p-4 flex items-center justify-between ${
                      claim.isSuspicious ? 'bg-orange-50 border border-orange-200' : 'bg-muted/50'
                    }`}>
                      <div>
                        <span className="font-medium capitalize">{claim.lossType}</span>
                        <p className="text-sm text-muted-foreground">{claim.submittedAt}</p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${
                        claim.isSuspicious ? 'bg-orange-500 text-white' :
                        claim.status === 'approved' ? 'bg-primary/20 text-primary' :
                        claim.status === 'rejected' ? 'bg-destructive/20 text-destructive' :
                        'bg-accent/30 text-accent-foreground'
                      }`}>
                        {claim.isSuspicious ? 'Suspicious' : claim.status}
                      </span>
                    </div>
                  ))}
                  {getFarmerClaims(selectedFarmer.id).length === 0 && (
                    <p className="text-muted-foreground text-sm">No claims</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
