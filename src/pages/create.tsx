import { useState } from "react";
import CreateQuestionBox from "~/components/CreateQuestionBox";
import QuestionsList from "~/components/QuestionsList";
import QuizTaker from "~/components/QuizTaker";

export type Question = {
  id: string;
  title: string;
  mode: string;
  options: string[];
  qNum: number;
};

function Create() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  return (
    <div className=" mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-3 px-4 pt-16">
      <div className=" flex w-full items-center justify-between pt-2">
        <h2 className=" text-2xl font-semibold">Create a Quiz</h2>
        <div className=" flex items-center gap-2">
          <button
            className="btn-outline btn"
            onClick={() => setIsPreview((prevState) => !prevState)}
          >
            {isPreview ? "Edit" : "Preview"}
          </button>
          <button className=" btn-primary btn">Finish</button>
        </div>
      </div>
      {!isPreview ? (
        <>
          <div className="flex items-center gap-2">
            <label className="label">Quiz Name:</label>
            <input
              className="input-bordered input"
              type="text"
              placeholder="The right way to pizza..."
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
            />
          </div>
          <CreateQuestionBox
            quesNumber={questions.length + 1}
            setQuestions={setQuestions}
            questions={questions}
          />
          <div className=" divider"></div>
          <QuestionsList questions={questions} />
        </>
      ) : (
        <QuizTaker quizData={{ title: quizTitle, questions: questions }} />
      )}
    </div>
  );
}

export default Create;
