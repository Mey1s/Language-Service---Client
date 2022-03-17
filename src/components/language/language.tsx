import React, { useEffect, useState } from "react";
import AddWord from "./addWord/addWord";
import GetWord from "./getWord/getWord";
import "./language.css";

const Language = () => {
  const [showComponent, setShowComponent] = useState("none");

  useEffect(() => {
    document.title = "Language";
  }, []);

  const changeComponent = (componentName: string) => {
    setShowComponent((prev) =>
      prev !== componentName ? componentName : "none"
    );
  };

  return (
    <main className="languageContainer">
      <h1>What would you like to do?</h1>
      <button
        type="button"
        className="languageButton"
        onClick={() => changeComponent("add")}
      >
        Add a word
      </button>
      <button
        type="button"
        className="languageButton"
        onClick={() => changeComponent("get")}
      >
        Get a word
      </button>
      {showComponent === "add" && <AddWord />}
      {showComponent === "get" && <GetWord />}
    </main>
  );
};

export default Language;
