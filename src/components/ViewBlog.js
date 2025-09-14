import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import GoToTop from "../GoToTop";
import { doc, getDoc } from "firebase/firestore";
const initialState = {
  name: "",
  contents: "",
};

function ViewBlog() {
  const [data, setData] = useState(initialState);
  const { name, contents, auth, img, date, time } = data;
  const { id } = useParams();

  useEffect(() => {
    id && getSingleBoard();
  }, [id]);

  const getSingleBoard = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef, "blogs");
    if (snapshot.exists()) {
      setData({ ...snapshot.data() });
    }
  };

  return (
    <>
      <GoToTop />
      <section style={{ marginTop: "10vh", minHeight: "60vh" }}>
        <div class="content" style={{ position: "relative" }}>
          <img
            src={img}
            alt=" "
            id="blogimagecover"
            style={{ width: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.538)",
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
            }}
          ></div>

          <div
            class="centered"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <h2
              style={{ fontWeight: "800", color: "white", textAlign: "center" }}
            >
              {name}
            </h2>
          </div>
        </div>

        <div className="blog-wrap">
          <div class="container-fluid my-5" style={{ maxWidth: "190vh" }}>
            <div class="content">
              <div class="row"></div>
              <div class="row">
                <div class="col-md-8">
                  <div class="blog-view">
                    <article class="blog blog-single-post">
                      <div class="blog-info clearfix">
                        <div class="post-left">
                          <ul>
                            <li>
                              <p>
                                <i
                                  style={{ color: "orange" }}
                                  class="fa fa-calendar"
                                ></i>{" "}
                                <span>
                                  {date} | {time}
                                </span>
                              </p>
                            </li>
                            <li>
                              <p>
                                <i
                                  style={{ color: "orange" }}
                                  class="fa fa-user-o"
                                ></i>{" "}
                                <span>
                                  By{" "}
                                  <span style={{ textTransform: "uppercase" }}>
                                    {auth}
                                  </span>
                                </span>
                              </p>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="blog-image"></div>
                      <div
                        class="blog-content"
                        style={{ border: "1px solid #ededed", padding: "15px" }}
                      >
                        <div
                          class="blog-desc"
                          style={{ textAlign: "justify" }}
                          dangerouslySetInnerHTML={{
                            __html: ` ${data.contents}`,
                          }}
                        ></div>
                      </div>
                    </article>
                  </div>
                </div>
                <aside class="col-md-4 my-4">
                  <div class="widget post-widget">
                    <h6>About author</h6>
                    <hr></hr>
                    <div class="about-author">
                      <div
                        class="author-details"
                        style={{ marginTop: "15px", fontSize: "18px" }}
                      >
                        <span
                          class="blog-author-name"
                          style={{
                            fontWeight: "800",
                            textTransform: "uppercase",
                          }}
                        >
                          {auth}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* <div class="widget post-widget">
     

         </div> */}
                </aside>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewBlog;
