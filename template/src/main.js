import apex from 'apex';
const $ = apex.jQuery;

import React from 'React';
import ReactDOM from 'ReactDOM';

function Kscope() {
	return (
		<div>
			Hello Kscope attendees!
		</div>
	);
}

ReactDOM.render(<Kscope />, document.querySelector('#t_Body_content'));