import React from "react";

const Alert = props => (
  <div className="t-Alert t-Alert--horizontal t-Alert--info">
    <div className="t-Alert-wrap">
      <div className="t-Alert-icon">
        <span className="t-Icon fa fa-user" />
      </div>
      <div className="t-Alert-content">
        <div className="t-Alert-header">
          <h2 className="t-Alert-title">{props.ename}</h2>
        </div>
        <div className="t-Alert-body">{props.job}</div>
      </div>
      <div className="t-Alert-buttons" />
    </div>
  </div>
);

export default Alert;
