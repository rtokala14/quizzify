"use client";

import { Check, Plus } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";
import { type Question } from "~/pages/create";

function CreateQuestionBox({
  setQuestions,
  quesNumber,
  questions,
}: {
  questions: Question[];
  quesNumber: number;
  setQuestions: Dispatch<SetStateAction<Question[]>>;
}) {
  const [selectedMode, setSelectedMode] = useState("");
  const [quesTitle, setQuesTitle] = useState("");

  // for multiple options
  const [options, setOptions] = useState<string[]>([]);
  const [optionText, setOptionText] = useState("");
  const [currectAns, setCurrectAns] = useState("");

  function handleSubmit() {
    const quesData: Question = {
      id: crypto.randomUUID(),
      title: quesTitle,
      mode: selectedMode,
      options: options,
      qNum: quesNumber,
      correctAnswer: currectAns,
    };
    setQuestions([...questions, quesData]);
    setSelectedMode("");
    setQuesTitle("");
    setOptionText("");
    setOptions([]);
    setCurrectAns("");
  }
  return (
    <div className=" card-bordered card w-full max-w-xl lg:w-2/4">
      <div className=" card-body">
        <div className="card-title">{`Question #${quesNumber}`}</div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" form-control gap-4"
        >
          <div className=" flex items-center gap-2">
            <label className="label">Title: </label>
            <input
              type="text"
              placeholder="Pinapple on pizza?"
              className="input-bordered input"
              value={quesTitle}
              onChange={(e) => setQuesTitle(e.target.value)}
            />
          </div>
          <select
            className="select-bordered select"
            value={selectedMode}
            // defaultValue={""}
            onChange={(e) => setSelectedMode(e.target.value)}
          >
            <option className="btn-ghost btn pt-2 capitalize" value="" disabled>
              Question type
            </option>
            {/* <option value="text">Text input</option> */}
            <option className="btn-ghost btn pt-2 capitalize" value="multiple">
              Multiple choice
            </option>
            <option
              className="btn-ghost btn pt-2 capitalize"
              value="truth/false"
            >
              True / False
            </option>
          </select>

          {/* Text input  */}
          {selectedMode === "text" && (
            <div>
              A textbox with maximum 50 characters will be given. This item will
              not be scored.
            </div>
          )}

          {/* Multiple choice */}
          {selectedMode === "multiple" && (
            <div className=" mx-2 flex flex-col gap-3">
              {options.map((option) => (
                <div
                  key={option.length}
                  className={` flex items-center justify-between gap-4 rounded-md border border-neutral p-2
                      ${currectAns === option ? "border-success" : ""} `}
                >
                  <div className=" flex items-center justify-start gap-2">
                    <div className=" badge badge-xs"></div>
                    <div>{option}</div>
                  </div>
                  <button
                    onClick={() => setCurrectAns(option)}
                    className={`btn-ghost btn-square btn-xs btn ${
                      currectAns === option ? "btn-disabled" : ""
                    }`}
                  >
                    <Check />
                  </button>
                </div>
              ))}
              {options.length <= 5 ? (
                <div className=" flex items-center gap-4">
                  <div className=" badge badge-xs"></div>
                  <input
                    value={optionText}
                    onChange={(e) => setOptionText(e.target.value)}
                    type="text"
                    placeholder="Nah, Ice cream!!"
                    className="input-bordered input"
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setOptions([...options, optionText]);
                        setOptionText("");
                      }
                    }}
                  />
                  <div
                    className="btn-square btn-sm btn"
                    onClick={() => {
                      setOptions([...options, optionText]);
                      setOptionText("");
                    }}
                  >
                    <Plus />
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          )}

          {/* True / False */}
          {selectedMode === "truth/false" && (
            <div>
              <h4>Select the correct option:</h4>
              <label
                onClick={() => setCurrectAns("true")}
                className="label cursor-pointer justify-start gap-2 rounded-md outline-1 hover:outline"
              >
                <input type="radio" className="radio" name={"torf"} />
                <span className="label-text">True</span>
              </label>
              <label
                onClick={() => setCurrectAns("false")}
                className="label cursor-pointer justify-start gap-2 rounded-md outline-1 hover:outline"
              >
                <input type="radio" className="radio" name={"torf"} />
                <span className="label-text">False</span>
              </label>
            </div>
          )}
        </form>
        {questions.length !== 0 && currectAns === "" && selectedMode !== "" && (
          <div className="mt-2 text-center text-error">
            Select a current answer to save the question
          </div>
        )}

        <div className=" card-actions mt-2 justify-end">
          <button
            className=" btn-outline btn gap-1 capitalize"
            onClick={handleSubmit}
            type="submit"
            disabled={
              quesTitle === "" || selectedMode === "" || currectAns === ""
            }
          >
            <Plus />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateQuestionBox;
