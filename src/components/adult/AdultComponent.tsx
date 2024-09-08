"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input"; // ShadCN의 Input 컴포넌트
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // ShadCN의 RadioGroup
import { Button } from "@/components/ui/button"; // ShadCN의 Button 컴포넌트
import axios from "axios";
import Spinner from "@/components/ui/spinner";
import useFormStore from "@/store/formStore";

interface AdultComponentProps {
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
}

const AdultComponent = ({ setSelectedTab }: AdultComponentProps) => {
  const initialFormState = {
    name: "",
    contact: "",
    experience: "",
    teachingDuration: "",
    desiredSong: "",
    accompaniment: "",
    ageGroup: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const setAdultFormData = useFormStore((state) => state.setAdultFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData); // formData가 제대로 업데이트 되었는지 확인

    try {
      const response = await axios.post("/api/send-email", formData);
      if (response.status === 200) {
        console.log(response.data, "학생 상담 신청 완료");
        setAdultFormData(formData);
        setTimeout(() => {
          setIsLoading(false);
          setSelectedTab(3); // 성인 결과 화면으로 이동
        }, 1500);
      }
    } catch (error) {
      console.error("학생 상담 신청 실패:", error);
      setIsLoading(false);
      alert("상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };
  // 이전 상태로 돌아가는 함수
  const handlePrevState = () => {
    setFormData(initialFormState); // 폼 데이터를 초기 상태로 리셋
    setSelectedTab(0); // 선택한 탭을 0으로 초기화
  };

  return (
    <>
      <div className="absolute top-4 left-4 z-10 text-black">
        <Button variant="outline" onClick={handlePrevState}>
          이전으로
        </Button>
      </div>

      <div>
        {isLoading && (
          <div className="absolute inset-0 bg-gray-500 bg-opacity-50 z-10 flex justify-center items-center">
            <Spinner size="lg" color="text-blue-600" />
          </div>
        )}
        <form
          className="space-y-6 pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-24 pb-8 sm:pb-12 md:pb-16 lg:pb-20 xl:pb-24"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold">성인반 상담 사전 설문</h1>
          <p>사전 설문을 작성해 주시면 상담에 많은 도움이 됩니다.</p>

          {/* 성함/연락처 */}
          <div className="space-y-4">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="성함을 입력하세요"
            />
            <Input
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="연락처를 입력하세요"
            />
          </div>

          {/* 피아노 교습 경험 */}
          <div>
            <p className="font-bold pb-4">
              1. 피아노 교습을 받아보신 적이 있으신가요?
            </p>
            <RadioGroup
              name="experience"
              value={formData.experience} // value 추가
              onValueChange={(value) =>
                setFormData({ ...formData, experience: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="있다" id="experience1" />
                <label htmlFor="experience1">있다</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="없다" id="experience2" />
                <label htmlFor="experience2">없다</label>
              </div>
            </RadioGroup>
          </div>

          {/* 교습 경력 */}
          <div>
            <p className="font-bold pb-4">2. 교습 경력이 어느 정도 되시나요?</p>
            <RadioGroup
              name="teachingDuration"
              value={formData.teachingDuration} // value 추가
              onValueChange={(value) =>
                setFormData({ ...formData, teachingDuration: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="6개월 미만" id="duration1" />
                <label htmlFor="duration1">6개월 미만</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1년 미만" id="duration2" />
                <label htmlFor="duration2">1년 미만</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2년 미만" id="duration3" />
                <label htmlFor="duration3">2년 미만</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3년 미만" id="duration4" />
                <label htmlFor="duration4">3년 미만</label>
              </div>
            </RadioGroup>
          </div>

          {/* 배우고 싶은 곡 */}
          <div>
            <Input
              name="desiredSong"
              value={formData.desiredSong}
              onChange={handleChange}
              placeholder="배우고 싶은 곡을 입력하세요"
            />
          </div>

          {/* 반주 배우기 */}
          <div>
            <p className="font-bold pb-4">3. 반주를 배우고 싶으신가요?</p>
            <RadioGroup
              name="accompaniment"
              value={formData.accompaniment} // value 추가
              onValueChange={(value) =>
                setFormData({ ...formData, accompaniment: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="네" id="accompaniment1" />
                <label htmlFor="accompaniment1">네</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="아니오" id="accompaniment2" />
                <label htmlFor="accompaniment2">아니오</label>
              </div>
            </RadioGroup>
          </div>

          {/* 연령대 */}
          <div>
            <p className="font-bold pb-4">
              4. 귀하의 연령대는 어떻게 되시나요?
            </p>
            <RadioGroup
              name="ageGroup"
              value={formData.ageGroup} // value 추가
              onValueChange={(value) =>
                setFormData({ ...formData, ageGroup: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="20대" id="ageGroup1" />
                <label htmlFor="ageGroup1">20대</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30대" id="ageGroup2" />
                <label htmlFor="ageGroup2">30대</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="40대" id="ageGroup3" />
                <label htmlFor="ageGroup3">40대</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="50대 이상" id="ageGroup4" />
                <label htmlFor="ageGroup4">50대 이상</label>
              </div>
            </RadioGroup>
          </div>

          <Button type="submit" variant="default">
            제출하기
          </Button>
        </form>
      </div>
    </>
  );
};

export default AdultComponent;
