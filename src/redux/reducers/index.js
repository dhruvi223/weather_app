import { combineReducers } from "redux";
import { currentDataReducer } from "./weatherReducer";
import { currentDataMReducer } from "./weatherReducer";
import { currentDataIReducer } from "./weatherReducer";
import { forecastReducer } from "./weatherReducer";
import { forecastDataMetric } from "../actions/weatherAction";
import { forecastDataImperial } from "../actions/weatherAction";

const reducers = combineReducers({
  currentData: currentDataReducer,
  currentMData: currentDataMReducer,
  currentIData: currentDataIReducer,
  forcastData: forecastReducer,
  forcastMetric: forecastDataMetric,
  forecastImperial: forecastDataImperial,
});

export default reducers;
