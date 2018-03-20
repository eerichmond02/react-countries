import React from 'react';
import { Link, Route } from 'react-router-dom';
import CountryDetails from './CountryDetails';
import axios from 'axios';

const Country = (props) => {

	let found = false;
	for (let i = 0; i < props.trackedCountries.length; i ++){
		if(props.country.numericCode === props.trackedCountries[i].numericCode) {
			found = true;
		}
	}

	let trackingButton;
	if (!found) {
		trackingButton = (
			<button className='btn btn-ca success' onClick={() => {
				props.setLoading();
				let newCountry = {
		      name: props.country.name,
		      capital: props.country.capital,
		      population: props.country.population,
		      flag: props.country.flag,
		      numericCode: props.country.numericCode
		    };
		    axios.post('http://5a8497493015220012486c19.mockapi.io/api/v1/trackedCountries', newCountry).then(response => {
		    	props.setLoading();
		     	props.getTrackedCountries();
		    })
		    .catch(err => {
		    	props.setLoading();
		    	console.log(err);
		    });
			}}>Track</button>
		)
	} else {
		trackingButton = (
			<button className='btn btn-ca warning' disabled={props.disabled} onClick={() => {
				props.setLoading();
				console.log('removing...')
				let id;
				for (let i = 0; i < props.trackedCountries.length; i ++){
					if(props.country.numericCode === props.trackedCountries[i].numericCode) {
						id = props.trackedCountries[i].id;
					}
				}
				console.log(id);
				axios.delete('http://5a8497493015220012486c19.mockapi.io/api/v1/trackedCountries/' + id).then(response => {
					props.setLoading();
          props.getTrackedCountries();
      	})
      	.catch (err => {
      		props.setLoading();
      		console.log(err);
      	}); 
			}}>Tracked</button>
		)
	}

	return (
		<div>
			<Route path='/countries/:country' exact render={(renderProps) => (
				<CountryDetails country={props.country}/>
			)} />
			<div className='row card'>
				<div className='small-5 columns'>
					<img src={props.country.flag} alt={`${props.country.name}-flag`}/>
				</div>
				<div className='small-5 columns'>
				<h4>Country Name: <Link to={`/countries/${props.country.name}`}>{props.country.name}</Link></h4>
					<h4>Capital: {props.country.capital}</h4>
					<h4>Population: {props.country.population}</h4>
				</div>
				<div className='small-2 columns'>
					{trackingButton}
				</div>
			</div>
		</div>
	)
}

export default Country;