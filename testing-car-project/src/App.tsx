import React from "react";

function App() {
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
            <select>
              <option value="">Makes</option>
            </select>
          </fieldset>
        </form>
      </section>
    </>
  );
}

export default App;
