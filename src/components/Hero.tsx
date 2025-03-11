
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useInView } from '@/utils/animations';

export function Hero() {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const scrollToAssessment = () => {
    const assessmentSection = document.getElementById('assessment');
    if (assessmentSection) {
      assessmentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden bg-gradient-to-b from-secondary/20 to-background"
      id="hero"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
      </div>
      
      <div 
        ref={ref as React.RefObject<HTMLDivElement>}
        className="max-w-5xl mx-auto text-center z-10"
      >
        <div className={`transition-all duration-700 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block px-3 py-1 mb-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
            Small Business Insurance Toolkit
          </div>
        </div>
        
        <h1 
          className={`text-4xl md:text-6xl font-bold tracking-tight mb-6 transition-all duration-700 delay-100 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          Identify the <span className="text-primary">right insurance</span> for your business
        </h1>
        
        <p 
          className={`text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 transition-all duration-700 delay-200 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          Protect your small business with confidence. Our assessment tool helps identify precisely which insurance types your business needs based on your specific risks and industry.
        </p>
        
        <div 
          className={`space-x-4 transition-all duration-700 delay-300 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <Button 
            size="lg" 
            onClick={scrollToAssessment}
            className="rounded-full px-8 transition-all hover:shadow-md"
          >
            Start Free Assessment
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full px-8 border-foreground/20 hover:border-foreground/50 transition-all hover:shadow-sm"
          >
            Learn More
          </Button>
        </div>
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce rounded-full w-12 h-12"
        onClick={scrollToAssessment}
      >
        <ArrowDown className="h-6 w-6" />
      </Button>
    </section>
  );
}

export default Hero;
