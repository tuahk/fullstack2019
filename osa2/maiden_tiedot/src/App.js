import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryFilter = props => (
  <div>
    Find countries <input onChange={props.onChange} />
  </div>
);

const Languages = ({ languages }) => {
  let lang = languages.map(language => (
    <li key={language.iso639_2}>{language.name}</li>
  ));
  return <ul>{lang}</ul>;
};

const WeatherIcon = ({ weather }) => {
  if (weather.weather_icons) {
    return (
      <img src={weather.weather_icons[0]} width='150' alt='weather image' />
    );
  } else {
    return <div></div>;
  }
};

const WeatherData = ({ country }) => {
  const [weather, setWeather] = useState({});

  let access_key = '06bc3c79fb5a806335651cbc8cfe5577';
  let url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${country.name}`;
  console.log(url);
  useEffect(() => {
    axios.get(url).then(response => {
      setWeather(response.data.current);
    });
  }, []);
  return (
    <div>
      <h2>{`Weather in ${country.name}`}</h2>
      <p>temperature: {weather.temperature} celcius</p>
      <WeatherIcon weather={weather} />
      <p>wind: {weather.wind_speed}</p>
    </div>
  );
};

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name} </h1>
      <div>capital {country.capital}</div>
      <div> population {country.population}</div>
      <h2>Languages</h2> <Languages languages={country.languages} />
      <img src={country.flag} width='150' alt={`Flag of ${country.name}`} />
      <WeatherData country={country} />
    </div>
  );
};

const CountryList = props => {
  if (props.countries.length === 1) {
    return <Country country={props.countries[0]} />;
  } else if (props.countries.length <= 10) {
    return props.countries.map(country => (
      <div key={country.alpha3Code}>
        {country.name}
        <button value={country.name} onClick={props.handleCountrySelection}>
          show
        </button>
      </div>
    ));
  } else {
    return 'Too many matches, specify another filter';
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [visibleCountries, setVisibleCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = event => {
    let visible = countries.filter(country => {
      return country.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setVisibleCountries(visible);
  };

  const handleCountrySelection = event => {
    let name = event.target.value;
    let country = countries.filter(country => country.name === name)[0];
    setVisibleCountries([country]);
  };

  return (
    <div>
      <h1>Country finder</h1>
      <CountryFilter onChange={handleFilterChange} />
      <CountryList
        countries={visibleCountries}
        handleCountrySelection={handleCountrySelection}
      />
    </div>
  );
}

export default App;
