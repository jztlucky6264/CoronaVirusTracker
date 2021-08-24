import React, { useEffect, useState, memo } from "react";

const Coronatracker = () => {
  const [data, setData] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBtn, setSearchBtn] = useState("");
  const searchState = (e) => {
    setSearchTerm(e.target.value);
  };

  const clickbutton = () => {
    setSearchBtn(() => {
      return searchTerm;
    });
    setSearchTerm("");
  };

  const getCovidData = async () => {
    try {
      const res = await fetch("https://data.covid19india.org/data.json");
      const actualData = await res.json();
      console.log(actualData.statewise);
      setData(actualData.statewise);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCovidData();
  }, []);

  if (!data) {
    return (
      <div className=" input_div d-flex align-items-center justify-content-center mt-4">
        <input
          type="text"
          value={searchTerm}
          placeholder="search state"
          onChange={searchState}
        />
        <button className="btn" onClick={clickbutton}>
          Search
        </button>
      </div>
    );
  }
  return (
    <>
      <div className=" input_div d-flex align-items-center justify-content-center mt-4">
        <input
          type="text"
          value={searchTerm}
          placeholder="search state"
          onChange={searchState}
        />
        <button className="btn" onClick={clickbutton}>
          Search
        </button>
      </div>
      <div className="container-fluid ">
        {data
          .filter((val) => {
            if (searchBtn === "") {
              return val[0];
            } else if (
              val.state
                .toLocaleLowerCase()
                .includes(searchBtn.toLocaleLowerCase())
            ) {
              return val;
            }
          })
          .map((states, indx) => {
            return (
              <>
                <div key={indx} className="row">
                  <div className="col-sm-8 col-md-3  ">
                    <h2>Last Update</h2>
                    <h1 className="text-center">{states.lastupdatedtime}</h1>
                  </div>
                  <div className="col-sm-8 col-md-3">
                    <h2>State </h2>
                    <h1>{states.state}</h1>
                  </div>
                  <div className="col-sm-8 col-md-3">
                    <h2>Active Cases</h2>
                    <h1>{states.active}</h1>
                  </div>
                  <div className="col-sm-8 col-md-3">
                    <h2>Confirmed Cases</h2>
                    <h1>{states.confirmed}</h1>
                  </div>
                  <div className="col-sm-8 col-md-3">
                    <h2>Recover Cases</h2>
                    <h1>{states.recovered}</h1>
                  </div>
                  <div className="col-sm-8  col-md-3  ">
                    <h2>Death</h2>
                    <h1>{states.deaths}</h1>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default memo(Coronatracker);
