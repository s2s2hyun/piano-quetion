// src/store/formStore.ts
import { create } from "zustand";

interface AdultFormData {
  name: string;
  contact: string;
  experience: string;
  teachingDuration: string;
  desiredSong: string;
  accompaniment: string;
  ageGroup: string;
}

interface StudentFormData {
  name: string;
  contact: string;
  grade: string;
  experience: string;
  learningDuration: string;
  practiceDuration: string;
  desiredSong: string;
  favoriteGenre: string;
  accompaniment: string;
  learningGoal: string;
}

interface FormData {
  adult: AdultFormData;
  student: StudentFormData;
}

interface FormStore {
  formData: FormData;
  setAdultFormData: (data: AdultFormData) => void;
  setStudentFormData: (data: StudentFormData) => void;
}

const useFormStore = create<FormStore>((set) => ({
  formData: {
    adult: {
      name: "",
      contact: "",
      experience: "",
      teachingDuration: "",
      desiredSong: "",
      accompaniment: "",
      ageGroup: "",
    },
    student: {
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
    },
  },
  setAdultFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, adult: data },
    })),
  setStudentFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, student: data },
    })),
}));

export default useFormStore;
