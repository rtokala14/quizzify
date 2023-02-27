import Link from "next/link";

function HeroContent() {
  return (
    <div className=" hero min-h-screen">
      <div className=" hero-content flex-col lg:items-start">
        <h2 className=" text-3xl font-bold">
          Are you ready to quiz your way to Glory?
        </h2>
        <div className="text-xl">
          Do you love quizzes? Do you enjoy learning new things and showing off
          your smarts? Do you want to have fun with your friends and family?
        </div>
        <div className="text-xl">
          Quizzy is a quiz app that lets you create and share quizzes on any
          topic you want. You can make quizzes with multiple choice, true/false,
          or short answer questions. You can also spice up your quizzes with
          images, videos, and audio.
        </div>
        <div className="text-lg">
          Quizzy is free to use and works on any device. No downloads or
          sign-ups required.
        </div>
        <Link href={"/create"} className=" btn rounded-md">
          Get Started
        </Link>
      </div>
    </div>
  );
}

export default HeroContent;
