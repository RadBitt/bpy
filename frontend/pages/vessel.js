import React from 'react';
import SingleVessel from '../components/SingleVessel';

class Vessel extends React.Component {
	render() {
		return(
			<div className="container">
				<SingleVessel id={this.props.query.id} />
			</div>
		);
	}
}

export default Vessel