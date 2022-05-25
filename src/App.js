import React from "react";
import Coronatracker from "./Coronatracker";
import Covid from "./Covid";

const App = () => {
  const date = new Date().getFullYear();
  return (
    <>
      <Covid />
      <Coronatracker />
      <div className="footer">
        <h3> © CopyRight to This site {date} </h3>
      </div>
    </>
  );
};

export default App;
