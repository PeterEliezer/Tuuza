'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  Eye,
  CheckCircle2,
  XCircle,
  MapPin,
  Calendar,
  User,
  FileText,
  Shield
} from 'lucide-react';
import type { InsuranceClaim } from '@/lib/types';

// Extended dummy data for suspicious claims
const suspiciousClaims: InsuranceClaim[] = [
  {
    id: '1',
    farmerId: '2',
    farmerName: 'Marie Claire Uwimana',
    farmId: '2',
    lossType: 'pest',
    description: 'Fall armyworm infestation destroyed bean crops. Multiple reports from same area.',
    status: 'suspicious',
    isSuspicious: true,
    submittedAt: '2024-04-10',
  },
  {
    id: '2',
    farmerId: '5',
    farmerName: 'Patrick Mugabo',
    farmId: '5',
    lossType: 'drought',
    description: 'Complete crop failure due to drought. Claimed 100% loss but satellite shows partial damage.',
    status: 'suspicious',
    isSuspicious: true,
    submittedAt: '2024-04-12',
  },
  {
    id: '3',
    farmerId: '8',
    farmerName: 'Jeanne Mukamana',
    farmId: '8',
    lossType: 'flood',
    description: 'Heavy rains caused flooding. Third claim this season from same location.',
    status: 'suspicious',
    isSuspicious: true,
    submittedAt: '2024-04-14',
  },
  {
    id: '4',
    farmerId: '12',
    farmerName: 'Claude Niyonzima',
    farmId: '12',
    lossType: 'hail',
    description: 'Hail damage to maize. No weather reports confirm hail in the reported area.',
    status: 'suspicious',
    isSuspicious: true,
    submittedAt: '2024-04-15',
  },
];

export default function SuspiciousClaimsPage() {
  const [selectedClaim, setSelectedClaim] = useState<InsuranceClaim | null>(null);

  const getSuspicionReasons = (claim: InsuranceClaim): string[] => {
    const reasons: string[] = [];
    if (claim.lossType === 'drought' && claim.description.includes('100%')) {
      reasons.push('Claimed total loss conflicts with satellite imagery');
    }
    if (claim.description.includes('Third claim')) {
      reasons.push('Multiple claims from same location this season');
    }
    if (claim.description.includes('No weather reports')) {
      reasons.push('Weather data does not confirm reported conditions');
    }
    if (claim.description.includes('Multiple reports')) {
      reasons.push('Unusual pattern detected in regional claims');
    }
    if (reasons.length === 0) {
      reasons.push('Flagged by AI anomaly detection');
    }
    return reasons;
  };

  return (
    <div className="p-6 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-orange-100 rounded-xl">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Suspicious Claims</h1>
        </div>
        <p className="text-muted-foreground">Review and investigate flagged insurance claims</p>
      </div>

      {/* Warning Banner */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Shield className="h-5 w-5 text-orange-600 mt-0.5" />
        <div>
          <p className="font-medium text-orange-800">Fraud Prevention System Active</p>
          <p className="text-sm text-orange-600">
            These claims have been flagged by our AI system for potential irregularities. Manual review required.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{suspiciousClaims.length}</div>
          <div className="text-sm text-muted-foreground">Pending Review</div>
        </div>
        <div className="bg-primary/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">12</div>
          <div className="text-sm text-muted-foreground">Cleared This Week</div>
        </div>
        <div className="bg-destructive/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-destructive">7</div>
          <div className="text-sm text-muted-foreground">Rejected</div>
        </div>
      </div>

      {/* Claims List */}
      <div className="space-y-4">
        {suspiciousClaims.map((claim) => (
          <Card key={claim.id} className="border-orange-200 bg-orange-50/50">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Claim Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-full">
                      Requires Review
                    </span>
                    <span className="text-sm text-muted-foreground capitalize">
                      {claim.lossType} Damage
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium text-foreground">{claim.farmerName}</span>
                    <span className="text-sm text-muted-foreground">ID: {claim.farmerId}</span>
                  </div>

                  <p className="text-muted-foreground text-sm mb-4">{claim.description}</p>

                  {/* Suspicion Reasons */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-orange-700">Flagged Reasons:</p>
                    {getSuspicionReasons(claim).map((reason, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-orange-600">
                        <AlertTriangle className="h-3 w-3" />
                        {reason}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meta & Actions */}
                <div className="flex flex-col gap-3 lg:items-end">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {claim.submittedAt}
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedClaim(claim)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                    <Button variant="default" size="sm">
                      <CheckCircle2 className="h-4 w-4 mr-1" />
                      Clear
                    </Button>
                    <Button variant="destructive" size="sm">
                      <XCircle className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <span>Claim Investigation</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedClaim(null)}>
                  <XCircle className="h-5 w-5" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Farmer Info */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Farmer Information</h3>
                <div className="grid grid-cols-2 gap-4 bg-muted/50 rounded-xl p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedClaim.farmerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Farmer ID</p>
                    <p className="font-medium">{selectedClaim.farmerId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Farm ID</p>
                    <p className="font-medium">{selectedClaim.farmId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Submission Date</p>
                    <p className="font-medium">{selectedClaim.submittedAt}</p>
                  </div>
                </div>
              </div>

              {/* Claim Details */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">Claim Details</h3>
                <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Loss Type</p>
                    <p className="font-medium capitalize">{selectedClaim.lossType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="text-foreground">{selectedClaim.description}</p>
                  </div>
                </div>
              </div>

              {/* Suspicion Analysis */}
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-3">AI Analysis</h3>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 space-y-2">
                  {getSuspicionReasons(selectedClaim).map((reason, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-orange-700">
                      <AlertTriangle className="h-4 w-4" />
                      {reason}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <Button className="flex-1" variant="default">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Clear & Approve
                </Button>
                <Button className="flex-1" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Request More Info
                </Button>
                <Button className="flex-1" variant="destructive">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Claim
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
