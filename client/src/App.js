import "./App.css";
import { useState } from "react";
import axios from "axios";
import { IoTrashOutline } from "react-icons/io5";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  //axios requests
  const addEmployee = () => {
    //Front to backend
    axios
      .post("http://localhost:3001/create", {
        firstName: firstName,
        lastName: lastName,
        age: age,
        country: country,
        position: position,
        wage: wage,
      })
      .then(() => {
        setEmployeeList([
          ...employeeList,
          {
            firstName: firstName,
            lastName: lastName,
            age: age,
            country: country,
            position: position,
            wage: wage,
          },
        ]);
      });
  };

  const showEmployee = () => {
    axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmployeeWage = (employeeId) =>{
    axios.put("http://localhost:3001/update",{wage:newWage, employeeId:employeeId}).then((response)=>{
      setEmployeeList(employeeList.map((val) =>{
        return val.employeeId === employeeId ? {
          employeeId: val.employeeId,
           firstName:val.firstName,
           lastName: val.lastName,
           country:val.country,
           age :val.age,
           position: val.position,
           wage: newWage
          } : val
      }))
    })
  }

  const deleteEmployee = (employeeId)=>{
    axios.delete(`http://localhost:3001/delete/${employeeId}`).then((response) =>{
      setEmployeeList(employeeList.filter((val) =>{
        return val.employeeId !== employeeId
      }))
    })
  }


  return (
    <div className="container">
      <form className="content col-1">
        <span className="title">CRUD Employee System</span>
        <label>First Name: </label>
        <input
          type="text"
          required
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <label>Last Name: </label>
        <input
          type="text"
          required
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <label>Age: </label>
        <input
          type="number"
          required
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <label>Country: </label>
        <input
          type="text"
          required
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <label>Position: </label>
        <input
          type="text"
          required
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
        <label>Wage (year): </label>
        <input
          type="number"
          required
          onChange={(e) => {
            setWage(e.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </form>

      <button className="show-btn" onClick={showEmployee}>
        Show Employee
      </button>
      {employeeList.map((val, key) => {
        return (
          <div className="table-employeers">
            <table id="employeers">
              <tr>
                <th>First name</th>
                <th>Lastname</th>
                <th>Age</th>
                <th>Country</th>
                <th>Position</th>
                <th>Wage</th>
              </tr>
              <tr>
                <td>{val.firstName}</td>
                <td>{val.lastName}</td>
                <td>{val.age}</td>
                <td>{val.country}</td>
                <td>{val.position}</td>
                <td>
                  {val.wage}
                  <input
                    className="upgrade-field"
                    type="text"
                    placeholder={val.wage}
                    onChange={(e) => {
                      setNewWage(e.target.value);
                    }}
                  />
                  <button  onClick={ () =>{updateEmployeeWage(val.employeeId)}} className="show-btn btn-table">Update</button>
                  <button  onClick={ () =>{deleteEmployee(val.employeeId)}} className="delete-btn btn-table"><IoTrashOutline/></button>
                </td>
              </tr>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default App;
