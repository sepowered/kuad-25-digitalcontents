import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import {
  ScrollElement,
  ScrollTitle,
  ScrollDescription,
} from './ScrollAnimations';
import BandiLogo from './BandiLogo';

const BandiApp: React.FC = () => {
  const { scrollProgress, visibleSections, horizontalScrollPosition } = useScrollAnimation();

  // 디버깅용 - 현재 상태 확인
  console.log('BandiApp 렌더링:', {
    scrollProgress,
    visibleSections: Array.from(visibleSections),
    horizontalScrollPosition
  });

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
          <div className="nav__symbol">
            <BandiLogo />
          </div>
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
        <div className="main w-full max-w-[100%] mx-auto text-center">
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
          <div className="postcards grid grid-cols-3 gap-4 mt-12">
            <ScrollElement
              sectionNumber="3"
              visibleSections={visibleSections}
              delay={0}
              className="w-full"
            >
              <div className="postcard p-8 bg-gray-50 rounded-lg shadow-sm w-full">
                논점에 불리십시오 후다 전복시킨다 왕성하라 이 우리다 보다. 가공은
                방한한다 또, 찻잔께서 4명 수 과거는 방문한 말한 쓰이어. 가는 자주
                부침이 젊어 확신한다. 비중에 만약으로, 한 얘기하지만 시킨다. 그
                그럴 같다 지적되어요 쪽 같다. 있도록 여자는 방위는 문예의 어른을,
                이 모른 있은가. 말에서 무엇이 점은 요구를 하는 돌아감, 바람
                방치하도록 안정시킵니다. 아니다 이 개체의 보다 정돈성이 정말,
                눈치와 종살이의 그러나 맡기어 집어넣으네.
              </div>
            </ScrollElement>
            <ScrollElement
              sectionNumber="3"
              visibleSections={visibleSections}
              delay={200}
              className="w-full"
            >
              <div className="postcard p-8 bg-gray-50 rounded-lg shadow-sm w-full">
                논점에 불리십시오 후다 전복시킨다 왕성하라 이 우리다 보다. 가공은
                방한한다 또, 찻잔께서 4명 수 과거는 방문한 말한 쓰이어. 가는 자주
                부침이 젊어 확신한다. 비중에 만약으로, 한 얘기하지만 시킨다. 그
                그럴 같다 지적되어요 쪽 같다. 있도록 여자는 방위는 문예의 어른을,
                이 모른 있은가. 말에서 무엇이 점은 요구를 하는 돌아감, 바람
                방치하도록 안정시킵니다. 아니다 이 개체의 보다 정돈성이 정말,
                눈치와 종살이의 그러나 맡기어 집어넣으네.
              </div>
            </ScrollElement>
            <ScrollElement
              sectionNumber="3"
              visibleSections={visibleSections}
              delay={400}
              className="w-full"
            >
              <div className="postcard p-8 bg-gray-50 rounded-lg shadow-sm w-full">
                논점에 불리십시오 후다 전복시킨다 왕성하라 이 우리다 보다. 가공은
                방한한다 또, 찻잔께서 4명 수 과거는 방문한 말한 쓰이어. 가는 자주
                부침이 젊어 확신한다. 비중에 만약으로, 한 얘기하지만 시킨다. 그
                그럴 같다 지적되어요 쪽 같다. 있도록 여자는 방위는 문예의 어른을,
                이 모른 있은가. 말에서 무엇이 점은 요구를 하는 돌아감, 바람
                방치하도록 안정시킵니다. 아니다 이 개체의 보다 정돈성이 정말,
                눈치와 종살이의 그러나 맡기어 집어넣으네.
              </div>
            </ScrollElement>
          </div>
        </div>
      </div>

      {/* 가로 스크롤 섹션 4-6 */}
      <div className="horizontal-sections-wrapper relative h-[400vh]">
        <div 
          className="horizontal-scroll-container sticky top-0 flex h-screen overflow-hidden"
          style={{ 
            transform: `translateX(${horizontalScrollPosition}px)`,
            // 🔍 디버깅용 배경색
            background: 'rgba(255,0,0,0.1)'
          }}
        >
          {/* 섹션 4 */}
          <div className="section-4 min-h-screen min-w-full flex-shrink-0 flex items-center px-8 bg-blue-200">
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

          {/* 섹션 5 */}
          <div className="section-5 min-h-screen min-w-full flex-shrink-0 flex items-center px-8 bg-green-200">
            <div className="main max-w-4xl mx-auto text-center">
              <ScrollTitle
                sectionNumber="5"
                visibleSections={visibleSections}
                delay={0}
              >
                글쓰기는 생각의 정리예요
              </ScrollTitle>
              <ScrollDescription
                sectionNumber="5"
                visibleSections={visibleSections}
                delay={200}
              >
                복잡한 생각들을 글로 정리하면
                <br />
                더 명확하게 이해할 수 있게 됩니다.
              </ScrollDescription>
            </div>
          </div>

          {/* 섹션 6 */}
          <div className="section-6 min-h-screen min-w-full flex-shrink-0 flex items-center px-8 bg-yellow-200">
            <div className="main max-w-4xl mx-auto text-center">
              <ScrollTitle
                sectionNumber="6"
                visibleSections={visibleSections}
                delay={0}
              >
                함께 시작해보아요
              </ScrollTitle>
              <ScrollDescription
                sectionNumber="6"
                visibleSections={visibleSections}
                delay={200}
              >
                bandi와 함께 글쓰기 여정을 
                <br />
                지금 바로 시작해보세요.
              </ScrollDescription>
            </div>
          </div>
        </div>
      </div>

      {/* 섹션 7 (다시 세로 스크롤) */}
      <div className="section-7 min-h-screen flex items-center px-8">
        <div className="main max-w-4xl mx-auto text-center">
          <ScrollTitle
            sectionNumber="7"
            visibleSections={visibleSections}
            delay={0}
          >
            당신의 이야기를 들려주세요
          </ScrollTitle>
          <ScrollDescription
            sectionNumber="7"
            visibleSections={visibleSections}
            delay={200}
          >
            모든 사람에게는 들려줄 가치가 있는 이야기가 있어요.
            <br />
            bandi와 함께 그 이야기를 써내려가 보세요.
          </ScrollDescription>
        </div>
      </div>

      {/* 추가 섹션 8 (Call to Action) */}
      <div className="section-8 min-h-screen flex items-center px-8 bg-gray-50">
        <div className="main max-w-4xl mx-auto text-center">
          <ScrollTitle
            sectionNumber="8"
            visibleSections={visibleSections}
            delay={0}
          >
            지금 시작하세요
          </ScrollTitle>
          <ScrollDescription
            sectionNumber="8"
            visibleSections={visibleSections}
            delay={200}
          >
            글쓰기 여정의 첫 걸음을 내딛어보세요.
          </ScrollDescription>
          <ScrollElement
            sectionNumber="8"
            visibleSections={visibleSections}
            delay={400}
          >
            <div className="mt-8 space-y-4">
              <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors">
                지금 시작하기
              </button>
              <p className="text-sm text-gray-600">
                무료로 시작해보세요. 언제든 취소할 수 있어요.
              </p>
            </div>
          </ScrollElement>
        </div>
      </div>
    </div>
  );
};

export default BandiApp;