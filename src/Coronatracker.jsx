import React, { useEffect, useState, memo } from "react";
import { RiVirusFill } from "react-icons/ri";
const Coronatracker = () => {
  const [data, setData] = useState("");
  const [Search, setSearch] = useState("");
  const [find, setFind] = useState("");
  const Search_state = (e) => {
    setSearch(e.target.value);
  };

  const Searchblank = () => {
    setFind(() => {
      return Search;
    });
    setSearch("");
  };

  const getCovidData = async () => {
    try {
      const res = await fetch("https://data.covid19india.org/data.json");
      const actualData = await res.json();
      //console.log(actualData.statewise[1]);
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
          value={Search}
          placeholder="search state"
          onChange={Search_state}
        />
        <button className="btn" onClick={Searchblank}>
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
          value={Search}
          placeholder="search state"
          onChange={Search_state}
        />
        <button className="btn" onClick={Searchblank}>
          Search
        </button>
      </div>
      <div className="container-fluid ">
        <div className="row">
          {data
            .filter((val) => {
              if (
                val.state.toLocaleLowerCase().includes(find.toLocaleLowerCase())
              ) {
                return val;
              } else if (setFind === "") {
                return data([0]);
              }
            })
            .map((states) => {
              return (
                <>
                  <div className="col-sm-8 col-md-3  ">
                    <h2>Country</h2>
                    <h1>INDIA</h1>
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
                </>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default memo(Coronatracker);
