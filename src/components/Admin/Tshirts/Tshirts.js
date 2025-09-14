import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { deleteDoc, doc } from "firebase/firestore";
import { Table } from "react-bootstrap";
import GoToTop from "../../../GoToTop";
import ModalComp from "./ModalComp";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function Tshirts() {
  const [photo, setPhoto] = useState({});
  const [photos, setPhotos] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      db.collection("Tshirts").orderBy("status", "desc"),
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
        await deleteDoc(doc(db, "Tshirts", id));
        setPhotos(photos.filter((photo) => photo.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleModal = (item) => {
    setOpen(true);
    setPhoto(item);
  };

  return (
    <>
      <GoToTop />
      <div
        className="container"
        style={{ maxWidth: "200vh", marginTop: "15vh" }}
      >
        <div className="section-title" data-aos="fade-left">
          <h2
            style={{
              fontWeight: "bold",
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            TSHIRTS REGISTRATIONS
          </h2>
        </div>

        <div className="container-fluid">
          <div className="text-right" style={{ marginTop: "-30px" }}>
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="btn btn-success"
              table="table-to-xls"
              filename="tshirtlist"
              sheet="tshirtlist"
              buttonText="Export"
            />

            {/* <Button color="blue" onClick={() => navigate(`/addgallery`)}>Add Photo</Button> */}
          </div>
        </div>

        <br></br>

        {/* Table */}

        <Table responsive striped bordered hover size="sm" id="table-to-xls">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>#</th>
              <th style={{ textAlign: "center" }}>Reg. Date</th>
              <th style={{ textAlign: "left" }}>Reg No.</th>
              <th style={{ textAlign: "left" }}>Name</th>

              <th style={{ textAlign: "center" }}>Size</th>

              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Updatedby</th>
              <th style={{ textAlign: "center" }}> </th>
            </tr>
          </thead>
          <tbody>
            {photos &&
              photos.map((item, index) => (
                <tr>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "center" }}>{item.date}</td>
                  <td style={{ textAlign: "left", textTransform: "uppercase" }}>
                    {item.regno}
                  </td>
                  <td style={{ textAlign: "left", textTransform: "uppercase" }}>
                    {item.name}
                  </td>

                  <td
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "900",
                    }}
                  >
                    {item.size}
                  </td>

                  <td style={{ textAlign: "center", fontWeight: "900" }}>
                    {item.status}
                  </td>
                  <td
                    style={{
                      fontSize: "10px",
                      maxWidth: "10vh",
                      color: "red",
                      overflow: "hidden",
                    }}
                  >
                    {item.users}
                  </td>
                  <td style={{ textAlign: "center", width: "17vh" }}>
                    <Button
                      color="green"
                      style={{ marginTop: "2px" }}
                      size="small"
                      onClick={() => handleModal(item)}
                    >
                      <i class="fa fa-eye" aria-hidden="true"></i>
                    </Button>
                    {open && (
                      <ModalComp
                        open={open}
                        setOpen={setOpen}
                        handleDelete={handleDelete}
                        {...photo}
                      />
                    )}

                    <Button
                      color="grey"
                      style={{ marginTop: "2px" }}
                      size="small"
                      onClick={() => navigate(`/edittshirts/${item.id}`)}
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
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

export default Tshirts;
