import { type Question } from "~/pages/create";

function QuizTaker({
  quizData,
}: {
  quizData: { title: string; questions: Question[] };
}) {
  return (
    <div className="mb-2 flex w-full flex-col items-center gap-2 rounded-md border p-2">
      <h2 className=" text-3xl font-bold">{quizData.title}</h2>
      {quizData.questions.map((question) => (
        <div className="card-bordered card w-full p-2" key={question.id}>
          <div className=" card-title">{`${question.qNum}) ${question.title}`}</div>
          <div className="card-body">
            {question.mode === "text" ? (
              <textarea
                className="textarea-bordered textarea"
                placeholder="Answer here"
              />
            ) : question.mode === "multiple" ? (
              question.options.map((option) => (
                <label
                  key={option}
                  className="label cursor-pointer justify-start gap-2 rounded-md outline-1 hover:outline"
                >
                  <input type="radio" className="radio" name={question.title} />
                  <span className="label-text">{option}</span>
                </label>
              ))
            ) : question.mode === "truth/false" ? (
              <div>
                <label className="label cursor-pointer justify-start gap-2 rounded-md outline-1 hover:outline">
                  <input type="radio" className="radio" name={question.title} />
                  <span className="label-text">Truth</span>
                </label>
                <label className="label cursor-pointer justify-start gap-2 rounded-md outline-1 hover:outline">
                  <input type="radio" className="radio" name={question.title} />
                  <span className="label-text">False</span>
                </label>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
      <div className="flex w-full items-center justify-end">
        <button className="btn-primary btn">Submit</button>
      </div>
    </div>
  );
}

export default QuizTaker;
