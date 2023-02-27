import { Question } from "~/pages/create";
import QuestionBox from "./QuestionBox";

function QuestionsList({ questions }: { questions: Question[] }) {
  return (
    <div>
      {questions.map((question) => (
        <QuestionBox question={question} />
      ))}
    </div>
  );
}

export default QuestionsList;
