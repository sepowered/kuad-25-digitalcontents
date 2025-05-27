import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollAnimationReturn {
  scrollProgress: number;
  visibleSections: Set<string>;
  horizontalScrollPosition: number;
}

export const useScrollAnimation = (): ScrollAnimationReturn => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['1']));
  const [horizontalScrollPosition, setHorizontalScrollPosition] = useState(0);
  const [isSection4Visible, setIsSection4Visible] = useState(false);
  
  const viewportWidth = useRef(0);
  const viewportHeight = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 뷰포트 크기 계산
  useEffect(() => {
    const updateViewportSize = () => {
      viewportWidth.current = window.innerWidth;
      viewportHeight.current = window.innerHeight;
    };

    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);
    return () => window.removeEventListener('resize', updateViewportSize);
  }, []);

  // Intersection Observer 설정
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.classList.contains('section-4')) {
            setIsSection4Visible(entry.isIntersecting);
          }
        });
      },
      {
        threshold: [0.2, 0.8],
        rootMargin: '-20% 0px'
      }
    );

    const section4 = document.querySelector('.section-4');
    if (section4 && observerRef.current) {
      observerRef.current.observe(section4);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // 일반적인 섹션 가시성 확인
  const checkSectionVisibility = useCallback(() => {
    const sections = ['1', '2', '3', '5', '6', '7', '8']; // section-4 제외
    const newVisible = new Set<string>();
    
    // section-4는 Intersection Observer로 처리
    if (isSection4Visible) {
      newVisible.add('4');
    }
    
    sections.forEach(sectionNum => {
      const element = document.querySelector(`.section-${sectionNum}`);
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
        if (isVisible) {
          newVisible.add(sectionNum);
        }
      }
    });

    return newVisible;
  }, [isSection4Visible]);

  // 가로 스크롤 진행도 계산
  const calculateHorizontalProgress = useCallback((scrollY: number): number => {
    // 시작점과 끝점 설정 (픽셀 단위)
    const START_SCROLL = 2800; // 시작점 조정
    const SCROLL_DURATION = 2000; // 스크롤 구간 길이 조정
    
    // 스크롤 위치에 따른 진행도 계산
    if (scrollY < START_SCROLL) return 0;
    
    const progress = (scrollY - START_SCROLL) / SCROLL_DURATION;
    return Math.min(1, Math.max(0, progress));
  }, []);

  // 가로 스크롤 구간에서의 섹션 가시성 업데이트
  const updateHorizontalSections = useCallback((progress: number) => {
    const newVisible = new Set<string>();
    
    // 기본적으로 보이는 섹션들
    const regularSections = checkSectionVisibility();
    regularSections.forEach(section => {
      if (section !== '4' && section !== '5' && section !== '6') {
        newVisible.add(section);
      }
    });
    
    // 가로 스크롤 섹션들의 가시성
    if (progress >= 0) newVisible.add('4');
    if (progress >= 0.3) newVisible.add('5');
    if (progress >= 0.6) newVisible.add('6');
    
    setVisibleSections(newVisible);
  }, [checkSectionVisibility]);

  // 전체 스크롤 진행도 계산
  const calculateOverallProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const documentHeight = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
    return Math.min(1, Math.max(0, scrollTop / documentHeight));
  }, []);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    
    // 전체 스크롤 진행도 업데이트
    const overallProgress = calculateOverallProgress();
    setScrollProgress(overallProgress);
    
    // 가로 스크롤 진행도 계산
    const horizontalProgress = calculateHorizontalProgress(scrollY);
    
    // 가로 스크롤 위치 계산
    const totalMove = viewportWidth.current * 2;
    const targetPosition = -horizontalProgress * totalMove;
    setHorizontalScrollPosition(targetPosition);
    
    // 섹션 가시성 업데이트
    updateHorizontalSections(horizontalProgress);
  }, [calculateOverallProgress, calculateHorizontalProgress, updateHorizontalSections]);

  // 쓰로틀된 스크롤 핸들러
  useEffect(() => {
    let ticking = false;
    
    const throttledHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandler, { passive: true });
    handleScroll(); // 초기 상태 설정
    
    return () => {
      window.removeEventListener('scroll', throttledHandler);
    };
  }, [handleScroll]);

  return {
    scrollProgress,
    visibleSections,
    horizontalScrollPosition
  };
};
