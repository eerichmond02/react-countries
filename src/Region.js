import React, { Component } from 'react';
import Country from './Country';
import axios from 'axios';

class Region extends Component {
	constructor(props){
		super(props);
		this.state = {
			countries: []
		}
	}

	componentDidMount() {
		axios.get('https://restcountries.eu/rest/v2/regionalbloc/' + this.props.region)
		.then(({data}) => {
			console.log(data);
			this.setState({countries: data});
		})
		.catch( err => {
			console.log(err);
		})
	}

	render() {
		if (this.props.loading) {
			return (<div><br /><span className="loading-indicator small"></span></div>)
		} else {
			return (
				<div>
					<h1>{this.props.region}</h1>
					{this.state.countries.map(country => (
						<Country
							key={country.numericCode} 
							country={country}
							getTrackedCountries={this.props.getTrackedCountries}
							trackedCountries={this.props.trackedCountries}
							disabled={true}
							setLoading={this.props.setLoading}/>
					))}
				</div>
			)
		}
	}
}

export default Region;