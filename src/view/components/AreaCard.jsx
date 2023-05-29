import React from "react";
import { Link } from "react-router-dom";

const AreaCard = () => {
  return (
    <div
      className="card shadow border-0 rounded-4 col-5 col-md-3 col-sm-5 p-0"
      style={{ maxWidth: "17rem" }}
    >
      <Link className="badge-light" to="/area">
        <img
          className="card-img-top rounded-top-4"
          src="https://www.ratemydorm.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fratemydorm-7bc3c.appspot.com%2Fo%2Fuser-photos%252FalIRTuGbpZXrg45s15PoxIGHQZI2%252FalIRTuGbpZXrg45s15PoxIGHQZI2-IMG_7448.j-1682444898705%3Falt%3Dmedia%26token%3Dc804b64f-b2f7-4561-92f8-49f841c2484f&w=1200&q=75"
          alt="Card image cap"
        />
        <div className="card-body text-start">
          <h5 className="card-title">Queensland UA</h5>
          <div className="d-flex justify-content-between">
            <h6 className="card-text">414 Ratings</h6>
            <h6 className="card-text d-none d-sm-block">Dash Area</h6>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AreaCard;
