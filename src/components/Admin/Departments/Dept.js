import React, { useState, useEffect } from "react";
import { Button, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import { Table } from "react-bootstrap";
import GoToTop from "../../../GoToTop";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function Dept() {
  const [photo, setPhoto] = useState({});
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      db.collection("Departments").orderBy("dept"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setPhotos(list);
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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        setOpen(false);
        await deleteDoc(doc(db, "Departments", id));
        setPhotos(photos.filter((photo) => photo.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <GoToTop />
      <div
        className="container"
        style={{ maxWidth: "200vh", marginTop: "17vh" }}
      >
        <div className="section-title">
          <h2
            style={{
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            DEPARTMENT SELECTION
          </h2>
        </div>

        <div className="container-fluid">
          <div className="text-right" style={{ marginTop: "-30px" }}>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="btn btn-success"
              table="table-to-xls"
              filename="Department"
              sheet="Department"
              buttonText="Export"
            />

            {/* <Button color="blue" onClick={() => navigate(`/addgallery`)}>Add Photo</Button> */}
          </div>
        </div>

        {/* Table */}

        <br></br>

        <Table responsive striped bordered hover size="sm" id="table-to-xls">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>#</th>
              <th style={{ textAlign: "left" }}>Reg No.</th>
              <th style={{ textAlign: "left" }}>Name</th>
              <th style={{ textAlign: "left" }}>Email</th>
              <th style={{ textAlign: "left" }}>Contact</th>
              <th style={{ textAlign: "left" }}>Department</th>
              <th style={{ textAlign: "left" }}>Department (II)</th>

              <th style={{ textAlign: "center" }}>Posted on</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {photos &&
              photos.map((item, index) => (
                <tr>
                  <td style={{ textAlign: "center", width: "5vh" }}>
                    {index + 1}
                  </td>
                  <td
                    style={{
                      textAlign: "left",
                      textTransform: "uppercase",
                      width: "20vh",
                    }}
                  >
                    {item.regno}
                  </td>
                  <td
                    style={{
                      textAlign: "left",
                      width: "35vh",
                      textTransform: "uppercase",
                      fontWeight: "bold",
                    }}
                  >
                    {item.name} {item.lname}
                    <br></br>
                    <small
                      style={{
                        color: "red",
                        fontSize: "9px",
                        fontWeight: "200",
                      }}
                    >
                      [Not for validation]
                    </small>
                  </td>

                  <td style={{ textAlign: "left", width: "45vh" }}>
                    {item.email}
                  </td>
                  <td style={{ textAlign: "left", width: "15vh" }}>
                    {item.contact}
                  </td>
                  <td
                    style={{ textAlign: "left", color: "red", width: "22vh" }}
                  >
                    <b>{item.dept}</b>
                  </td>
                  <td style={{ textAlign: "left", width: "22vh" }}>
                    {item.dept2}
                  </td>
                  <td style={{ textAlign: "center", width: "15vh" }}>
                    {item.date}
                    <br></br>
                    {item.time}
                  </td>
                  <th
                    style={{
                      textAlign: "center",
                      color: "green",
                      width: "15vh",
                    }}
                  >
                    {item.approval}
                  </th>
                  <td style={{ textAlign: "center", width: "17vh" }}>
                    <Button
                      color="grey"
                      style={{ marginTop: "2px" }}
                      size="small"
                      onClick={() => navigate(`/editdept/${item.id}`)}
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </Button>
                    <Button
                      color="red"
                      style={{ marginTop: "2px" }}
                      size="small"
                      onClick={() => handleDelete(item.id)}
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        {/* Table */}

        <br></br>
      </div>
    </>
  );
}

export default Dept;
