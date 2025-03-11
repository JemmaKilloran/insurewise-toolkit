
import { InsuranceType, BusinessType, IndustryType, BusinessSize, InsuranceQuestion } from '@/types/insurance';

export const insuranceTypes: InsuranceType[] = [
  {
    id: 'gl',
    name: 'General Liability',
    description: 'Protects against financial loss as a result of bodily injury, property damage, medical expenses, and defense of lawsuits.',
    importance: 'essential',
    coverageDetails: [
      'Bodily injury and property damage',
      'Personal and advertising injury',
      'Medical payments',
      'Legal defense costs'
    ],
    relevantFor: [
      { id: 'all', name: 'All Businesses', description: 'Any business with physical premises or client interaction' }
    ],
    icon: 'shield',
  },
  {
    id: 'pl',
    name: 'Professional Liability',
    description: 'Also known as Errors & Omissions (E&O) insurance, it protects service-based businesses against claims of negligence or failure to perform professional duties.',
    importance: 'recommended',
    coverageDetails: [
      'Negligence claims',
      'Defense costs',
      'Actual or alleged errors',
      'Incomplete work claims'
    ],
    relevantFor: [
      { id: 'consultant', name: 'Consultants', description: 'Businesses providing advice or services' },
      { id: 'tech', name: 'Technology Companies', description: 'Software developers and IT service providers' },
      { id: 'accounting', name: 'Accounting Firms', description: 'Businesses providing financial advice or services' }
    ],
    icon: 'briefcase',
  },
  {
    id: 'property',
    name: 'Commercial Property',
    description: 'Covers buildings, inventory, furniture, equipment, and other physical assets against damage or loss from covered perils.',
    importance: 'essential',
    coverageDetails: [
      'Building coverage',
      'Business personal property',
      'Business interruption',
      'Equipment breakdown'
    ],
    relevantFor: [
      { id: 'retail', name: 'Retail', description: 'Businesses with physical storefronts' },
      { id: 'manufacturing', name: 'Manufacturing', description: 'Businesses producing physical goods' },
      { id: 'restaurant', name: 'Restaurants', description: 'Food service businesses' }
    ],
    icon: 'building',
  },
  {
    id: 'workers',
    name: 'Workers\' Compensation',
    description: 'Provides benefits to employees who suffer work-related injuries or illnesses, including medical care and replacement income.',
    importance: 'essential',
    coverageDetails: [
      'Medical expenses',
      'Lost wages',
      'Rehabilitation costs',
      'Death benefits'
    ],
    relevantFor: [
      { id: 'employees', name: 'Businesses with Employees', description: 'Required by law in most states for businesses with employees' }
    ],
    icon: 'heart',
  },
  {
    id: 'cyber',
    name: 'Cyber Liability',
    description: 'Protects against damages from data breaches, hacking, ransomware, and other cyber incidents.',
    importance: 'recommended',
    coverageDetails: [
      'Data breach response',
      'Customer notification costs',
      'Cyber extortion',
      'Business interruption from cyber events'
    ],
    relevantFor: [
      { id: 'tech', name: 'Technology Companies', description: 'Software developers and IT service providers' },
      { id: 'data', name: 'Data-Driven Businesses', description: 'Businesses handling sensitive customer information' }
    ],
    icon: 'lock',
  },
  {
    id: 'commercial-auto',
    name: 'Commercial Auto',
    description: 'Covers vehicles used for business purposes, protecting against liability and physical damage.',
    importance: 'recommended',
    coverageDetails: [
      'Liability coverage',
      'Physical damage to vehicles',
      'Medical payments',
      'Uninsured motorist protection'
    ],
    relevantFor: [
      { id: 'transport', name: 'Transportation Services', description: 'Businesses using vehicles for service delivery' },
      { id: 'delivery', name: 'Delivery Services', description: 'Businesses delivering products to customers' }
    ],
    icon: 'truck',
  },
  {
    id: 'bop',
    name: 'Business Owner\'s Policy (BOP)',
    description: 'Combines general liability and commercial property into a bundled package, often at a reduced premium.',
    importance: 'recommended',
    coverageDetails: [
      'General liability protection',
      'Property insurance',
      'Business interruption coverage',
      'Often customizable with additional endorsements'
    ],
    relevantFor: [
      { id: 'small', name: 'Small Businesses', description: 'Ideal for small to medium-sized businesses with physical locations' }
    ],
    icon: 'package',
  },
  {
    id: 'umbrella',
    name: 'Commercial Umbrella',
    description: 'Provides additional liability coverage that goes beyond the limits of your existing policies.',
    importance: 'optional',
    coverageDetails: [
      'Extended liability protection',
      'Coverage when primary policies reach their limits',
      'Additional peace of mind for high-risk businesses'
    ],
    relevantFor: [
      { id: 'high-risk', name: 'High-Risk Businesses', description: 'Businesses with significant liability exposure' },
      { id: 'high-value', name: 'High-Value Businesses', description: 'Businesses with substantial assets to protect' }
    ],
    icon: 'umbrella',
  }
];

