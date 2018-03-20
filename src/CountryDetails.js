import React, { Component } from 'react';
import axios from 'axios';

class CountryDetails extends Component {
	constructor(props){
		super(props);
		this.state = {
			country: {}
		}
	}

	componentDidMount() {
		axios.get('https://restcountries.eu/rest/v2/name/' + this.props.match.params.country)
		.then(({data}) => {
			console.log(data);
			this.setState({country: data[0]});
		})
		.catch( err => {
			console.log(err);
		})
	}

	render() {
		let returned;
		{this.state.country.name ? returned = 
			(
				<div className='card'>
					<h1>{this.state.country.name}</h1>
					<br />
					<div className='row'>
						<div className='small-4 columns'>
							<h4>Capital:</h4>
						</div>
						<div className='small-8 columns'>
							<h4>{this.state.country.capital}</h4>
						</div>
					</div>
					<div className='row'>
						<div className='small-4 columns'>
							<h4>Currencies:</h4>
						</div>
						<div className='small-4 columns'>
							<h4>Name:</h4>
							{this.state.country.currencies.map((currency, idx) => (
								<h4 key={idx}>{currency.name}</h4>
							))}
						</div>
						<div className='small-4 columns'>
							<h4>Symbol:</h4>
							{this.state.country.currencies.map((currency, idx) => (
								<h4 key={idx}>{currency.symbol}</h4>
							))}
						</div>
					</div>
					<div className='row'>
						<div className='small-4 columns'>
							<h4>Languages:</h4>
						</div>
						<div className='small-8 columns'>
							{this.state.country.languages.map((language, idx) => (
								<h4 key={idx}>{language.name}</h4>
							))}
						</div>
					</div>
					<div className='row'>
						<div className='small-4 columns'>
							<h4>Population:</h4>
						</div>
						<div className='small-8 columns'>
							<h4>{this.state.country.population}</h4>
						</div>
					</div>
					<br />
					<div>
						<img src={this.state.country.flag} alt={`${this.state.country.name}-flag`}/>
					</div>
				</div>
			) : returned = (<h3 className='error'>Error: Country not found.</h3>)
		}
		return (returned)
	}
}

export default CountryDetails;