"use client";
import React from "react";
import { useState } from "react";
import { fetchForacastData } from "@/redux/actions/weatherAction";
import { forecastDataMetric } from "@/redux/actions/weatherAction";
import { forecastDataImperial } from "@/redux/actions/weatherAction";
import { useDispatch } from "react-redux";
import { format, formatDistance, parseISO } from "date-fns";

function ForcastData() {
  const dispatch = useDispatch();
  const [forecastData, setForecastData] = useState({});
  const [forecastMData, setForecastMData] = useState({});
  const [forecastIData, setForecastIData] = useState({});
  const [city, setCity] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("Fahrenheit");

  const searchLocation = async (event) => {
    if (event.key === `Enter`) {
      const data = await dispatch(fetchForacastData(city));
      console.log(data);
      setForecastData(data);
      const datam = await dispatch(forecastDataMetric(city));
      setForecastMData(datam);
      const datai = await dispatch(forecastDataImperial(city));
      setForecastIData(datai);
      // setTemp(data.main.temp);
    }
    // setLocation('')
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleUnitSelection = (unit) => {
    setSelectedUnit(unit);
    setIsOpen(false);
  };

  const forecast = forecastData.list;
  console.log(forecast);

  const forecastm = forecastMData.list;
  const forecasti = forecastIData.list;
  console.log(forecast);


  return (
    <div>
      <input
        placeholder="search location"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        onKeyPress={searchLocation}
        type="text"
      />
      {/* <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"> */}
      <div className="grid grid-cols-3 gap-2">
          {forecast !== undefined ? (
            Object.keys(forecast).map((key) => (
              <div
                key={key}
                className="inline bg-gray-300 border rounded-lg p-2 m-3 w-52"
              >
                <div>

                  <div classname="flex flex-col">
                    <p className="inline pr-2 text-xs">
                      {format(parseISO(forecast[key].dt_txt ?? ""), "EEEE")}
                    </p>
                    <p className="inline pr-2 text-xs">
                      {format(
                        parseISO(forecast[key].dt_txt ?? ""),
                        "dd.MM.yyyy"
                      )}
                    </p>
                    <p className="inline pr-2 text-xs">
                      {format(parseISO(forecast[key].dt_txt ?? ""), "hh:mm:ss")}
                    </p>
                  </div>


                  <div>
                    <p className="flex gap-1 text-sm ">
                      {selectedUnit === "Fahrenheit" ? (
                        <p>{forecast[key].main.temp}</p>
                      ) : selectedUnit === "Celsius" ? (
                        <p>{forecast[key].main.temp}</p>
                      ) : selectedUnit === "Kelvin" ? (
                        <p>{forecast[key].main.temp}</p>
                      ) : null}

                      {selectedUnit === "Fahrenheit" ? (
                        <p>F</p>
                      ) : selectedUnit === "Celsius" ? (
                        <p>C</p>
                      ) : selectedUnit === "Kelvin" ? (
                        <p>K</p>
                      ) : (
                        <p></p>
                      )}
                    </p>
                    <div className="dropdown dropdown-bottom inline text-xs">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn m-1"
                        onClick={toggleDropdown}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            toggleDropdown();
                          }
                        }}
                      >
                        {selectedUnit || "Select"}
                      </div>
                      {isOpen && (
                        <ul
                          tabIndex={0}
                          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                          <li>
                            <button
                              onClick={() => handleUnitSelection("Fahrenheit")}
                            >
                              Fahrenheit
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleUnitSelection("Celsius")}
                            >
                              Celsius
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => handleUnitSelection("Kelvin")}
                            >
                              Kelvin
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                  <p>humidity: {forecast[key].main.humidity}</p>
                  <p>pressure: {forecast[key].main.pressure}</p>
                </div>
                {/* )} */}

                <div>
                  <p className="text-sm">
                    wind-speed: {forecast[key].wind.speed}
                  </p>
                </div>

                <div>
                  <p className="text-sm">
                    {forecast[key].weather[0].description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p></p>
          )}
      </div>
    </div>
  );
}

export default ForcastData;
