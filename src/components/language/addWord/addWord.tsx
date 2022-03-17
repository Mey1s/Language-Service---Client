import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import {
  serverHost,
  wordsCollectionName,
  wordsCreateOne,
} from "../../../consts";
import { fetchApi } from "../../../services/apiService";
import "./addWord.css";

interface addWordForm {
  wordCode: string;
  lang: string;
  text: string;
}

type namesOfFormInput = "wordCode" | "lang" | "text";

const AddWord = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<addWordForm>();
  const { addToast } = useToasts();

  const formItems = [
    {
      inputType: "text",
      inputPlaceholder: "Word code",
      code: "wordCode",
    },
    {
      inputType: "text",
      inputPlaceholder: "Lang",
      code: "lang",
    },
    {
      inputType: "text",
      inputPlaceholder: "Text",
      code: "text",
    },
  ];

  useEffect(() => {
    document.title = "Add Word";
  }, []);

  const onFormSub: SubmitHandler<addWordForm> = async (
    addWordData: addWordForm
  ) => {
    const word = await fetchApi(
      serverHost + wordsCollectionName + wordsCreateOne,
      "POST",
      addWordData
    );
    if (word._id) {
      //success toast message
      addToast("Word added succesfully!", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      //error toast message
      addToast(
        "If the word is not in English, you must verify there is an English value for it before entering it.",
        {
          appearance: "error",
          autoDismiss: true,
        }
      );
    }
  };

  return (
    <div className="addWordContainer">
      <h2 className="addWordTitle">Add a new word</h2>
      <form onSubmit={handleSubmit(onFormSub)} className="addWordForm">
        {formItems.map((formItem, i) => {
          return (
            <div key={i} className="addWordFormItem">
              <input
                {...register(formItem.code as namesOfFormInput, {
                  required: true,
                  minLength: 2,
                  maxLength: 50,
                })}
                className="addWordFormInput"
                type={formItem.inputType}
                placeholder={formItem.inputPlaceholder}
              />
              {errors[formItem.code as namesOfFormInput] && (
                <p className="addWordErrorMessage">
                  Please enter a valid value between 2 to 50 characters
                </p>
              )}
            </div>
          );
        })}
        <button className="addWordSubmitButton">Add</button>
      </form>
    </div>
  );
};

export default AddWord;
