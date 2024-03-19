"use client";
import { ActionTypes } from "../constants/action-types";
import { axios } from "axios";
import { toast } from "react-hot-toast";

const a = process.env.API_KEY;

export const fetchCurrentData = (location) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.CURRENT_DATA });
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (response.status === 404) {
        toast.error("city is incorrect");
      }
      const result = res.json();
      return result;
    } catch (error) {
      throw error;
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
      if (response.status === 404) {
        toast.error("city is incorrect");
      }
      const result = res.json();
      return result;
    } catch (error) {
      throw error;
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
      if (response.status === 404) {
        toast.error("city is incorrect");
      }
      const result = res.json();
      return result;
    } catch (error) {
      throw error;
    }
  };
};

export const fetchForacastData = (city) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FORECAST });
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (response.status === 404) {
        toast.error("city is incorrect");
      }
      const result = res.json();
      return result;
    } catch (error) {
      throw error;
    }
  };
};

export const forecastDataMetric = (city) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FORECAST_METRIC });
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (response.status === 404) {
        toast.error("city is incorrect");
      }
      const result = res.json();
      return result;
    } catch (error) {
      throw error;
    }
  };
};

export const forecastDataImperial = (city) => {
  return async (dispatch) => {
    dispatch({ type: ActionTypes.FORECAST_IMPERIAL });
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (response.status === 404) {
        toast.error("city is incorrect");
      }
      const result = res.json();
      return result;
    } catch (error) {
      throw error;
    }
  };
};
