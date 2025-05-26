import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import {
  ScrollElement,
  ScrollTitle,
  ScrollDescription,
} from './ScrollAnimations';

const BandiApp: React.FC = () => {
  const { scrollProgress, visibleSections, scrollToSection } =
    useScrollAnimation();

  return (
    <div className="font-sans">
      {/* 진행도 바 */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-black z-50 origin-left transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      {/* 네비게이션 */}
      <div className="nav px-8 py-4 fixed top-0 left-0 right-0 z-30 bg-white">
        <div className="flex justify-between items-center">
          <div className="nav__symbol font-bold text-xl">bandi</div>
          <div className="nav__items flex gap-8">
            <div className="nav__item cursor-pointer hover:opacity-70">
              Menu 1
            </div>
            <div className="nav__item cursor-pointer hover:opacity-70">
              Menu 2
            </div>
            <div className="nav__item cursor-pointer hover:opacity-70">
              Menu 3
            </div>
          </div>
        </div>
      </div>

      {/* 섹션 1 */}
      <div className="section-1 min-h-screen pt-20 px-8">
        <ScrollElement
          sectionNumber="1"
          visibleSections={visibleSections}
          delay={0}
        >
          <div className="main max-w-4xl mx-auto text-center py-16">
            <ScrollTitle
              sectionNumber="1"
              visibleSections={visibleSections}
              delay={0}
            >
              글의 힘으로 내가 알던 세상이
              <br />
              보다 넓어질 수 있지 않을까요?
            </ScrollTitle>
            <ScrollDescription
              sectionNumber="1"
              visibleSections={visibleSections}
              delay={200}
            >
              나에게 맞춘 세상에서 가장 간단한 글쓰기, bandi로 시작해보세요.
            </ScrollDescription>
          </div>
        </ScrollElement>
      </div>

      {/* 섹션 2 */}
      <div className="section-2 min-h-screen flex items-center px-8">
        <div className="main max-w-4xl mx-auto text-center">
          <ScrollTitle
            sectionNumber="2"
            visibleSections={visibleSections}
            delay={0}
          >
            n명중 1명은 글을 읽던 중 답답함을 느낀 경험이 있다 해요.
          </ScrollTitle>
          <ScrollDescription
            sectionNumber="2"
            visibleSections={visibleSections}
            delay={200}
          >
            내가 모르는 단어가 나오면 마치 수정 테이프로 지운것 처럼 답답함을
            느끼고
            <br />
            그런 경험에 글을 읽는것에 망설임을 느끼기도 해요.
          </ScrollDescription>
        </div>
      </div>

      {/* 섹션 3 */}
      <div className="section-3 min-h-screen flex items-center px-8">
        <div className="main max-w-4xl mx-auto text-center">
          <ScrollTitle
            sectionNumber="3"
            visibleSections={visibleSections}
            delay={0}
          >
            단언컨대
            <br />
            잘 읽는 가장 좋은 방법은
            <br />잘 쓰는 것이에요.
          </ScrollTitle>
          <ScrollDescription
            sectionNumber="3"
            visibleSections={visibleSections}
            delay={200}
          >
            여러 연구결과에 따르면 그렇다 해요.
          </ScrollDescription>
        </div>
      </div>

      {/* 섹션 4 */}
      <div className="section-4 min-h-screen flex items-center px-8">
        <div className="main max-w-4xl mx-auto text-center">
          <ScrollTitle
            sectionNumber="4"
            visibleSections={visibleSections}
            delay={0}
          >
            지금, 글을 쓴다면 1일째!
          </ScrollTitle>
          <ScrollDescription
            sectionNumber="4"
            visibleSections={visibleSections}
            delay={200}
          >
            습관을 가지는 방법은 어렵지 않아요.
            <br />
            오늘부터 쓰면 이루어질거에요.
          </ScrollDescription>
        </div>
      </div>
    </div>
  );
};

export default BandiApp;
