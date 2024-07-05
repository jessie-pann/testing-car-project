import React, { useEffect, useState } from "react";

export interface Make {
  make: string;
  count: number;
}
export interface Model {
  model: string;
  count: number;
}

function App() {
  const [makeData, setMakeData] = useState([]);
  const [modelData, setModelData] = useState([]);

  const fetchMakeData = async () => {
    const makes = await fetch("http://localhost:3001/makes");
    const makesJSON = await makes.json();
    setMakeData(makesJSON);
  };

  const fetchModelData = async (make: string) => {
    const models = await fetch(`http://localhost:3001/models/${make}`);
    const modelsJSON = await models.json();
    setModelData(modelsJSON);
  };

  useEffect(() => {
    fetchMakeData();
  }, []);

  return (
    <>
      <header>
        <h1>Find your next car</h1>
        <p>Search new and used cars by make and model.</p>
      </header>
      <section>
        <form>
          <fieldset>
            <legend className="visuallyhidden">Search filters</legend>
            <label>Make</label>
            <select onChange={(e) => fetchModelData(e.target.value)}>
              <option value="">Makes</option>
              {makeData.map((eachMake: Make) => {
                return (
                  <option key={eachMake.make} value={eachMake.make}>
                    {eachMake.make}
                    {eachMake.count}
                  </option>
                );
              })}
            </select>
            <label>Model</label>
            <select>
              <option value="">Models</option>
              {modelData.map((eachModel: Model) => {
                return (
                  <option key={eachModel.model} value={eachModel.model}>
                    {eachModel.model}
                    {eachModel.count}
                  </option>
                );
              })}
            </select>
          </fieldset>
        </form>
      </section>
    </>
  );
}

export default App;
