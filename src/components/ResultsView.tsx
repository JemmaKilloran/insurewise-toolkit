
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AssessmentResult } from '@/types/insurance';
import InsuranceCard from './InsuranceCard';
import { ArrowRight, Download, RefreshCw, Share2 } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

interface ResultsViewProps {
  result: AssessmentResult;
  onRestart: () => void;
}

export function ResultsView({ result, onRestart }: ResultsViewProps) {
  const { recommendedInsurance, businessProfile } = result;
  
  const essentialInsurance = recommendedInsurance.filter(
    insurance => insurance.importance === 'essential'
  );
  
  const recommendedNonEssential = recommendedInsurance.filter(
    insurance => insurance.importance !== 'essential'
  );

  const handleDownload = () => {
    toast({
      title: "Report Generated",
      description: "Your insurance recommendations report has been downloaded.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Share Link Created",
      description: "A link to your results has been copied to your clipboard.",
    });
  };

  return (
    <div className="space-y-8">
      <Card className="border-primary/30 bg-primary/5 animate-scale-in">
        <CardHeader>
          <CardTitle className="text-2xl">Your Insurance Recommendations</CardTitle>
          <CardDescription>
            Based on your business profile, we've identified the following insurance types for your consideration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-white rounded-md p-4 mb-4 border border-border">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Your Business Profile</h3>
            <div className="space-y-2">
              {businessProfile.industry && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-normal bg-secondary">Industry</Badge>
                  <span>{businessProfile.industry}</span>
                </div>
              )}
              {businessProfile.employeeCount && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="font-normal bg-secondary">Size</Badge>
                  <span>{businessProfile.employeeCount}</span>
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-1">
                {businessProfile.hasCommercialProperty && (
                  <Badge variant="secondary">Has Commercial Property</Badge>
                )}
                {businessProfile.offersProfessionalServices && (
                  <Badge variant="secondary">Offers Professional Services</Badge>
                )}
                {businessProfile.usesVehicles && (
                  <Badge variant="secondary">Uses Vehicles</Badge>
                )}
                {businessProfile.hasCyberRisks && (
                  <Badge variant="secondary">Has Cyber Risks</Badge>
                )}
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="essential" className="mt-6">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="essential">
                Essential ({essentialInsurance.length})
              </TabsTrigger>
              <TabsTrigger value="recommended">
                Recommended ({recommendedNonEssential.length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="essential" className="focus-visible:outline-none focus-visible:ring-0">
              {essentialInsurance.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {essentialInsurance.map((insurance, index) => (
                    <InsuranceCard 
                      key={insurance.id} 
                      insurance={insurance} 
                      index={index}
                      isRecommended={true} 
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  No essential insurance types identified for your business.
                </p>
              )}
            </TabsContent>
            
            <TabsContent value="recommended" className="focus-visible:outline-none focus-visible:ring-0">
              {recommendedNonEssential.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {recommendedNonEssential.map((insurance, index) => (
                    <InsuranceCard 
                      key={insurance.id} 
                      insurance={insurance} 
                      index={index} 
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center py-8 text-muted-foreground">
                  No additional recommended insurance types identified for your business.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button variant="outline" onClick={onRestart} className="w-full sm:w-auto flex items-center gap-1">
            <RefreshCw className="h-4 w-4" />
            Restart Assessment
          </Button>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="secondary" onClick={handleDownload} className="flex-1 flex items-center gap-1">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="secondary" onClick={handleShare} className="flex-1 flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <div className="flex justify-center">
        <Button variant="link" className="flex items-center gap-1 text-primary" onClick={() => window.location.href = '#insurance-types'}>
          View All Insurance Types
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default ResultsView;
