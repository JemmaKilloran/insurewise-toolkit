
import { useEffect, useState, useRef } from 'react';

export function useInView(options = { threshold: 0.1, triggerOnce: true }) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.triggerOnce) {
          observer.unobserve(currentRef);
        }
      } else if (!options.triggerOnce) {
        setIsInView(false);
      }
    }, {
      threshold: options.threshold,
      rootMargin: '0px'
    });

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.threshold, options.triggerOnce]);

  return { ref, isInView };
}

export function useDelayedRender(delay: number, isVisible: boolean = true) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (isVisible && !shouldRender) {
      timeoutId = setTimeout(() => setShouldRender(true), delay);
    } else if (!isVisible && shouldRender) {
      setShouldRender(false);
    }

    return () => clearTimeout(timeoutId);
  }, [delay, isVisible, shouldRender]);

  return shouldRender;
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;
      const scrollableHeight = fullHeight - windowHeight;
      
      if (scrollableHeight > 0) {
        setProgress(scrollPosition / scrollableHeight);
      }
    };

    window.addEventListener('scroll', updateProgress);
    
    // Call once to initialize
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return progress;
}
