import React from 'react';
import Country from './Country';
import axios from 'axios';

const Tracking = (props) => {

	if (props.loading) {
		return (<div><br /><span className="loading-indicator small"></span></div>)
	} else {
		return (
			<div>
				<h1>Tracked Countries</h1>
				{props.trackedCountries.map(country => (
					<Country 
						key={country.numericCode}
						country={country}
						getTrackedCountries={props.getTrackedCountries}
						trackedCountries={props.trackedCountries}
						disabled={false}
						setLoading={props.setLoading}/>
				))}
			</div>
		)
	}
}

export default Tracking;