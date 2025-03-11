
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'Assessment', href: '#assessment' },
  { label: 'Insurance Types', href: '#insurance-types' },
  { label: 'About', href: '#about' }
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out backdrop-blur-md px-6 md:px-10 py-3",
        {
          "bg-white/80 shadow-sm": scrolled,
          "bg-transparent": !scrolled
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <a href="#" className="text-xl font-semibold text-primary">
            InsureWise
          </a>
        </div>

        {isMobile ? (
          <>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu} 
              className="md:hidden"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>

            {mobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md py-4 px-6 flex flex-col gap-4 transition-all duration-300 ease-in-out animate-fade-in">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-4 hover:bg-secondary rounded-md transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                <Button className="mt-2">Start Assessment</Button>
              </div>
            )}
          </>
        ) : (
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="py-2 px-4 hover:bg-secondary/80 rounded-md transition-all text-foreground/80 hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <Button className="ml-4" size="sm">Start Assessment</Button>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
