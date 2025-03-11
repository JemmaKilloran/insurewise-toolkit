
export interface InsuranceType {
  id: string;
  name: string;
  description: string;
  importance: 'essential' | 'recommended' | 'optional';
  coverageDetails: string[];
  relevantFor: BusinessType[];
  icon: string;
}

export interface BusinessType {
  id: string;
  name: string;
  description: string;
}

export interface IndustryType {
  id: string;
  name: string;
  businesses: BusinessType[];
}

export interface BusinessSize {
  id: string;
  name: string;
  employeeRange: string;
  revenueRange?: string;
}

export interface InsuranceQuestion {
  id: string;
  question: string;
  helpText?: string;
  answerType: 'single' | 'multiple' | 'scale' | 'boolean';
  options?: string[];
  relevanceScore: {
    [insuranceId: string]: number;
  };
}

export interface AssessmentResult {
  recommendedInsurance: InsuranceType[];
  relevanceScores: {
    [insuranceId: string]: number;
  };
  businessProfile: {
    industry?: string;
    size?: string;
    employeeCount?: number;
    hasCommercialProperty?: boolean;
    offersProfessionalServices?: boolean;
    usesVehicles?: boolean;
    hasCyberRisks?: boolean;
  };
}
