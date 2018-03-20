import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Home from './Home';
import Region from './Region';
import CountryDetails from './CountryDetails';
import Tracking from './Tracking';
import axios from 'axios';

const CustomLink = ({label, to, exact}) => (
  <Route path={to} exact={exact} children={ ({match}) => (
    <li className={match ? 'active filter-nav-entry navlink' : 'filter-nav-entry navlink'}>
      <Link to={to}>{label}</Link>
    </li>
  )} />
)

const regionBlocs = ['EU', 'EFTA', 'CARICOM', 'PA', 'AU', 'USAN', 'EEU',
                      'AL', 'ASEAN', 'CAIS', 'CEFTA', 'NAFTA', 'SAARC'];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackedCountries: [],
      loading: false
    }
    this.getTrackedCountries = this.getTrackedCountries.bind(this);
    this.setLoading = this.setLoading.bind(this);
  }

  componentDidMount() {
    this.getTrackedCountries();
  }

  getTrackedCountries() {
    this.setState({loading: true});
    axios.get('http://5a8497493015220012486c19.mockapi.io/api/v1/trackedCountries').then(response => {
      this.setState({trackedCountries: response.data, loading: false});
    })
    .catch(err => console.log(err));
  }

  setLoading() {
    this.setState({loading: !this.state.loading});
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <div className="row padding-horiz-small">
              <div className="columns small-3 padding-top-medium">
                <ul className='filter-nav vertical'>
                  <h5>Main Pages</h5>
                  <CustomLink label='Home' to='/' exact={true}/>
                  <CustomLink label='Tracking' to='/tracking/countries' />
                  <h5>Regions</h5>
                  {regionBlocs.map((regionBloc, idx) => (
                    <CustomLink key={idx} exact={true} label={regionBloc} to={`/${regionBloc.toLowerCase()}`} />
                  ))}
                </ul>
              </div>
              <div className="columns small-9 padding-top-medium content">
                <Route path='/' exact component={Home}/>
                <Route path='/tracking/countries' render={renderProps => (
                    <Tracking {...renderProps} getTrackedCountries={this.getTrackedCountries} trackedCountries={this.state.trackedCountries} loading={this.state.loading} setLoading={this.setLoading}/>
                  )}/>
                {regionBlocs.map((regionBloc, idx) => (
                  <Route key={idx} exact path={`/${regionBloc.toLowerCase()}`} render={renderProps => (
                    <Region {...renderProps} region={regionBloc} getTrackedCountries={this.getTrackedCountries} trackedCountries={this.state.trackedCountries} loading={this.state.loading} setLoading={this.setLoading}/>
                  )}/>
                ))}
                <Route path='/countries/:country' exact component={CountryDetails} />
              </div>
            </div>
          </header>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
