import { Dispatch, SetStateAction } from "react";
import { Question } from "~/pages/create";

function CreateQuestionBox({
  setQuestions,
  quesNumber,
  questions,
}: {
  questions: Question[];
  quesNumber: number;
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}) {
  function handleSubmit() {
    setQuestions([...questions, { id: quesNumber }]);
  }
  return (
    <button className=" btn" onClick={handleSubmit}>
      Add Question
    </button>
  );
}

export default CreateQuestionBox;
