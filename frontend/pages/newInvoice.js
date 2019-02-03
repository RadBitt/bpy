import React from 'react';
import SingleUser from '../components/SingleUser';
import CreateInvoice from '../components/CreateInvoice';

class NewInvoice extends React.Component {
	render() {
		return (
			<div className="container">
				<SingleUser id={this.props.query.id} />
				<CreateInvoice id={this.props.query.id} />
			</div>
		);
	}
}

export default NewInvoice;