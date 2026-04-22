// Farmer Types
export interface Farmer {
  id: string;
  nationalId: string;
  name: string;
  phone: string;
  location: {
    province: string;
    district: string;
    sector: string;
    gpsCoordinates?: string;
  };
  registeredAt: string;
}

export interface Farm {
  id: string;
  farmerId: string;
  cropType: 'maize' | 'beans' | 'irish_potatoes' | 'rice' | 'sorghum';
  landSize: number; // in hectares
  location: string;
  gpsCoordinates?: string;
  registeredAt: string;
}

export interface GrantApplication {
  id: string;
  farmerId: string;
  farmerName: string;
  farmId: string;
  cropType: string;
  landSize: number;
  status: 'pending' | 'approved' | 'rejected';
  decision?: {
    eligible: boolean;
    reason: string;
  };
  appliedAt: string;
  reviewedAt?: string;
}

export interface InsuranceClaim {
  id: string;
  farmerId: string;
  farmerName: string;
  farmId: string;
  lossType: 'drought' | 'flood' | 'pest' | 'disease' | 'hail' | 'other';
  description: string;
  imageUrl?: string;
  status: 'pending' | 'approved' | 'rejected' | 'suspicious';
  isSuspicious: boolean;
  decision?: {
    approved: boolean;
    reason: string;
  };
  submittedAt: string;
  reviewedAt?: string;
}

// Admin Stats
export interface DashboardStats {
  totalFarmers: number;
  totalApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  pendingApplications: number;
  suspiciousClaims: number;
}

// Language
export type Language = 'en' | 'rw';

export interface Translations {
  [key: string]: {
    en: string;
    rw: string;
  };
}
