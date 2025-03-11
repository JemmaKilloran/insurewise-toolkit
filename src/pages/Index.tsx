
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InsuranceAssessment from '@/components/InsuranceAssessment';
import InsuranceCard from '@/components/InsuranceCard';
import Footer from '@/components/Footer';
import { insuranceTypes } from '@/data/insuranceData';
import { useInView } from '@/utils/animations';

const Index = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <Hero />
        
        <InsuranceAssessment />
        
        <section 
          id="insurance-types" 
          className="py-24 px-6 bg-secondary/20"
          ref={ref as React.RefObject<HTMLDivElement>}
        >
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-16 transition-all duration-500 transform ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h2 className="text-3xl font-bold mb-4">Common Business Insurance Types</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore different types of insurance that may be relevant for your small business.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insuranceTypes.map((insurance, index) => (
                <InsuranceCard key={insurance.id} insurance={insurance} index={index} />
              ))}
            </div>
          </div>
        </section>
        
        <section id="about" className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About InsureWise</h2>
            <p className="text-lg text-muted-foreground mb-8">
              InsureWise is dedicated to helping small business owners navigate the complex world of business insurance. 
              Our tools simplify the process of identifying the right coverage for your specific needs, 
              helping you protect your business without unnecessary costs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex-1 max-w-sm p-6 border rounded-lg bg-secondary/10">
                <h3 className="text-xl font-medium mb-2">Our Mission</h3>
                <p className="text-muted-foreground">
                  To empower small business owners to make informed insurance decisions through simple, 
                  unbiased guidance and educational resources.
                </p>
              </div>
              <div className="flex-1 max-w-sm p-6 border rounded-lg bg-secondary/10">
                <h3 className="text-xl font-medium mb-2">Our Approach</h3>
                <p className="text-muted-foreground">
                  We believe in providing clear, straightforward information without the jargon, 
                  helping you understand exactly what coverage you need and why.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
