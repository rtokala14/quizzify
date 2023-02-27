import { Question } from "~/pages/create";

function QuestionBox({ question }: { question: Question }) {
  return <div>{`Question number ${question.id}`}</div>;
}

export default QuestionBox;
