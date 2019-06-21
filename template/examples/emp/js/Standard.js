import React from 'react';

class Standard extends React.Component {
	render () {
		return (
			<div class="t-Region">
			<div class="t-Region-header">
				<div class="t-Region-headerItems t-Region-headerItems--title">
					<span class="t-Region-headerIcon">
						<span class="t-Icon" aria-hidden="true"></span>
					</span>
					<h2 class="t-Region-title">{this.props.title}</h2>
				</div>
				<div class="t-Region-headerItems t-Region-headerItems--buttons">
					{this.props.titleButton}
					<span class="js-maximizeButtonContainer"></span>
				</div>
			</div>
			<div class="t-Region-bodyWrap">
				<div class="t-Region-buttons t-Region-buttons--top">
				</div>
				<div class="t-Region-body">
					{this.props.children}
				</div>
			</div>
		</div>
		);
	}
}

export default Standard;
