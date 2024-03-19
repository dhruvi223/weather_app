import { ActionTypes } from "../constants/action-types";

const initialState = {
  weather: [],
};

export const currentDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CURRENT_DATA:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const currentDataMReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CURRENT_DATA_METRIC:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const currentDataIReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CURRENT_DATA_IMPIRIAL:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const forecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FORECAST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const forecastMetricReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FORECAST_METRIC:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const forecastImperialReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FORECAST_IMPERIAL:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
