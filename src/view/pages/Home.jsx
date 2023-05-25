import React from "react";
import AreaCardSection from "../components/AreaCardSection";

const Home = () => {
  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center py-5 mb-5">
        <h3 className="my-3 my-md-4">Your Resource For Ratings</h3>
        <form className="d-flex col-12 col-md-8">
          <input
            className="form-control py-md-2 py-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </form>
      </div>
      <div className="container">
        <AreaCardSection />
      </div>
    </div>
  );
};

export default Home;
