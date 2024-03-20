"use client";
import { ActionTypes } from "../constants/action-types";
import { toast } from "react-hot-toast";

export const fetchCurrentData = (location) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.CURRENT_DATA });
    console.log('called');
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (res.status === 404) {
        toast.error("city is incorrect");
      }

      if (res.status === 500) {
        toast.error("server error");
      }

      const result = res.json();
      return result;
    } catch (error) {
     if (error.message === 'Network Error' && !error.response){
            toast.error('Network Error')
       }
    }
  };
};

export const fetchCurrentDataMetric = (location) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.CURRENT_DATA_METRIC });
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (res.status === 404) {
        toast.error("city is incorrect");
      }

      if (res.status === 500) {
        toast.error("server error");
      }

      const result = res.json();
      console.log(result);
      return result;
    } catch (error) {
      if (error.message === 'Network Error' && !error.response){
           toast.error('Network Error')
      }
    }
  };
};

export const fetchCurrentDataImperial = (location) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.CURRENT_DATA_IMPIRIAL });
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (res.status === 404) {
        toast.error("city is incorrect");
      }

      if (res.status === 500) {
        toast.error("server error");
      }

      const result = res.json();
      return result;
    } catch (error) {
        if (error.message === 'Network Error' && !error.response){
            toast.error('Network Error')
       }
    }
  };
};

export const fetchForacastData = (location) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FORECAST });
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (res.status === 404) {
        toast.error("city is incorrect");
      }

      if (res.status === 500) {
        toast.error("server error");
      }

      const result = res.json();
      return result;
    } catch (error) {
     if (error.message === 'Network Error' && !error.response){
            toast.error('Network Error')
       }
    }
  };
};

export const forecastDataMetric = (location) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FORECAST_METRIC });
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (res.status === 404) {
        toast.error("city is incorrect");
      }

      if (res.status === 500) {
        toast.error("server error");
      }

      const result = res.json();
      return result;
    } catch (error) {
      throw error;
    }
  };
};

export const forecastDataImperial = (location) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FORECAST_IMPERIAL });
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=imperial&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (res.status === 404) {
        toast.error("city is incorrect");
      }

      if (res.status === 500) {
        toast.error("server error");
      }

      const result = res.json();
      return result;
    } catch (error) {
        if (error.message === 'Network Error' && !error.response){
            toast.error('Network Error')
       }
    }
  };
};
