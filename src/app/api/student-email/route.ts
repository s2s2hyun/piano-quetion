import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const {
    name,
    contact,
    grade,
    experience,
    learningDuration,
    practiceDuration,
    desiredSong,
    favoriteGenre,
    accompaniment,
    learningGoal,
  } = await req.json();

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      subject: `학생반 상담신청: ${name}`,
      text: `
        학생반 상담 사전 설문 결과:
        
        성함: ${name}
        연락처: ${contact}
        학년: ${grade}
        피아노 학습 경험: ${experience}
        학습 기간: ${learningDuration}
        일일 연습 시간: ${practiceDuration}
        배우고 싶은 곡: ${desiredSong}
        좋아하는 음악 장르: ${favoriteGenre}
        반주 배우기 희망: ${accompaniment}
        학습 목표: ${learningGoal}
      `,
    });

    return NextResponse.json(
      { message: "이메일이 성공적으로 전송되었습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("이메일 전송 실패:", error);
    return NextResponse.json(
      { error: "이메일 전송에 실패했습니다." },
      { status: 500 }
    );
  }
}
