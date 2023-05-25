import React from "react";
import DormCard from "../components/DormCard";

const Area = () => {
  const dormCount = [1, 2, 3, 4, 5, 6, 7, 8];
  const backgroundImageUrl =
    "https://firebasestorage.googleapis.com/v0/b/ratemydorm-7bc3c.appspot.com/o/user-photos%2FalIRTuGbpZXrg45s15PoxIGHQZI2%2FalIRTuGbpZXrg45s15PoxIGHQZI2-IMG_7448.j-1682444898705?alt=media&amp;token=c804b64f-b2f7-4561-92f8-49f841c2484f";
  return (
    <div>
      {/* image section */}

      <div
        className="py-24 md:py-48 overflow-auto d-flex align-items-end"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          height: "384px",
        }}
      >
        <div
          className="d-flex col-12 align-items-center bg-dark justify-content-between p-2 md:px-5"
          style={{ color: "white" }}
        >
          <h2>BU Dorms</h2>
          <h5>Boston, MA</h5>
        </div>
      </div>

      {/* heading section with sort option */}

      <div className="d-md-flex justify-content-md-between align-items-md-center my-3">
        <div className="d-flex align-items-md-start flex-column">
          <h1>Browse 141 My Reviews</h1>
          <p>
            Listing 23 Boston University dorms. Click on a dorm to write a
            review.
          </p>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Sort By
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* dorm list here */}
      <div>
        <form className="col-12 col-md-6">
          <input
            className="form-control me-2 border-dark p-1 p-md-2"
            type="search"
            placeholder="Search for your dorm"
            aria-label="Search"
          />
        </form>
        <div className="mt-5">
          {dormCount.map((item) => {
            return <DormCard />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Area;
