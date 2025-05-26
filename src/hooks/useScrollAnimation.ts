import { useState, useEffect } from 'react';

export const useScrollAnimation = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState(new Set<string>());

  useEffect(() => {
    const handleScroll = () => {
      const progress =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setScrollProgress(progress);

      const sections = document.querySelectorAll('[class*="section-"]');
      const visible = new Set<string>();

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight * 0.7 &&
          rect.bottom > window.innerHeight * 0.3;

        if (isVisible) {
          const sectionClass = Array.from(section.classList).find(cls =>
            cls.startsWith('section-'),
          );
          if (sectionClass) {
            const sectionNumber = sectionClass.split('-')[1];
            visible.add(sectionNumber);
          }
        }
      });

      setVisibleSections(visible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionNumber: string) => {
    const section = document.querySelector(`.section-${sectionNumber}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return { scrollProgress, visibleSections, scrollToSection };
};
