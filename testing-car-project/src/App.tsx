import React, { useEffect, useState } from "react";

export interface Make {
  make: string;
  count: number;
}
export interface Model {
  model: string;
  count: number;
}

export interface Vehicle {
  derivative: string;
}

function App() {
  const [makeData, setMakeData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [vehiclesSelected, setVehiclesSelected] = useState([]);
  const [makeSelected, setMakeSelected] = useState("");

  const fetchMakeData = async () => {
    try {
      const makes = await fetch("http://localhost:3001/api/makes");
      const makesJSON = await makes.json();
      setMakeData(makesJSON);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(makeData);

  const fetchModelData = async (make: string) => {
    const models = await fetch(`http://localhost:3001/api/models/${make}`);
    const modelsJSON = await models.json();
    setModelData(modelsJSON);
  };

  useEffect(() => {
    fetchMakeData();
  }, []);

  const fetchVehicles = async (make: string, model: string) => {
    const ve = await fetch(
      `http://localhost:3001/api/vehicles/${make}/${model}`
    );
    const veJSON = await ve.json();
    setVehiclesSelected(veJSON);
  };

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
            <select
              onChange={(e) => {
                fetchModelData(e.target.value);
                setMakeSelected(e.target.value);
              }}
            >
              <option value="">Makes</option>
              {makeData.map((eachMake: Make) => {
                return (
                  <option key={eachMake.make} value={eachMake.make}>
                    {eachMake.make} {eachMake.count}
                  </option>
                );
              })}
            </select>
            <label>Model</label>
            <select
              onChange={(e) => fetchVehicles(makeSelected, e.target.value)}
            >
              <option value="">Models</option>
              {modelData.map((eachModel: Model) => {
                return (
                  <option key={eachModel.model} value={eachModel.model}>
                    {eachModel.model} {eachModel.count}
                  </option>
                );
              })}
            </select>
          </fieldset>
        </form>
        <div>
          {vehiclesSelected.map((each: Vehicle) => (
            <p>{each.derivative}</p>
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
