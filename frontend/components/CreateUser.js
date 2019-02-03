import React from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Error from './ErrorMessage';


const CREATE_USER_MUTATION = gql`
	mutation CREATE_USER_MUTATION(
		$firstName: String
		$lastName: String
		$phone: String
		$email: String
		$address1: String
		$address2: String
		$city: String
		$state: String
		$zip: Int
	){
		createUser(
		firstName: $firstName
		lastName: $lastName
		phone: $phone
		email: $email
		address1: $address1
		address2: $address2
		city: $city
		state: $state
		zip: $zip
		) {
			id
		}
	}
`


class CreateUser extends React.Component {

	state = {
		firstName: '',
		lastName: '',
		email: '',
		address1: '',
		address2: '',
		city: '',
		state: '',
		zip: ''
	}

	handleChange = e => {
		const {name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val })
	}

	render() {
		return(
			<Mutation 
			mutation={CREATE_USER_MUTATION} 
			variables={this.state}>
			{(createUser, { loading, error }) => (
				<form onSubmit={async e => {
						// Stop the form from submitting
						e.preventDefault();
						// call the mutation
						const res = await createUser();
						// change them to the single item page
						console.log(res);
						Router.push({
						pathname: '/user',
						query: { id: res.data.createUser.id },
						});
					}}>
					<Error error={error} />
					<fieldset disabled={loading} />
						<div className="form-group">
						<label htmlFor="firstName">firstName</label>
						<input
							type="text"
							className="form-control"
							id="firstName"
							name="firstName"
							placeholder="firstName"
							required
							value={this.state.firstName}
							onChange={this.handleChange}
						/>
						</div>
						<div className="form-group">
						<label htmlFor="lastName">lastName</label>
						<input
							type="text"
							className="form-control"
							id="lastName"
							name="lastName"
							placeholder="lastName"
							required
							value={this.state.lastName}
							onChange={this.handleChange}
						/>
						</div>
						<div className="form-group">
						<label htmlFor="phone">phone</label>
						<input
							type="text"
							className="form-control"
							id="phone"
							name="phone"
							placeholder="phone"
							required
							value={this.state.phone}
							onChange={this.handleChange}
						/>
						</div>
						<div className="form-group">
						<label htmlFor="email">email</label>
						<input
							type="text"
							className="form-control"
							id="email"
							name="email"
							placeholder="email"
							required
							value={this.state.email}
							onChange={this.handleChange}
						/>
						</div>
						<div className="form-group">
						<label htmlFor="address1">address1</label>
						<input
							type="text"
							className="form-control"
							id="address1"
							name="address1"
							placeholder="address1"
							required
							value={this.state.address1}
							onChange={this.handleChange}
						/>
						</div>
						<div className="form-group">
						<label htmlFor="address2">address2</label>
						<input
							type="text"
							className="form-control"
							id="address2"
							name="address2"
							placeholder="address2"
							value={this.state.address2}
							onChange={this.handleChange}
						/>
						</div>
						<div className="form-group">
						<label htmlFor="city">city</label>
						<input
							type="text"
							className="form-control"
							id="city"
							name="city"
							placeholder="city"
							required
							value={this.state.city}
							onChange={this.handleChange}
						/>
						</div>
						<div className="form-group">
						<label htmlFor="state">state</label>
						<input
							type="text"
							className="form-control"
							id="state"
							name="state"
							placeholder="state"
							required
							value={this.state.state}
							onChange={this.handleChange}
						/>
						</div>
						<div className="form-group">
						<label htmlFor="zip">zip</label>
						<input
							type="text"
							className="form-control"
							id="zip"
							name="zip"
							placeholder="zip"
							required
							value={this.state.zip}
							onChange={this.handleChange}
						/>
						</div>
					<button type="submit">Submit</button>
				</form>
				)}
			</Mutation>
		);
	}
}

export default CreateUser;