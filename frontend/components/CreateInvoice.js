import React from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import VesselOptionList from './queries/VesselOptionList';
import formatMoney from '../lib/formatMoney';
import Error from './ErrorMessage';


const CREATE_INVOICE_MUTATION = gql`
	mutation CREATE_INVOICE_MUTATION(
		$charterStartDate: String
		$charterEndDate: String
		$totalPrice: Int
	){
		createInvoice(
		charterStartDate: $charterStartDate
		charterEndDate: $charterEndDate
		totalPrice: $totalPrice
		) {
			id
		}
	}
`


class CreateInvoice extends React.Component {

	state = {
		user: '',
		vessel: '',
		charterStartDate: moment()._d,
		charterEndDate: moment()._d,
		totalPrice: 0,
		displayPrice: 0
	}

	componentDidMount = () => {
		this.setState({
			user: this.props.id
		})
	}

	handleChange = e => {
		const { name, type, value } = e.target;
		const val = type === 'number' ? parseFloat(value) : value;
		this.setState({ [name]: val })
	}

	handleStartDateChange = date => {
	    this.setState({
	      charterStartDate: date,
	      charterEndDate: date
	    });
  	}

  	handleEndDateChange = date => {
  		const endDate = moment(date);
  		const startDate = moment(this.state.charterStartDate);
  		let totalDays = endDate.diff(startDate, 'days') + 1;
  		let tempMoment = moment(this.state.charterStartDate);
  		let weekendDays = 0;
  		let i = 0;
  		// console.log('there are ' + totalDays + ' total days');
  		while(i < totalDays) {
  			if(tempMoment.day() == 0 || tempMoment.day() == 6) {
  				weekendDays++;
  			}
  			tempMoment.add(1, 'd');
  			i++
  		}
  		// console.log('there are weekend days ' + weekendDays);
	    this.setState({
	      charterEndDate: date
	    });
	    this.handleChangePrice(weekendDays, totalDays);
	}

	handleChangePrice = (weekendDays, totalDays) => {
		const weekDays = totalDays - weekendDays;
		const price = (weekDays * 25000) + (weekendDays * 30000);
		console.log(weekDays + ' * ' + '$250' + ' + ' + weekendDays + ' * ' + '$300');
		this.setState({ 
			totalPrice: price,
			displayPrice: formatMoney(price)
		})
	}

	render() {
		return(
			<Mutation 
			mutation={CREATE_INVOICE_MUTATION} 
			variables={this.state}>
			{(createInvoice, { loading, error }) => (
				<form onSubmit={async e => {
						// Stop the form from submitting
						e.preventDefault();
						// call the mutation
						const res = await createInvoice();
						// change them to the single item page
						Router.push({
						pathname: '/invoices',
						query: { id: res.data.createInvoice.id },
						});
					}}>
					<Error error={error} />
					<fieldset disabled={loading} />
					<div className="form-group">
					    <label htmlFor="vessel">Select Charter Vessel</label>
					      <VesselOptionList className="form-control" 
					    	id="vessel"
					    	name="vessel"
					    	value={this.state.vessel}
					    	handleChange={this.handleChange}
					    />
				 	</div>
				 	<div className="form-group">
					    <label htmlFor="charterStartDate">Charter Start Date</label>
					    <DatePicker
					    	selected={this.state.charterStartDate}
						    selectsStart
						    startDate={this.state.charterStartDate}
						    endDate={this.state.charterEndDate}
						    onChange={this.handleStartDateChange}
						    showTimeSelect
					    />
					</div>
					<div className="form-group">
					    <label htmlFor="charterEndDate">Charter End Date</label>
					    <DatePicker
					    	selected={this.state.charterEndDate}
						    selectsEnd
						    startDate={this.state.charterStartDate}
						    endDate={this.state.charterEndDate}
						    onChange={this.handleEndDateChange}
						    showTimeSelect
					    />
					</div>
					<div className="form-group">
					    <label htmlFor="totalPrice">Total Price</label>
					    <input 
						    type="text" 
						    className="form-control" 
						    id="totalPrice"
						    name="totalPrice"			
						    placeholder="$0.00" 
						    required
						    readOnly
						    value={this.state.displayPrice}
					    />
					</div>
					<button type="submit">Submit</button>
				</form>
				)}
			</Mutation>
		);
	}
}

export default CreateInvoice;