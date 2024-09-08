"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"; // ShadCN의 Button 컴포넌트
import AdultComponent from "@/components/adult/AdultComponent";
import StudentComponent from "@/components/student/StudentComponent";
import Image from "next/image";
import PianoImage from "@/images/bg.jpg";
import AdultResultComponent from "@/components/result/AdultResultComponent";
import StudentResultComponent from "@/components/result/StudentResultComponent";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState(0);

  // Framer Motion 애니메이션 설정
  const variants = {
    enter: { opacity: 0, x: 100 }, // 우측에서 시작
    center: { opacity: 1, x: 0 }, // 가운데로 이동
    exit: { opacity: 0, x: -100 }, // 좌측으로 퇴장
  };

  return (
    <div className="relative min-h-screen bg-white overflow-x-hidden flex justify-center items-center">
      {/* selectedTab === 0일 때 두 개의 버튼만 중앙에 표시 */}
      {selectedTab === 0 && (
        <div className="flex flex-col justify-center items-center gap-4">
          <Image
            src={PianoImage}
            alt="piano-image"
            className="w-full h-auto max-h-[50vh] object-cover"
            layout="responsive"
            width={1200}
            height={800}
          />
          <div className="flex gap-4">
            <Button
              variant="default"
              onClick={() => setSelectedTab(1)} // 성인상담으로 이동
              className="text-base sm:text-lg md:text-xl py-3 sm:py-4 md:py-6 px-4 sm:px-6 md:px-8 w-full sm:w-40 md:w-48 h-16 sm:h-20 md:h-24"
            >
              성인상담
            </Button>
            <Button
              variant="default"
              onClick={() => setSelectedTab(2)} // 학생상담으로 이동
              className="text-base sm:text-lg md:text-xl py-3 sm:py-4 md:py-6 px-4 sm:px-6 md:px-8 w-full sm:w-40 md:w-48 h-16 sm:h-20 md:h-24"
            >
              학생상담
            </Button>
          </div>
        </div>
      )}

      {/* selectedTab === 1 또는 2일 때 콘텐츠 및 '이전으로' 버튼 표시 */}
      {selectedTab !== 0 && (
        <>
          {/* 상단의 '이전으로' 버튼 */}

          {/* 상담 내용 렌더링 */}
          <motion.div
            key={selectedTab}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }} // 애니메이션 지속 시간
            className="w-full h-full flex flex-col justify-center items-center p-8 bg-white rounded-lg shadow-lg text-black"
          >
            {selectedTab === 1 && (
              <>
                {/* <h2 className="text-3xl font-bold mb-4">성인상담 내용</h2>
                <p className="text-lg">
                  성인 상담에 대한 자세한 내용을 여기에 표시합니다.
                </p> */}

                <AdultComponent setSelectedTab={setSelectedTab} />
              </>
            )}
            {selectedTab === 2 && (
              <>
                {/* <h2 className="text-3xl font-bold mb-4">학생상담 내용</h2>
                <p className="text-lg">
                  학생 상담에 대한 자세한 내용을 여기에 표시합니다.
                </p> */}

                <StudentComponent setSelectedTab={setSelectedTab} />
              </>
            )}

            {selectedTab === 3 && (
              <AdultResultComponent setSelectedTab={setSelectedTab} />
            )}
            {selectedTab === 4 && (
              <StudentResultComponent setSelectedTab={setSelectedTab} />
            )}
          </motion.div>
        </>
      )}
    </div>
  );
}
