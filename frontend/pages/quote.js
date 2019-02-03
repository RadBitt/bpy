import React from 'react';
import SingleQuote from '../components/SingleQuote';

class Quote extends React.Component {
	render() {
		return(
			<div className="container">
				<SingleQuote id={this.props.query.id} />
			</div>
		);
	}
}

export default Quote