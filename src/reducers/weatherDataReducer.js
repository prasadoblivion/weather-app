const initialWeatherData = [
  {
    city: "Bangalore",
    weatherData: {},
    tempFormat: "metric",
    showLoader: true
  }
];

const weatherDataReducer = (state = initialWeatherData, action) => {
  if (action.type === "SEARCH_TEXT_CHANGED") {
    return [{ city: action.payload.searchText, weatherData: { ...action.payload.fetchedData }, tempFormat: state[0].tempFormat, showLoader: false }];
  }

  if (action.type === "CURRENT_WEATHER_DATA_FETCHED") {
    return [{ city: action.payload.name, weatherData: { ...action.payload }, tempFormat: state[0].tempFormat, showLoader: false }];
  }

  if (action.type === "SHOW_LOADER") {
    return [{ city: state[0].city, weatherData: { ...state[0].weatherData }, tempFormat: state[0].tempFormat, showLoader: true }];
  }

  if (action.type === "HIDE_LOADER") {
    return [{ city: state[0].city, weatherData: { ...state[0].weatherData }, tempFormat: state[0].tempFormat, showLoader: false }];
  }

  if (action.type === "CHANGE_TEMP_FORMAT") {
    return [{ city: state[0].city, weatherData: { ...action.payload[1] }, tempFormat: action.payload[0], showLoader: false }];
  }

  return state;
};

export default weatherDataReducer;
