
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InsuranceType } from '@/types/insurance';
import { useInView } from '@/utils/animations';
import { Shield, Briefcase, Building, Heart, Lock, Truck, Package, Umbrella } from 'lucide-react';

interface InsuranceCardProps {
  insurance: InsuranceType;
  index: number;
  isRecommended?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  'shield': <Shield className="h-6 w-6" />,
  'briefcase': <Briefcase className="h-6 w-6" />,
  'building': <Building className="h-6 w-6" />,
  'heart': <Heart className="h-6 w-6" />,
  'lock': <Lock className="h-6 w-6" />,
  'truck': <Truck className="h-6 w-6" />,
  'package': <Package className="h-6 w-6" />,
  'umbrella': <Umbrella className="h-6 w-6" />,
};

const importanceColors: Record<string, string> = {
  'essential': 'bg-primary/10 text-primary',
  'recommended': 'bg-amber-500/10 text-amber-600',
  'optional': 'bg-muted text-muted-foreground',
};

export function InsuranceCard({ insurance, index, isRecommended }: InsuranceCardProps) {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-500 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Card className={`h-full overflow-hidden transition-all hover:shadow-md ${isRecommended ? 'border-primary/30 bg-primary/5' : ''}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start mb-2">
            <div className={`p-2 rounded-md ${importanceColors[insurance.importance]} bg-opacity-20`}>
              {iconMap[insurance.icon]}
            </div>
            <Badge variant="outline" className={importanceColors[insurance.importance]}>
              {insurance.importance.charAt(0).toUpperCase() + insurance.importance.slice(1)}
            </Badge>
          </div>
          <CardTitle className="text-xl font-semibold">{insurance.name}</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            {insurance.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium mb-2">Coverage Includes:</h4>
              <ul className="space-y-1">
                {insurance.coverageDetails.map((detail, idx) => (
                  <li key={idx} className="text-sm text-muted-foreground flex items-start">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary/70 mt-1.5 mr-2"></span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {insurance.relevantFor.length > 0 && (
              <div className="pt-2">
                <h4 className="text-sm font-medium mb-2">Especially Important For:</h4>
                <div className="flex flex-wrap gap-1">
                  {insurance.relevantFor.map((business) => (
                    <Badge key={business.id} variant="secondary" className="text-xs">
                      {business.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default InsuranceCard;
