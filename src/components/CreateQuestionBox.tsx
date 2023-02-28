"use client";

import { Plus } from "lucide-react";
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

  function handleSubmit() {
    const quesData: Question = {
      id: quesNumber,
      title: quesTitle,
      mode: selectedMode,
      options: options,
    };
    setQuestions([...questions, quesData]);
    setSelectedMode("");
    setQuesTitle("");
    setOptionText("");
    setOptions([]);
  }
  return (
    <div className=" card-bordered card w-full max-w-xl lg:w-2/4">
      <div className=" card-body">
        <div className="card-title">{`Question #${quesNumber}`}</div>
        <form className=" form-control gap-4">
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
            value={""}
            defaultValue={""}
            onChange={(e) => setSelectedMode(e.target.value)}
          >
            <option value="" disabled>
              Question type
            </option>
            <option value="text">Text input</option>
            <option value="multiple">Multiple choice</option>
            <option value="truth/false">True / False</option>
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
                <div key={option.length} className=" flex items-center gap-4">
                  <div className=" badge badge-xs"></div>
                  <div>{option}</div>
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
            <div>Two options, true and false will be given</div>
          )}
        </form>
        <div className=" card-actions mt-2 justify-end">
          <button
            className=" btn-outline btn gap-1 capitalize"
            onClick={handleSubmit}
            type="submit"
            disabled={quesTitle === "" || selectedMode === ""}
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
