import React from "react";
import ReactDOM from "react-dom";

import Alert from "./js/Alert";
import Standard from "./js/Standard";
import Button from "./js/Button";
import Input from "./js/Input";

import "./css/App.css";

class App extends React.Component {
  state = {
    emps: [
      // {
      //   empno: 1,
      //   ename: "SMITH",
      //   job: "CLERK",
      //   selected: false
      // },
      // {
      //   empno: 2,
      //   ename: "ALLEN",
      //   job: "SALESMAN",
      //   selected: false
      // },
      // {
      //   empno: 3,
      //   ename: "JONES",
      //   job: "MANAGER",
      //   selected: false
      // }
    ],
    ename: "",
    job: ""
  };

  componentDidMount() {
    fetch("http://localhost:50191/ords/dev/hr/employees/")
      .then(res => res.json())
      .then(json => {
        this.setState({ emps: json.items });
      });
  }

  selectAllHandler = () => {
    const emps = [...this.state.emps];

    emps.forEach(emp => {
      emp.selected = true;
    });

    this.setState({
      emps: emps
    });
  };

  selectEmpHandler = empno => {
    const emps = [...this.state.emps];
    const emp = emps.find(emp => emp.empno === empno);
    emp.selected = true;

    this.setState({
      emps: emps
    });
  };

  newEmpHandler = () => {
    const data = {
      ename: this.state.ename,
      job: this.state.job
    };

    const url = "http://localhost:50191/ords/dev/hr/employees/";

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        console.log("Success:", response);

        const emps = [...this.state.emps];
        emps.push(data);

        this.setState({
          emps: emps,
          ename: "",
          job: ""
        });
      })
      .catch(error => console.error("Error:", error));
  };

  render() {
    let emps = this.state.emps.map(emp => {
      return (
        <Alert
          key={emp.empno}
          ename={emp.ename}
          job={emp.job}
          selected={emp.selected}
          click={this.selectEmpHandler.bind(this, emp.empno)}
        />
      );
    });

    const imgStyle = {
      height: "200px",
      auto: "auto"
    };

    return (
      <div className="my-app">
        <Standard
          title={"Employees"}
          titleButton={
            <Button
              label="Select all"
              labelClicked="You selected all"
              click={() => this.selectAllHandler()}
            />
          }
        >
          {/* <Alert ename={"SMITH"} job={"CLERK"} />
          <Alert ename={"ALLEN"} job={"SALESMAN"} />
          <Alert ename={"JONES"} job={"MANAGER"} /> */}
          {emps}
        </Standard>
        <Standard
          title={"Add new employee"}
          titleButton={
            <Button label="Create" click={() => this.newEmpHandler()} />
          }
        >
          <Input
            label={"ename"}
            value={this.state.ename}
            change={event => this.setState({ ename: event.target.value })}
          />
          <Input
            label={"job"}
            value={this.state.job}
            change={event => this.setState({ job: event.target.value })}
          />
        </Standard>
        <Standard title={"Image"}>
          <img
            src={
              "https://mymodernmet.com/wp/wp-content/uploads/2019/05/bald-eagle-reflection-steve-biro.jpg"
            }
            style={imgStyle}
            alt="Eagle"
          />
        </Standard>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#apexreact"));
