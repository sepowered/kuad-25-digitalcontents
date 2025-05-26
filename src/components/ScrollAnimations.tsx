import React, { ReactNode, CSSProperties } from 'react';

interface ScrollElementProps {
  children: ReactNode;
  sectionNumber: string;
  visibleSections: Set<string>;
  delay?: number;
  className?: string;
}

export const ScrollElement: React.FC<ScrollElementProps> = ({
  children,
  sectionNumber,
  visibleSections,
  delay = 0,
  className = '',
}) => {
  const isVisible = visibleSections.has(sectionNumber);

  const style: CSSProperties = {
    transitionDelay: isVisible ? `${delay}ms` : '0ms',
  };

  return (
    <div
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

interface ScrollTitleProps {
  children: ReactNode;
  sectionNumber: string;
  visibleSections: Set<string>;
  delay?: number;
}

export const ScrollTitle: React.FC<ScrollTitleProps> = ({
  children,
  sectionNumber,
  visibleSections,
  delay = 0,
}) => {
  const isVisible = visibleSections.has(sectionNumber);

  const style: CSSProperties = {
    transitionDelay: isVisible ? `${delay}ms` : '0ms',
  };

  return (
    <p
      className={`main__title transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={style}
    >
      {children}
    </p>
  );
};

interface ScrollDescriptionProps {
  children: ReactNode;
  sectionNumber: string;
  visibleSections: Set<string>;
  delay?: number;
}

export const ScrollDescription: React.FC<ScrollDescriptionProps> = ({
  children,
  sectionNumber,
  visibleSections,
  delay = 200,
}) => {
  const isVisible = visibleSections.has(sectionNumber);

  const style: CSSProperties = {
    transitionDelay: isVisible ? `${delay}ms` : '0ms',
  };

  return (
    <div
      className={`main__description transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={style}
    >
      {children}
    </div>
  );
};
