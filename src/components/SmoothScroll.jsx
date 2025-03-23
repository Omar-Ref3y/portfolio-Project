import { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

const SmoothScroll = ({ children }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      lerp: 0.1,
      smartphone: {
        smooth: true
      },
      tablet: {
        smooth: true
      }
    });

    // Handle hash links for smooth scrolling to sections
    const handleHashClick = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href?.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          scroll.scrollTo(target, {
            offset: -100,
            duration: 1500,
            easing: [0.25, 0.00, 0.35, 1.00]
          });
        }
      }
    };

    // Add click handlers to all hash links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleHashClick);
    });

    // Update scroll on content change
    scroll.update();

    // Cleanup
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleHashClick);
      });
      scroll.destroy();
    };
  }, []);

  return (
    <div 
      ref={scrollRef} 
      data-scroll-container 
      style={{ overflow: 'hidden' }}
    >
      {children}
    </div>
  );
};

export default SmoothScroll;
