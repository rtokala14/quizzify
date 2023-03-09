import { useState } from "react";
import CreateQuestionBox from "~/components/CreateQuestionBox";
import QuestionsList from "~/components/QuestionsList";
import QuizTaker from "~/components/QuizTaker";
import { api } from "~/utils/api";

export type Question = {
  id: string;
  title: string;
  mode: string;
  options: string[];
  qNum: number;
  correctAnswer?: string;
};

function Create() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizTitle, setQuizTitle] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const {
    mutate: createMutation,
    data: newQuizData,
    isLoading,
    isSuccess,
  } = api.quiz.saveQuiz.useMutation();

  function handleFinish() {
    const res = createMutation({
      title: quizTitle,
      quizData: questions,
    });
    setQuestions([]);
    setQuizTitle("");
    setIsPreview(false);
    setIsFinished(true);
  }

  return (
    <div className=" mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-3 px-4 pt-16">
      {isFinished ? (
        <div className="card-bordered card max-w-3xl p-3">
          <div className="card-title">
            Congratulations!! Your quiz has been created. Click the link below
            to play it yourself, or copy and share it with your friends and
            family! Happy Quizzing...
          </div>
          <div className="card-body items-center">
            <a
              target={"_blank"}
              rel={"noreferrer"}
              href={`${window.location.origin}/play/${
                newQuizData ? newQuizData.id : ""
              }`}
            >
              {isLoading ? (
                <button className="btn-disabled loading btn"></button>
              ) : (
                <button className="btn-primary btn">Try it out</button>
              )}
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className=" flex w-full items-center justify-between pt-2">
            <h2 className=" text-2xl font-semibold">Create a Quiz</h2>
            <div className=" flex items-center gap-2">
              <button
                className="btn-outline btn"
                onClick={() => setIsPreview((prevState) => !prevState)}
              >
                {isPreview ? "Edit" : "Preview"}
              </button>
              <button onClick={handleFinish} className=" btn-primary btn">
                Finish
              </button>
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
        </>
      )}
    </div>
  );
}

export default Create;
