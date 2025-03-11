
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { assessmentQuestions, insuranceTypes, industries, businessSizes } from '@/data/insuranceData';
import { InsuranceQuestion, AssessmentResult } from '@/types/insurance';
import { useInView } from '@/utils/animations';
import { useToast } from "@/hooks/use-toast";
import ResultsView from './ResultsView';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

export function InsuranceAssessment() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [assessmentComplete, setAssessmentComplete] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const currentQuestion = assessmentQuestions[currentQuestionIndex];

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers({
      ...answers,
      [questionId]: answer
    });
  };

  const handleNext = () => {
    if (answers[currentQuestion.id] === undefined) {
      toast({
        title: "Please answer the question",
        description: "We need your response to provide accurate recommendations.",
        variant: "destructive",
      });
      return;
    }
    
    if (currentQuestionIndex < assessmentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeAssessment();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const completeAssessment = () => {
    // Calculate relevance scores for each insurance type
    const relevanceScores: Record<string, number> = {};
    
    insuranceTypes.forEach(insurance => {
      let score = 0;
      
      for (const [questionId, answer] of Object.entries(answers)) {
        const question = assessmentQuestions.find(q => q.id === questionId);
        if (!question) continue;
        
        const relevanceScore = question.relevanceScore[insurance.id] || 0;
        
        if (typeof answer === 'boolean') {
          if (answer) score += relevanceScore;
        } else if (Array.isArray(answer)) {
          // For multiple choice questions
          score += relevanceScore * (answer.length / (question.options?.length || 1));
        } else if (question.options) {
          // For single choice questions
          const answerIndex = question.options.indexOf(answer);
          if (answerIndex >= 0) {
            score += relevanceScore * ((answerIndex + 1) / question.options.length);
          }
        }
      }
      
      relevanceScores[insurance.id] = score;
    });
    
    // Get recommended insurance types based on scores
    const recommendedInsurance = insuranceTypes
      .filter(insurance => {
        const score = relevanceScores[insurance.id] || 0;
        return insurance.importance === 'essential' || score >= 4;
      })
      .sort((a, b) => (relevanceScores[b.id] || 0) - (relevanceScores[a.id] || 0));
    
    // Create business profile
    const businessProfile = {
      industry: answers['industry'],
      hasCommercialProperty: answers['property'] === true,
      offersProfessionalServices: answers['services'] === true,
      usesVehicles: answers['vehicles'] === true,
      hasCyberRisks: answers['data'] === true,
      employeeCount: answers['employees'],
    };
    
    setResult({
      recommendedInsurance,
      relevanceScores,
      businessProfile,
    });
    
    setAssessmentComplete(true);
  };

  const restartAssessment = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setAssessmentComplete(false);
    setResult(null);
  };

  const renderQuestionContent = (question: InsuranceQuestion) => {
    switch (question.answerType) {
      case 'single':
        return (
          <RadioGroup
            value={answers[question.id] || ''}
            onValueChange={(value) => handleAnswer(question.id, value)}
            className="space-y-3 mt-4"
          >
            {question.options?.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${option}`} />
                <Label htmlFor={`${question.id}-${option}`} className="text-base font-normal">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case 'boolean':
        return (
          <div className="flex gap-4 mt-6">
            <Button
              type="button"
              variant={answers[question.id] === true ? "default" : "outline"}
              onClick={() => handleAnswer(question.id, true)}
              className="flex-1 py-6"
            >
              Yes
            </Button>
            <Button
              type="button"
              variant={answers[question.id] === false ? "default" : "outline"}
              onClick={() => handleAnswer(question.id, false)}
              className="flex-1 py-6"
            >
              No
            </Button>
          </div>
        );
      
      case 'multiple':
        return (
          <div className="space-y-3 mt-4">
            {question.options?.map((option) => (
              <div key={option} className="flex items-start space-x-2">
                <Checkbox
                  id={`${question.id}-${option}`}
                  checked={(answers[question.id] || []).includes(option)}
                  onCheckedChange={(checked) => {
                    const currentAnswers = answers[question.id] || [];
                    if (checked) {
                      handleAnswer(question.id, [...currentAnswers, option]);
                    } else {
                      handleAnswer(
                        question.id,
                        currentAnswers.filter((item: string) => item !== option)
                      );
                    }
                  }}
                />
                <Label htmlFor={`${question.id}-${option}`} className="text-base font-normal">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );
      
      case 'scale':
        return (
          <div className="space-y-4 mt-6">
            <div className="flex justify-between">
              {question.options?.map((option, index) => (
                <div key={index} className="text-center">
                  <Button
                    type="button"
                    variant={answers[question.id] === option ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleAnswer(question.id, option)}
                    className="mb-2 h-10 w-10 rounded-full"
                  >
                    {index + 1}
                  </Button>
                  <p className="text-xs text-muted-foreground">{option}</p>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section 
      id="assessment" 
      className="py-24 px-6"
      ref={ref as React.RefObject<HTMLDivElement>}
    >
      <div className="max-w-3xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-500 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-3xl font-bold mb-4">Insurance Needs Assessment</h2>
          <p className="text-muted-foreground">
            Answer a few questions about your business to receive personalized insurance recommendations.
          </p>
        </div>

        <div className={`transition-all duration-700 delay-100 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {assessmentComplete ? (
            <div className="animate-scale-in">
              <ResultsView result={result!} onRestart={restartAssessment} />
            </div>
          ) : (
            <Card className="shadow-sm border-foreground/10">
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {assessmentQuestions.length}
                  </div>
                  <div className="flex h-2 w-full max-w-24 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="bg-primary transition-all duration-300 ease-out"
                      style={{ width: `${((currentQuestionIndex + 1) / assessmentQuestions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
                {currentQuestion.helpText && (
                  <CardDescription className="text-muted-foreground">
                    {currentQuestion.helpText}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {renderQuestionContent(currentQuestion)}

                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentQuestionIndex === 0}
                    className="flex items-center gap-1"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button onClick={handleNext} className="flex items-center gap-1">
                    {currentQuestionIndex === assessmentQuestions.length - 1 ? (
                      <>
                        Complete
                        <CheckCircle2 className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Next
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

export default InsuranceAssessment;
