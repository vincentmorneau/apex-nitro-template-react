import React from "react";

export default class Input extends React.Component {
  state = {}

  render() {
    return (
      <div class="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field">
        <div class="t-Form-labelContainer">
          <label class="t-Form-label">{this.props.label}</label>
        </div>
        <div class="t-Form-inputContainer">
          <div class="t-Form-itemWrapper">
            <input type="text" class="text_field apex-item-text" value={this.props.value} onChange={this.props.change} />
          </div>
        </div>
      </div>
    );
  }
}
