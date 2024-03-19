'use client'
import { ActionTypes } from "../constants/action-types";
import { axios } from "axios";

export const fetchCurrentData = (location) => {
    return async (dispatch) => {
        dispatch({ type: ActionTypes.CURRENT_DATA });
        console.log(location);
        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1df92bedf5694a811bb258ae1d8d608c`
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=3006c08ec8a9a91f059c600608336761`)
        // setCurrentData(res)
        const result = res.json()
        console.log(result);
        return result;
    };

}

export const fetchCurrentDataMetric = (location) => {
    return async (dispatch) => {
        dispatch({ type: ActionTypes.CURRENT_DATA_METRIC });
        console.log(location);
        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1df92bedf5694a811bb258ae1d8d608c`
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=3006c08ec8a9a91f059c600608336761`)
        // setCurrentData(res)
        const result = res.json()
        console.log(result);
        return result;
    };

}


export const fetchCurrentDataImperial = (location) => {
    return async (dispatch) => {
        dispatch({ type: ActionTypes.CURRENT_DATA_IMPIRIAL });
        console.log(location);
        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1df92bedf5694a811bb258ae1d8d608c`
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=3006c08ec8a9a91f059c600608336761`)
        // setCurrentData(res)
        const result = res.json()
        console.log(result);
        return result;
    };

}

export const fetchForacastData = (city) => {
    return async (dispatch) => {
        dispatch({ type: ActionTypes.FORECAST });
        console.log(city);
        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1df92bedf5694a811bb258ae1d8d608c`
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3006c08ec8a9a91f059c600608336761`)
        // setCurrentData(res)
        const result = res.json()
        console.log(result);
        return result;
    };

}

export const forecastDataMetric = (city) => {
    return async (dispatch) => {
        dispatch({ type: ActionTypes.FORECAST_METRIC });
        console.log(city);
        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1df92bedf5694a811bb258ae1d8d608c`
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=3006c08ec8a9a91f059c600608336761`)
        // setCurrentData(res)
        const result = res.json()
        console.log(result);
        return result;
    };

}

export const forecastDataImperial = (city) => {
    return async (dispatch) => {
        dispatch({ type: ActionTypes.FORECAST_IMPERIAL });
        console.log(city);
        // const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=1df92bedf5694a811bb258ae1d8d608c`
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=3006c08ec8a9a91f059c600608336761`)
        // setCurrentData(res)
        const result = res.json()
        console.log(result);
        return result;
    };

}