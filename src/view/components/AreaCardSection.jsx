import React from "react";
import AreaCard from "./AreaCard";

const AreaCardSection = () => {
  const places = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="d-flex justify-content-center">
      <div className="row d-flex gap-3 justify-content-center">
        {places.map((item) => {
          return <AreaCard />;
        })}
      </div>
    </div>
  );
};

export default AreaCardSection;