export const industries: IndustryType[] = [
  {
    id: 'retail',
    name: 'Retail',
    businesses: [
      { id: 'storefront', name: 'Storefront Retail', description: 'Physical retail locations' },
      { id: 'ecommerce', name: 'E-commerce', description: 'Online retail businesses' }
    ]
  },
  {
    id: 'service',
    name: 'Service',
    businesses: [
      { id: 'consulting', name: 'Consulting', description: 'Business consulting services' },
      { id: 'professional', name: 'Professional Services', description: 'Legal, accounting, etc.' },
      { id: 'personal', name: 'Personal Services', description: 'Hair salon, spa, etc.' }
    ]
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    businesses: [
      { id: 'restaurant', name: 'Restaurant', description: 'Food service establishments' },
      { id: 'cafe', name: 'Café/Bakery', description: 'Coffee shops and bakeries' }
    ]
  },
  {
    id: 'technology',
    name: 'Technology',
    businesses: [
      { id: 'software', name: 'Software Development', description: 'Creating software products' },
      { id: 'it-services', name: 'IT Services', description: 'IT support and services' }
    ]
  },
  {
    id: 'construction',
    name: 'Construction',
    businesses: [
      { id: 'general', name: 'General Contractor', description: 'General building contractors' },
      { id: 'specialized', name: 'Specialized Trade', description: 'Electrical, plumbing, etc.' }
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    businesses: [
      { id: 'medical', name: 'Medical Practice', description: 'Doctor offices and clinics' },
      { id: 'therapy', name: 'Therapy & Wellness', description: 'Physical therapy, wellness centers' }
    ]
  }
];

export const businessSizes: BusinessSize[] = [
  {
    id: 'micro',
    name: 'Micro',
    employeeRange: '1-5 employees',
    revenueRange: 'Up to $500,000'
  },
  {
    id: 'small',
    name: 'Small',
    employeeRange: '6-25 employees',
    revenueRange: '$500,000 - $2 million'
  },
  {
    id: 'medium',
    name: 'Medium',
    employeeRange: '26-100 employees',
    revenueRange: '$2 million - $10 million'
  },
  {
    id: 'large',
    name: 'Large Small Business',
    employeeRange: '101-500 employees',
    revenueRange: '$10 million - $50 million'
  }
];

export const assessmentQuestions: InsuranceQuestion[] = [
  {
    id: 'industry',
    question: 'Which industry does your business operate in?',
    answerType: 'single',
    options: industries.map(industry => industry.name),
    relevanceScore: {
      'gl': 2,
      'pl': 3,
      'property': 2,
      'workers': 1,
      'cyber': 1,
      'commercial-auto': 1,
      'bop': 2,
      'umbrella': 1
    }
  },
  {
    id: 'employees',
    question: 'How many employees does your business have?',
    answerType: 'single',
    options: businessSizes.map(size => size.employeeRange),
    relevanceScore: {
      'gl': 1,
      'pl': 1,
      'property': 1,
      'workers': 5,
      'cyber': 1,
      'commercial-auto': 1,
      'bop': 2,
      'umbrella': 2
    }
  },
  {
    id: 'property',
    question: 'Does your business own or lease commercial property?',
    helpText: 'This includes office space, retail locations, or manufacturing facilities',
    answerType: 'boolean',
    relevanceScore: {
      'gl': 3,
      'pl': 0,
      'property': 5,
      'workers': 0,
      'cyber': 0,
      'commercial-auto': 0,
      'bop': 4,
      'umbrella': 1
    }
  },
  {
    id: 'services',
    question: 'Does your business provide professional advice or services?',
    helpText: 'For example: consulting, design, accounting, legal, or technical services',
    answerType: 'boolean',
    relevanceScore: {
      'gl': 2,
      'pl': 5,
      'property': 0,
      'workers': 0,
      'cyber': 2,
      'commercial-auto': 0,
      'bop': 1,
      'umbrella': 2
    }
  },
  {
    id: 'vehicles',
    question: 'Does your business use vehicles for operations?',
    helpText: 'This includes company-owned vehicles or employee vehicles used for business purposes',
    answerType: 'boolean',
    relevanceScore: {
      'gl': 0,
      'pl': 0,
      'property': 0,
      'workers': 0,
      'cyber': 0,
      'commercial-auto': 5,
      'bop': 0,
      'umbrella': 2
    }
  },
  {
    id: 'data',
    question: 'Does your business store sensitive customer or financial data?',
    answerType: 'boolean',
    relevanceScore: {
      'gl': 0,
      'pl': 1,
      'property': 0,
      'workers': 0,
      'cyber': 5,
      'commercial-auto': 0,
      'bop': 0,
      'umbrella': 1
    }
  },
  {
    id: 'value',
    question: 'What is the approximate value of your business assets?',
    answerType: 'single',
    options: ['Under $50,000', '$50,000 - $250,000', '$250,000 - $1 million', 'Over $1 million'],
    relevanceScore: {
      'gl': 2,
      'pl': 1,
      'property': 4,
      'workers': 0,
      'cyber': 2,
      'commercial-auto': 1,
      'bop': 3,
      'umbrella': 4
    }
  },
  {
    id: 'customers',
    question: 'How much direct interaction do you have with customers or clients at your business location?',
    answerType: 'scale',
    options: ['None', 'Minimal', 'Moderate', 'Significant', 'Constant'],
    relevanceScore: {
      'gl': 5,
      'pl': 2,
      'property': 1,
      'workers': 0,
      'cyber': 0,
      'commercial-auto': 0,
      'bop': 3,
      'umbrella': 2
    }
  }
];
