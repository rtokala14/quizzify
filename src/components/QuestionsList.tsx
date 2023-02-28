import { type Question } from "~/pages/create";
import QuestionBox from "./QuestionBox";

function QuestionsList({ questions }: { questions: Question[] }) {
  return (
    <div className="flex w-fit flex-col items-center gap-2">
      {questions.map((question) => (
        <QuestionBox key={question.id} question={question} />
      ))}
    </div>
  );
}

export default QuestionsList;
