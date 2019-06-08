import './css/app.css';
import './css/button.css';

import React from 'react';
import ReactDOM from 'react-dom';

import LikeButton from './js/LikeButton';

import apex from 'apex';
const $ = apex.jQuery;

class MyComponent extends React.Component {
  render() {
    return <div className="my-app">
			Hello World
			<br />
			<LikeButton />
		</div>;
  }
}

ReactDOM.render(<MyComponent />, document.querySelector('#t_Body_content'));

// Example function using jquery
export function triggerApexjQuery() {
	console.log($(".my-app").text());
	alert($(".my-app").text());
}

// Example function using jquery
export function triggerApexItem() {
	apex.message.alert("hello world");
}

// main information about the project
// name and version will be injected during the build
export const projectInfo = {
	name: 'APEX_NITRO_PROJECT_NAME',
	version: 'APEX_NITRO_PROJECT_VERSION',
};