import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const {
    name,
    contact,
    experience,
    teachingDuration,
    desiredSong,
    accompaniment,
    ageGroup,
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
      subject: `성인반 상담신청: ${name}`,
      text: `
        성인반 상담 사전 설문 결과:
        
        성함: ${name}
        연락처: ${contact}
        피아노 교습 경험: ${experience}
        교습 경력: ${teachingDuration}
        배우고 싶은 곡: ${desiredSong}
        반주 배우기 희망: ${accompaniment}
        연령대: ${ageGroup}
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
