import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { serverHost, wordsCollectionName, wordsGetOne } from "../../../consts";
import { fetchApi } from "../../../services/apiService";
import "./getWord.css";

interface GetWordForm {
  wordCode: string;
  lang: string;
}

interface Word {
  _id: string;
  wordCode: string;
  lang: string;
  text: string;
}

type namesOfFormInput = "wordCode" | "lang";

const GetWord = () => {
  const [foundWord, setFoundWord] = useState<Word | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<GetWordForm>();
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
  ];

  useEffect(() => {
    document.title = "Get Word";
  }, []);

  const onFormSub: SubmitHandler<GetWordForm> = async (
    getWordData: GetWordForm
  ) => {
    const word = await fetchApi(
      serverHost +
        wordsCollectionName +
        wordsGetOne +
        "?wordCode=" +
        getWordData.wordCode +
        "&lang=" +
        getWordData.lang,
      "GET"
    );
    console.log(word);
    if (word._id) {
      setFoundWord(word);

      //success toast message
      addToast("Word added succesfully!", {
        appearance: "success",
        autoDismiss: true,
      });
    } else {
      setFoundWord(null);

      //error toast message
      addToast("Word has not found, please try again.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="getWordContainer">
      <h2 className="getWordTitle">Get a word</h2>
      <form onSubmit={handleSubmit(onFormSub)} className="getWordForm">
        {formItems.map((formItem, i) => {
          return (
            <div key={i} className="getWordFormItem">
              <input
                {...register(formItem.code as namesOfFormInput, {
                  required: true,
                  minLength: 2,
                  maxLength: 50,
                })}
                className="getWordFormInput"
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
        <button className="getWordSubmitButton">Get</button>
      </form>
      {foundWord && (
        <div className="foundWordContainer">
          <p>
            <strong>Word Code: </strong>
            {foundWord.wordCode}
          </p>
          <p>
            <strong>Lang: </strong>
            {foundWord.lang}
          </p>
          <p>
            <strong>Text: </strong>
            {foundWord.text}
          </p>
        </div>
      )}
    </div>
  );
};

export default GetWord;
