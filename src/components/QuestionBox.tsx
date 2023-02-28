import { type Question } from "~/pages/create";

function QuestionBox({ question }: { question: Question }) {
  return (
    <div className=" flex w-full gap-4 rounded-md bg-base-200 p-2">
      <div className=" font-bold">{`#${question.id}`}</div>
      <div className="font-bold">{question.title}</div>
      <div className="font-semibold">{question.mode}</div>
      {question.mode === "multiple" && (
        <div className="">{`${question.options.length} options`}</div>
      )}
    </div>
  );
}

export default QuestionBox;
