const initialWeatherData = [
  {
    city: "Bangalore",
    weatherData: {}
  }
];

const weatherDataReducer = (state = initialWeatherData, action) => {
  if (action.type === "SEARCH_TEXT_CHANGED") {
    return [{ city: action.payload.searchText, weatherData: { ...action.payload.fetchedData } }];
  }

  if (action.type === "CURRENT_WEATHER_DATA_FETCHED") {
    return [{ city: state[0].city, weatherData: { ...action.payload } }];
  }

  return state;
};

export default weatherDataReducer;
