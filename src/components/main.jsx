import React from "react";
import Table from "react-bootstrap/Table";
import moment from "moment";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
// const collapse = require("bootstrap/js/src/collapse.js");

moment().format();
let data = require("../data/candidates.json");
// console.log(data)
let results = data;
console.log("DATA", data.results[0].id);
function Main() {
  let onClickHandler = (e) => {
    const hiddenElement = e.currentTarget.nextSibling;
    hiddenElement.className.indexOf("collapse show") > -1
      ? hiddenElement.classList.remove("show")
      : hiddenElement.classList.add("show");
  };
  let onClickHandlerModal = (e) => {
    const hiddenElement = e.currentTarget.nextSibling;
    hiddenElement.className.indexOf("collapse show") > -1
      ? hiddenElement.classList.remove("show")
      : hiddenElement.classList.add("show");
  };
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <button></button>
          <th>Candidate Name</th>
          <th>Status</th>
          <th># Apps</th>
          <th>Last Action</th>
        </tr>
      </thead>

      {data.results.map((row, index) => {
        return (
          <tbody>
            <tr onClick={onClickHandler}>
              <td>{row.name}</td>
              <td>{row.applications[0].new_status.label}</td>
              <td>{row.applications.length}</td>
              <td>
                {JSON.parse(Date.parse(new Date(row.applications[0].updated)))}
              </td>
            </tr>
            <tr className="collapse" >
              {row.applications.map((app) => {
                return (
                  <div>
                    <tr>
                  <td colSpan="6" onClick={onClickHandlerModal}>
                    {app.role.title} Status: {app.new_status.label}{" "}
                  </td>
                  <td className = 'collapse'>app id: {app.id} <br></br>role id: {app.role.id} <br></br>top candidate? {app.top_candidate ? 'True' : 'False'} <br></br>high retention? {app.high_retention ? 'True' : "False"}</td>
                  </tr>
                  
                  </div>
                  
                    
                 
                  
                  
                    
                    
                );
              })}
            </tr>
          </tbody>
        );
      })}
    </Table>
  );
}

export default Main;
