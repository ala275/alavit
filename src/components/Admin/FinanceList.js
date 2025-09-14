import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Button, Icon } from "semantic-ui-react";
import FinanceDataService from "./Financeservice";

const FinanceList = ({ getFinanceId }) => {
  const [finances, setFinances] = useState([]);
  useEffect(() => {
    getFinances();
  }, []);

  const getFinances = async () => {
    const data = await FinanceDataService.getAllFinances();
    console.log(data.docs);
    setFinances(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await FinanceDataService.deleteFinance(id);
        getFinances();
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <div className="container"></div>

      <div
        className="container"
        style={{ fontSize: "13px", maxWidth: "150vh" }}
      >
        <h4 style={{ textAlign: "left", fontWeight: "bold" }}>FINANCE</h4>
        <hr></hr>
        <div className="mb-2">
          <Button
            primary
            icon
            labelPosition="left"
            size="small"
            onClick={getFinances}
          >
            <Icon name="refresh" /> Refresh List
          </Button>
        </div>

        <Table responsive striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th style={{ textAlign: "left" }}>Purpose</th>
              <th style={{ textAlign: "center" }}>Date</th>
              <th style={{ textAlign: "center" }}>Amount</th>

              <th style={{ textAlign: "center" }}>Type</th>
              <th style={{ textAlign: "center" }}>Updated by</th>
              <th style={{ textAlign: "center" }}>Updated on</th>
              <th style={{ textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {finances.map((doc, index) => {
              return (
                <tr key={doc.id}>
                  <td>{index + 1}</td>
                  <td style={{ textAlign: "left" }}>{doc.purpose}</td>
                  <td style={{ textAlign: "center" }}>{doc.date}</td>
                  <td
                    style={{
                      textAlign: "center",
                      color: "red",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    ₹{doc.amount}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: "13px",
                    }}
                  >
                    {doc.type}
                  </td>
                  <td
                    style={{
                      fontSize: "10px",
                      textAlign: "center",
                      maxWidth: "70px",
                      overflow: "hidden",
                    }}
                  >
                    {doc.users}
                  </td>

                  <td
                    style={{
                      fontSize: "10px",
                      textAlign: "center",
                      maxWidth: "70px",
                    }}
                  >
                    {doc.ddate} | {doc.time}{" "}
                  </td>

                  <td style={{ textAlign: "center", width: "15vh" }}>
                    <Button
                      color="grey"
                      style={{ marginTop: "2px" }}
                      size="small"
                      onClick={(e) => getFinanceId(doc.id)}
                    >
                      <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                    </Button>

                    <Button
                      color="red"
                      style={{ marginTop: "2px" }}
                      size="small"
                      onClick={(e) => deleteHandler(doc.id)}
                    >
                      <i class="fa fa-trash" aria-hidden="true"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default FinanceList;
