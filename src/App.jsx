import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
//mdb import
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
  MDBBadge,
} from "mdb-react-ui-kit";

function App() {
  //  states
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");

  //sort options
  const sortOptions = ["name", "address", "email", "phone", "status"];
  //  data fetching function
  const loadUserData = async () => {
    const userData = await axios.get("http://localhost:5000/users");
    // console.log(userData.data)
    setData(userData.data);
  };
  //useEffect for data fetch
  useEffect(() => {
    loadUserData();
  }, []);
  console.log(data);
  //functions

  //  search function
  const handleSearch = async (e) => {
    e.preventDefault();
    const searchData = await axios.get(
      `http://localhost:5000/users?q=${value}`
    );
    setData(searchData.data);
    setValue("");
  };

  //sort function
  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios
      .get(`http://localhost:5000/users?_sort=${value}&_order=asc`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };
  //filter function
  const handleFilter = async (value) => {
    return await axios
      .get(`http://localhost:5000/users?status=${value}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };

  //reset function
  const handleReset = () => {
    loadUserData();
  };
  return (
    <MDBContainer>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        className="d-flex input-group w-auto"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          className="form-control"
          placeholder="Search Name.."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <MDBBtn type="submit" color="dark">
          Search
        </MDBBtn>
        <MDBBtn className="mx-2" color="info" onClick={() => handleReset}>
          Reset
        </MDBBtn>
      </form>
      <div style={{ marginTop: "100px" }}>
        <h2>Search, Filter, Sort and Pagination using JSON Fake Rest API</h2>
        <MDBRow>
          <MDBCol size="12">
            <MDBTable>
              <MDBTableHead dark>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Name.</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone.</th>
                  <th scope="col">Address</th>
                  <th scope="col">Status</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.address}</td>
                      <td>
                        <MDBBadge
                          color={
                            item.status === "Active" ? "success" : "warning"
                          }
                          pill
                        >
                          {item.status}
                        </MDBBadge>
                      </td>
                    </tr>
                  );
                })}
              </MDBTableBody>
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
      <MDBRow>
        <MDBCol size="8">
          <h5>Sort BY:</h5>
          <select
            style={{
              width: "50%",
              borderRadius: "2px",
              height: "35px",
            }}
            onChange={handleSort}
            value={sortValue}
          >
            <option>Please Select Value</option>
            {sortOptions.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </MDBCol>
        <MDBCol size="4">
          <h5>Filter By Status:</h5>
          <MDBBtnGroup>
            <MDBBtn
              color="success"
              onClick={() => handleFilter("Active")}
              onDoubleClick={handleReset}
            >
              Active
            </MDBBtn>
            <MDBBtn
              color="warning"
              onClick={() => handleFilter("Inactive")}
              style={{ marginLeft: "8px" }}
              onDoubleClick={handleReset}
            >
              Inactive
            </MDBBtn>
          </MDBBtnGroup>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default App;
