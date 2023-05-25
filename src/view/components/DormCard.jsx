import React from "react";
import { Link } from "react-router-dom";

const DormCard = () => {
  return (
    <div className="card border-start-0 border-top-0 border-end-0 mb-3 d-flex col-12 col-md-8">
      <Link to="/dorm">
        <div className="row g-0">
          <div className="col-md-2 col-sm-3 col-4">
            <img
              src="https://www.ratemydorm.com/_next/image?url=https%3A%2F%2Ffirebasestorage.googleapis.com%2Fv0%2Fb%2Fratemydorm-7bc3c.appspot.com%2Fo%2Fuser-photos%252FalIRTuGbpZXrg45s15PoxIGHQZI2%252FalIRTuGbpZXrg45s15PoxIGHQZI2-IMG_7441.j-1682444950515%3Falt%3Dmedia%26token%3Da0d46c09-a851-4cc0-a069-5d8b28881319&w=1200&q=75"
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8 col-8">
            <div className="card-body text-start col-12">
              <h4 className="card-title">Warren Titles</h4>
              <div className="d-flex gap-3">
                <h3 className="card-text">*****</h3>
                <p className="card-text">84 Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DormCard;
