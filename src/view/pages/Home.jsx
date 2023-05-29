import React, { useState } from "react";
import AreaCardSection from "../components/AreaCardSection";

const Home = () => {
  const [searchSuggestions, setSearchSuggestions] = useState("none");

  const showSearchSuggestions = () => {
    if (searchSuggestions === "none") setSearchSuggestions("block");
    else setSearchSuggestions("none");
  };

  return (
    <div>
      <div
        className="d-flex flex-column justify-content-center align-items-center my-5"
        style={{ paddingBottom: "9rem" }}
      >
        <h3 className="my-3 my-md-4">Your Resource For Ratings</h3>
        <form className="col-10 col-md-8">
          <input
            className="form-control py-md-2 py-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onClick={showSearchSuggestions}
          />
        </form>
        <ul
          className="border py-md-2 py-2 col-8"
          style={{
            display: `${searchSuggestions}`,
            overflow: "scroll",
            position: "absolute",
            maxHeight: "150px",
            top: "240px",
          }}
        >
          <li className="list-group-item">An item adsfasdfasdfasfdaf</li>
          <li className="list-group-item">A second item</li>
          <li className="list-group-item">A third item</li>
          <li className="list-group-item">A fourth item</li>
          <li className="list-group-item">And a fifth one</li>
        </ul>
      </div>
      <div className="container">
        <AreaCardSection />
      </div>
    </div>
  );
};

export default Home;
