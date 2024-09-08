import { Button } from "@/components/ui/button";
import useFormStore from "@/store/formStore";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface StudentResultComponentProps {
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>;
}

const StudentResultComponent = ({
  setSelectedTab,
}: StudentResultComponentProps) => {
  const studentFormData = useFormStore((state) => state.formData.student);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const questionAnswerPairs = [
    { question: "성함", answer: studentFormData.name },
    { question: "연락처", answer: studentFormData.contact },
    { question: "학년", answer: studentFormData.grade },
    { question: "피아노 학습 경험", answer: studentFormData.experience },
    { question: "학습 기간", answer: studentFormData.learningDuration },
    { question: "일일 연습 시간", answer: studentFormData.practiceDuration },
    { question: "배우고 싶은 곡", answer: studentFormData.desiredSong },
    { question: "좋아하는 음악 장르", answer: studentFormData.favoriteGenre },
    { question: "반주 배우기 희망", answer: studentFormData.accompaniment },
    { question: "학습 목표", answer: studentFormData.learningGoal },
  ];

  const handleHomeButtonClick = () => {
    setIsDialogOpen(true);
  };

  const handleConfirmHome = () => {
    setIsDialogOpen(false);
    setSelectedTab(0);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">
        학생반 상담 신청 결과
      </h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {questionAnswerPairs.map((pair, index) => (
          <div
            key={index}
            className={`flex ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
          >
            <div className="w-1/2 p-4 border-r border-gray-200 font-medium">
              {pair.question}
            </div>
            <div className="w-1/2 p-4">{pair.answer}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button onClick={handleHomeButtonClick}>홈으로 돌아가기</Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>확인</DialogTitle>
            <DialogDescription>
              정말로 홈으로 돌아가시겠습니까?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button onClick={handleConfirmHome}>네</Button>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              아니오
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentResultComponent;
