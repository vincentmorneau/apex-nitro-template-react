import React from "react";

export default class Button extends React.Component {
  state = {
    clicked: false
  }

  render() {
    return (
      <button
				type="button"
        className="t-Button t-Button--primary"
        onClick={() => {
					this.setState({ clicked: true });
					this.props.click();
				}
				}
      >
				<span class="t-Button-label">{this.state.clicked ? this.props.labelClicked || this.props.label : this.props.label}</span>
      </button>
    );
  }
}
