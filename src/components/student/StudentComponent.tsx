import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import axios from "axios";
import useFormStore from "@/store/formStore";

interface StudentComponentProps {
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
}

const StudentComponent = ({ setSelectedTab }: StudentComponentProps) => {
  const initialFormState = {
    name: "",
    contact: "",
    grade: "",
    experience: "",
    learningDuration: "",
    practiceDuration: "",
    desiredSong: "",
    favoriteGenre: "",
    accompaniment: "",
    learningGoal: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);

  const setStudentFormData = useFormStore((state) => state.setStudentFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post("/api/student-email", formData);
      if (response.status === 200) {
        console.log(response.data, "학생 상담 신청 완료");
        setStudentFormData(formData);
        setTimeout(() => {
          setIsLoading(false);
          setSelectedTab(4); // 학생 결과 화면으로 이동
        }, 2000);
      }
    } catch (error) {
      console.error("학생 상담 신청 실패:", error);
      setIsLoading(false);
      alert("상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const handlePrevState = () => {
    setSelectedTab(0);
    setFormData(initialFormState);
  };

  return (
    <>
      <div className="absolute top-4 left-4 z-10 text-black">
        <Button variant="outline" onClick={handlePrevState}>
          이전으로
        </Button>
      </div>
      {/*  */}
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
          <h2 className="text-2xl font-bold">학생 상담 사전설문</h2>
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

          {/* 학년 */}
          <div>
            <p className="font-bold pb-4">1. 현재 학년은 어떻게 되시나요?</p>
            <RadioGroup
              name="grade"
              value={formData.grade}
              onValueChange={(value) =>
                setFormData({ ...formData, grade: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="초등학생" id="grade1" />
                <label htmlFor="grade1">초등학생</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="중학생" id="grade2" />
                <label htmlFor="grade2">중학생</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="고등학생" id="grade3" />
                <label htmlFor="grade3">고등학생</label>
              </div>
            </RadioGroup>
          </div>

          {/* 피아노 교습 경험 */}
          <div>
            <p className="font-bold pb-4">2. 피아노를 배워본 적이 있나요?</p>
            <RadioGroup
              name="experience"
              value={formData.experience}
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

          {/* 학습 기간 */}
          <div>
            <p className="font-bold pb-4">3. 피아노를 얼마나 배웠나요?</p>
            <RadioGroup
              name="learningDuration"
              value={formData.learningDuration}
              onValueChange={(value) =>
                setFormData({ ...formData, learningDuration: value })
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
                <RadioGroupItem value="2년 이상" id="duration4" />
                <label htmlFor="duration4">2년 이상</label>
              </div>
            </RadioGroup>
          </div>

          {/* 연습 시간 */}
          <div>
            <p className="font-bold pb-4">4. 하루에 얼마나 연습하나요?</p>
            <RadioGroup
              name="practiceDuration"
              value={formData.practiceDuration}
              onValueChange={(value) =>
                setFormData({ ...formData, practiceDuration: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30분 미만" id="practice1" />
                <label htmlFor="practice1">30분 미만</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30분~1시간" id="practice2" />
                <label htmlFor="practice2">30분~1시간</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1~2시간" id="practice3" />
                <label htmlFor="practice3">1~2시간</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2시간 이상" id="practice4" />
                <label htmlFor="practice4">2시간 이상</label>
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

          {/* 좋아하는 음악 장르 */}
          <div>
            <p className="font-bold pb-4">5. 어떤 장르의 음악을 좋아하나요?</p>
            <RadioGroup
              name="favoriteGenre"
              value={formData.favoriteGenre}
              onValueChange={(value) =>
                setFormData({ ...formData, favoriteGenre: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="클래식" id="genre1" />
                <label htmlFor="genre1">클래식</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="재즈" id="genre2" />
                <label htmlFor="genre2">재즈</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="팝" id="genre3" />
                <label htmlFor="genre3">팝</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="기타" id="genre4" />
                <label htmlFor="genre4">기타</label>
              </div>
            </RadioGroup>
          </div>

          {/* 반주 배우기 */}
          <div>
            <p className="font-bold pb-4">6. 반주를 배우고 싶으신가요?</p>
            <RadioGroup
              name="accompaniment"
              value={formData.accompaniment}
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

          {/* 학습 목표 */}
          <div>
            <p className="font-bold pb-4">
              7. 피아노를 배우는 목표나 이유가 무엇인가요?
            </p>
            <Input
              name="learningGoal"
              value={formData.learningGoal}
              onChange={handleChange}
              placeholder="예: 취미로 즐기기 위해, 실력 향상을 위해, 음대 진학을 위해 등"
            />
          </div>

          {/* 제출 버튼 */}
          <Button type="submit" variant="default">
            제출하기
          </Button>
        </form>
      </div>
    </>
  );
};

export default StudentComponent;
