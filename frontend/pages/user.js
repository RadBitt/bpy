import React from 'react';
import Link from 'next/link';
import SingleUser from '../components/SingleUser';
import UserInvoiceList from '../components/queries/UserInvoiceList';

class User extends React.Component {
	render() {
		return(
			<div className="container">
				<SingleUser id={this.props.query.id} />
					<p>
						<Link href={{
						pathname: 'newInvoice', 
						query: {id: this.props.query.id}
						}}>
						<a>Create a new invoice for this client.</a>
						</Link>
					</p>
				<UserInvoiceList id={this.props.query.id} />
			</div>
		);
	}
}

export default User