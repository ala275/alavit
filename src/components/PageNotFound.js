import React from "react";
import { Link } from "react-router-dom";
import GoToTop from "../GoToTop";

function PageNotFound() {
  return (
    <>
      <GoToTop />
      <section style={{ marginTop: "23vh", marginBottom:'22vh' }}>
        <div class="container" style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "20vh", fontWeight: "750" }}>404</h1>

          <span style={{ fontSize: "20px" }}>Page Could Not Be Found</span>

          <div class="card-body mx-auto">
            <Link
              type="button"
              to="/"
              className="btn btn-sm"
              style={{
                background:
                  "linear-gradient(95.24deg, #038CB7 0%, #04C3FF 137.16%)",
                color: "white",
              }}
            >
              {" "}
              Back To Home{" "}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default PageNotFound;