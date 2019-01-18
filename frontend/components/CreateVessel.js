import React from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';


const CREATE_VESSEL_MUTATION = gql`
	mutation CREATE_VESSEL_MUTATION(
		$vesselName: String
		$weekNightPrice: Int
		$weekendNightPrice: Int
		$vesselOwner: String
		$vesselOwnerEmail: String
	){
		createVessel(
		vesselName: $vesselName
		weekNightPrice: $weekNightPrice
		weekendNightPrice: $weekendNightPrice
		vesselOwner: $vesselOwner
		vesselOwnerEmail: $vesselOwnerEmail
		) {
			id
		}
	}
`


class CreateVessel extends React.Component {

	state = {
		vesselName: '',
		weekNightPrice: '',
		weekendNightPrice: '',
		vesselOwner: '',
		vesselOwnerEmail: ''
	}

	handleChange = e => {
		const {name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val })
	}

	render() {
		return(
			<Mutation 
			mutation={CREATE_VESSEL_MUTATION} 
			variables={this.state}>
			{(createVessel, { loading, error }) => (
				<form onSubmit={async e => {
						// Stop the form from submitting
						e.preventDefault();
						// call the mutation
						const res = await createVessel();
						// change them to the single item page
						console.log(res);
						Router.push({
						pathname: '/vessels',
						query: { id: res.data.createVessel.id },
						});
					}}>
					<Error error={error} />
					<fieldset disabled={loading} />
					<div className="form-group">
					    <label htmlFor="vesselName">vesselName</label>
					    <input 
						    type="text" 
						    className="form-control" 
						    id="vesselName"
						    name="vesselName"			
						    placeholder="vesselName" 
						    required
						    value={this.state.vesselName}
						    onChange={this.handleChange}
					    />
					</div>
					<div className="form-group">
					    <label htmlFor="weekNightPrice">weekNightPrice</label>
					    <input 
						    type="text" 
						    className="form-control" 
						    id="weekNightPrice"
						    name="weekNightPrice"			
						    placeholder="weekNightPrice" 
						    required
						    value={this.state.weekNightPrice}
						    onChange={this.handleChange}
					    />
					</div>
					<div className="form-group">
					    <label htmlFor="weekendNightPrice">weekendNightPrice</label>
					    <input 
						    type="text" 
						    className="form-control" 
						    id="weekendNightPrice"
						    name="weekendNightPrice"			
						    placeholder="weekendNightPrice" 
						    required
						    value={this.state.weekendNightPrice}
						    onChange={this.handleChange}
					    />
					</div>
					<div className="form-group">
					    <label htmlFor="vesselOwner">vesselOwner</label>
					    <input 
						    type="text" 
						    className="form-control" 
						    id="vesselOwner"
						    name="vesselOwner"			
						    placeholder="vesselOwner" 
						    required
						    value={this.state.vesselOwner}
						    onChange={this.handleChange}
					    />
					</div>
					<div className="form-group">
					    <label htmlFor="vesselOwnerEmail">vesselOwnerEmail</label>
					    <input 
						    type="text" 
						    className="form-control" 
						    id="vesselOwnerEmail"
						    name="vesselOwnerEmail"			
						    placeholder="vesselOwnerEmail" 
						    required
						    value={this.state.vesselOwnerEmail}
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

export default CreateVessel;