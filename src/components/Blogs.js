import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import GoToTop from "../GoToTop";
import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      db.collection("blogs").orderBy("date", "desc"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBlogs(list);
        setLoading(false);
      },

      (error) => {
        console.error(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  return (
    <>
      <GoToTop />
      <section style={{ marginTop: "15vh", minHeight: "55vh" }}>
        <div className="container-fluid" style={{ maxWidth: "195vh" }}>
          <div className="section-title" data-aos="fade-left">
            <h2
              style={{
                fontWeight: "bold",
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              BLOGS
            </h2>
          </div>

          <div className="container-fluid">
            <div className="text-right" style={{ marginTop: "-30px" }}>
              <Button
                floated="right"
                icon
                labelPosition="left"
                primary
                size="small"
                onClick={() => navigate(`/submitblog`)}
              >
                <Icon name="upload" /> Submit Blog
              </Button>
            </div>
          </div>
        </div>

        {/* Blog Card */}
        <div className="container-fluid my-5" style={{ maxWidth: "195vh" }}>
          <div className="row">
            {blogs.map((data) => (
              <div class="col-lg-3" style={{ display: `${data.approval}` }}>
                <div
                  class="blog grid-blog"
                  style={{ border: "1px solid #ededed" }}
                >
                  <div className="blog-title" style={{ borderRadius: "8px" }}>
                    <h3>
                      <Link
                        to={`/blog/${data.id}`}
                        style={{ color: "orange", textTransform: "uppercase" }}
                      >
                        {data.name}
                      </Link>
                    </h3>
                  </div>

                  <div class="blog-image" style={{ marginTop: "-7vh" }}>
                    <img
                      class="img-fluid"
                      src={data.img}
                      style={{
                        width: "100%",
                        height: "30vh",
                        objectFit: "cover",
                      }}
                      alt="Not available"
                    />
                  </div>
                  <div
                    class="blog-content"
                    style={{ marginTop: "-40px", backgroundColor: "#fff" }}
                  >
                    <div
                      class="blogItem-desc"
                      style={{
                        textAlign: "justify",
                        height: "90px",
                        overflow: "hidden",
                      }}
                      dangerouslySetInnerHTML={{ __html: ` ${data.contents}` }}
                    ></div>
                    <div className="text-right">
                      <Link
                        style={{ marginTop: "15px", color: "orange" }}
                        to={`/blog/${data.id}`}
                        class="read-more"
                      >
                        Continue reading{" "}
                        <i
                          class="fa fa-angle-double-right"
                          aria-hidden="true"
                        ></i>
                      </Link>
                    </div>{" "}
                    <div class="blog-info clearfix">
                      <div class="post-left">
                        <div className="blogItem-author">
                          <p style={{ fontStyle: "italic" }}>{data.auth}</p>
                        </div>
                      </div>
                      <div class="post-right">
                        <ul>
                          <li>
                            <Link to={`/blogs`}>
                              <i
                                style={{ color: "grey" }}
                                class="fa fa-calendar"
                              ></i>{" "}
                              <span>
                                {data.date} | {data.time}
                              </span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Blogs;
