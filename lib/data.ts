import type { Farmer, Farm, GrantApplication, InsuranceClaim, DashboardStats } from './types';

export const dummyFarmers: Farmer[] = [
  {
    id: '1',
    nationalId: '1199880012345678',
    name: 'Jean Baptiste Habimana',
    phone: '+250788123456',
    location: {
      province: 'Eastern',
      district: 'Kayonza',
      sector: 'Mukarange',
      gpsCoordinates: '-1.8521, 30.5234',
    },
    registeredAt: '2024-01-15',
  },
  {
    id: '2',
    nationalId: '1199080087654321',
    name: 'Marie Claire Uwimana',
    phone: '+250788654321',
    location: {
      province: 'Southern',
      district: 'Huye',
      sector: 'Ngoma',
      gpsCoordinates: '-2.5967, 29.7392',
    },
    registeredAt: '2024-02-20',
  },
  {
    id: '3',
    nationalId: '1198580045678912',
    name: 'Emmanuel Nshimiyimana',
    phone: '+250788789012',
    location: {
      province: 'Northern',
      district: 'Musanze',
      sector: 'Muhoza',
      gpsCoordinates: '-1.4983, 29.6347',
    },
    registeredAt: '2024-03-10',
  },
];

export const dummyFarms: Farm[] = [
  {
    id: '1',
    farmerId: '1',
    cropType: 'maize',
    landSize: 2.5,
    location: 'Mukarange, Kayonza',
    gpsCoordinates: '-1.8521, 30.5234',
    registeredAt: '2024-01-20',
  },
  {
    id: '2',
    farmerId: '2',
    cropType: 'beans',
    landSize: 1.8,
    location: 'Ngoma, Huye',
    gpsCoordinates: '-2.5967, 29.7392',
    registeredAt: '2024-02-25',
  },
  {
    id: '3',
    farmerId: '3',
    cropType: 'irish_potatoes',
    landSize: 3.2,
    location: 'Muhoza, Musanze',
    gpsCoordinates: '-1.4983, 29.6347',
    registeredAt: '2024-03-15',
  },
];

export const dummyGrantApplications: GrantApplication[] = [
  {
    id: '1',
    farmerId: '1',
    farmerName: 'Jean Baptiste Habimana',
    farmId: '1',
    cropType: 'maize',
    landSize: 2.5,
    status: 'approved',
    decision: {
      eligible: true,
      reason: 'All eligibility criteria met. Farm size and crop type qualify for Season A grant.',
    },
    appliedAt: '2024-02-01',
    reviewedAt: '2024-02-05',
  },
  {
    id: '2',
    farmerId: '2',
    farmerName: 'Marie Claire Uwimana',
    farmId: '2',
    cropType: 'beans',
    landSize: 1.8,
    status: 'pending',
    appliedAt: '2024-03-15',
  },
  {
    id: '3',
    farmerId: '3',
    farmerName: 'Emmanuel Nshimiyimana',
    farmId: '3',
    cropType: 'irish_potatoes',
    landSize: 3.2,
    status: 'rejected',
    decision: {
      eligible: false,
      reason: 'Land size exceeds maximum limit for small-holder farmer grant program.',
    },
    appliedAt: '2024-03-20',
    reviewedAt: '2024-03-25',
  },
];

export const dummyInsuranceClaims: InsuranceClaim[] = [
  {
    id: '1',
    farmerId: '1',
    farmerName: 'Jean Baptiste Habimana',
    farmId: '1',
    lossType: 'drought',
    description: 'Severe drought affected 80% of maize crop. Plants dried before maturity.',
    status: 'approved',
    isSuspicious: false,
    decision: {
      approved: true,
      reason: 'Satellite imagery confirms drought conditions in the area. Claim verified.',
    },
    submittedAt: '2024-04-01',
    reviewedAt: '2024-04-05',
  },
  {
    id: '2',
    farmerId: '2',
    farmerName: 'Marie Claire Uwimana',
    farmId: '2',
    lossType: 'pest',
    description: 'Fall armyworm infestation destroyed bean crops.',
    status: 'suspicious',
    isSuspicious: true,
    submittedAt: '2024-04-10',
  },
  {
    id: '3',
    farmerId: '3',
    farmerName: 'Emmanuel Nshimiyimana',
    farmId: '3',
    lossType: 'flood',
    description: 'Heavy rains caused flooding, destroying potato fields.',
    status: 'pending',
    isSuspicious: false,
    submittedAt: '2024-04-15',
  },
];

export const dashboardStats: DashboardStats = {
  totalFarmers: 1247,
  totalApplications: 856,
  approvedApplications: 534,
  rejectedApplications: 189,
  pendingApplications: 133,
  suspiciousClaims: 23,
};

export const cropTypes = [
  { value: 'maize', label: { en: 'Maize', rw: 'Ibigori' } },
  { value: 'beans', label: { en: 'Beans', rw: 'Ibishyimbo' } },
  { value: 'irish_potatoes', label: { en: 'Irish Potatoes', rw: 'Ibirayi' } },
  { value: 'rice', label: { en: 'Rice', rw: 'Umuceri' } },
  { value: 'sorghum', label: { en: 'Sorghum', rw: 'Amasaka' } },
];

export const lossTypes = [
  { value: 'drought', label: { en: 'Drought', rw: 'Amapfa' } },
  { value: 'flood', label: { en: 'Flood', rw: 'Umwuzure' } },
  { value: 'pest', label: { en: 'Pest Attack', rw: 'Ibyonnyi' } },
  { value: 'disease', label: { en: 'Crop Disease', rw: 'Indwara' } },
  { value: 'hail', label: { en: 'Hail Damage', rw: 'Urubura' } },
  { value: 'other', label: { en: 'Other', rw: 'Ibindi' } },
];

export const provinces = [
  { value: 'eastern', label: { en: 'Eastern Province', rw: 'Intara y\'Iburasirazuba' } },
  { value: 'western', label: { en: 'Western Province', rw: 'Intara y\'Iburengerazuba' } },
  { value: 'northern', label: { en: 'Northern Province', rw: 'Intara y\'Amajyaruguru' } },
  { value: 'southern', label: { en: 'Southern Province', rw: 'Intara y\'Amajyepfo' } },
  { value: 'kigali', label: { en: 'City of Kigali', rw: 'Umujyi wa Kigali' } },
];
