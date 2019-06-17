import "./css/app.css";
import "./css/button.css";
import img from "./img/contemplative-reptile.jpg";

import React from "react";
import ReactDOM from "react-dom";

import Alert from "./js/Alert";
import Standard from "./js/Standard";
import LikeButton from "./js/LikeButton";

class App extends React.Component {
  state = {
    emps: []
  };

  componentDidMount() {
		fetch('//localhost:50191/ords/dev/hr/employees/')
			.then(res => res.json())
			.then(json => {
				this.setState({emps: json.items});
			});
  }

  render() {
		let emps = this.state.emps.map(emp => {
			return <Alert 
					key={emp.id} 
					ename={emp.ename} 
					job={emp.job}
			/>;
		});
		
    return (
      <div className="my-app">
        <Standard title={'Employees'} copy={<LikeButton />}>
          {emps}
        </Standard>
        <img src={img} alt="test"></img>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));