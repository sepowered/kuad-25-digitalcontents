import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollAnimationReturn {
  scrollProgress: number;
  visibleSections: Set<string>;
  horizontalScrollPosition: number;
}

interface UseScrollAnimationProps {
  sections?: string[];
  startSection?: string;
  endSection?: string;
}

export const useScrollAnimation = ({
  sections = ['4', '5', '6'],
  startSection = '4',
  endSection = '6',
}: UseScrollAnimationProps = {}): ScrollAnimationReturn => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(['1']),
  );
  const [horizontalScrollPosition, setHorizontalScrollPosition] = useState(0);

  const viewportWidth = useRef(0);

  // 뷰포트 크기 계산
  useEffect(() => {
    const updateViewportSize = () => {
      viewportWidth.current = window.innerWidth;
    };

    updateViewportSize();
    window.addEventListener('resize', updateViewportSize);
    return () => window.removeEventListener('resize', updateViewportSize);
  }, []);

  // 일반적인 섹션 가시성 확인
  const checkSectionVisibility = useCallback(() => {
    const sections = ['1', '2', '3', '4', '5', '6', '7', '8'];
    const newVisible = new Set<string>();

    sections.forEach(sectionNum => {
      const element = document.querySelector(
        `.section-${sectionNum}`,
      ) as HTMLElement;
      if (element) {
        const rect = element.getBoundingClientRect();
        const isVisible =
          rect.top < window.innerHeight * 0.8 &&
          rect.bottom > window.innerHeight * 0.2;
        if (isVisible) {
          newVisible.add(sectionNum);
        }
      }
    });

    return newVisible;
  }, []);

  // 가로 스크롤 진행도 계산 (섹션 상단이 화면 맨 위에 닿을 때 시작)
  const calculateHorizontalProgress = useCallback((scrollY: number): number => {
    const wrapper = document.querySelector('.horizontal-sections-wrapper');
    if (!wrapper) return 0;

    // 섹션 4의 상단 위치 (wrapper의 시작점)
    const section4Top = wrapper.getBoundingClientRect().top + window.scrollY;

    // 🎯 핵심: 섹션 4의 상단이 화면 맨 위에 닿는 지점
    const horizontalStartPoint = section4Top;

    // wrapper의 총 높이를 이용해 끝점 계산
    const wrapperHeight = wrapper.clientHeight;
    const viewportHeight = window.innerHeight;
    const horizontalEndPoint = section4Top + wrapperHeight - viewportHeight;

    // 진행도 계산
    if (scrollY < horizontalStartPoint) return 0;
    if (scrollY >= horizontalEndPoint) return 1;

    const scrollRange = horizontalEndPoint - horizontalStartPoint;
    if (scrollRange <= 0) return 0;

    return (scrollY - horizontalStartPoint) / scrollRange;
  }, []);

  // 섹션 가시성 업데이트 (더 엄격하게)
  const updateHorizontalSections = useCallback(
    (progress: number) => {
      const newVisible = new Set<string>();

      // 기본 섹션들 (세로 스크롤 구간)
      const regularSections = checkSectionVisibility();
      regularSections.forEach(section => newVisible.add(section));

      // 🎯 가로 스크롤 섹션들 - 매우 엄격한 조건
      if (progress > 0.1) {
        // 10% 이상일 때만 섹션 4
        newVisible.add('4');
      }
      if (progress > 0.5) {
        // 50% 이상일 때만 섹션 5
        newVisible.add('5');
      }
      if (progress > 0.8) {
        // 80% 이상일 때만 섹션 6
        newVisible.add('6');
      }

      setVisibleSections(newVisible);
    },
    [checkSectionVisibility],
  );

  // 전체 스크롤 진행도 계산
  const calculateOverallProgress = useCallback(() => {
    const scrollTop = window.scrollY;
    const documentHeight = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1,
    );
    return Math.min(1, Math.max(0, scrollTop / documentHeight));
  }, []);

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;

    // 전체 진행도
    const overallProgress = calculateOverallProgress();
    setScrollProgress(overallProgress);

    // 가로 스크롤 진행도
    const horizontalProgress = calculateHorizontalProgress(scrollY);

    // 가로 스크롤 위치 (2개 섹션만큼 이동)
    const horizontalPosition =
      -horizontalProgress * (viewportWidth.current * 2);
    setHorizontalScrollPosition(horizontalPosition);

    // 섹션 가시성
    updateHorizontalSections(horizontalProgress);
  }, [
    calculateOverallProgress,
    calculateHorizontalProgress,
    updateHorizontalSections,
  ]);

  // 쓰로틀된 스크롤 핸들러
  const throttledScrollHandler = useCallback(() => {
    let ticking = false;

    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
  }, [handleScroll]);

  // 스크롤 이벤트 등록
  useEffect(() => {
    const throttledHandler = throttledScrollHandler();

    window.addEventListener('scroll', throttledHandler, { passive: true });
    handleScroll(); // 초기 계산

    return () => {
      window.removeEventListener('scroll', throttledHandler);
    };
  }, [throttledScrollHandler, handleScroll]);

  return {
    scrollProgress,
    visibleSections,
    horizontalScrollPosition,
  };
};
