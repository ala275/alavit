import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { Table } from "react-bootstrap";

function Attendance() {
  const [photos, setPhotos] = useState([]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(
      db.collection("Team").orderBy("regno", "desc"),
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

  return (
    <>
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
            MEMBERS ATTENDANCE
          </h2>
        </div>

        <br></br>

        <Table responsive striped bordered hover size="medium">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>#</th>
              <th style={{ textAlign: "left" }}>Reg No.</th>
              <th style={{ textAlign: "left" }}>Name</th>
              <th style={{ textAlign: "left" }}>Academic Year</th>
              <th style={{ textAlign: "center", width: "20vh" }}>
                Bohagi Utsav
              </th>
              <th style={{ textAlign: "center", width: "20vh" }}>
                22nd March 2023
              </th>
              <th style={{ textAlign: "center", width: "20vh" }}>
                21st March 2023
              </th>
            </tr>
          </thead>
          <tbody>
            {photos &&
              photos.map((item, index) => (
                <tr>
                  <td style={{ textAlign: "center" }}>{index + 1}</td>
                  <td style={{ textAlign: "left", textTransform: "uppercase" }}>
                    {item.regno}
                  </td>
                  <td style={{ textAlign: "left", textTransform: "uppercase" }}>
                    {item.name}
                  </td>
                  <td style={{ textAlign: "left", textTransform: "uppercase" }}>
                    2023-24
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      textTransform: "uppercase",
                      fontSize: "13px",
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    {item.a6_4_23}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      textTransform: "uppercase",
                      fontSize: "13px",
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    {item.a22_3_23}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      textTransform: "uppercase",
                      fontSize: "13px",
                      color: "green",
                      fontWeight: "bold",
                    }}
                  >
                    {item.a21_3_23}
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

export default Attendance;
