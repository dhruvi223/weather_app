"use client";
import { useState } from "react";
import { fetchForacastData } from "@/redux/actions/weatherAction";
import { forecastDataMetric } from "@/redux/actions/weatherAction";
import { forecastDataImperial } from "@/redux/actions/weatherAction";
import { useDispatch } from "react-redux";
import { format, parseISO } from "date-fns";

function ForcastData(props) {
  const city = props.location;

  const dispatch = useDispatch();
  const [forecastData, setForecastData] = useState({});
  const [forecastMData, setForecastMData] = useState({});
  const [forecastIData, setForecastIData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("Kelvin");

  const handleClick = async () => {
    const data = await dispatch(fetchForacastData(city));
    setForecastData(data);
    const datam = await dispatch(forecastDataMetric(city));
    setForecastMData(datam);
    const datai = await dispatch(forecastDataImperial(city));
    setForecastIData(datai);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleUnitSelection = (unit) => {
    setSelectedUnit(unit);
    setIsOpen(false);
  };

  const forecast = forecastData.list;
  const forecastm = forecastMData.list;
  const forecasti = forecastIData.list;

  return (
    <div>
      <button
        className="flex justify-start text-md bold bg-gray-300 border rounded-lg p-2 my-4"
        onClick={handleClick}
      >
        show hourly forecast
      </button>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
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
                    {format(parseISO(forecast[key].dt_txt ?? ""), "dd.MM.yyyy")}
                  </p>
                  <p className="inline pr-2 text-xs">
                    {format(parseISO(forecast[key].dt_txt ?? ""), "hh:mm:ss")}
                  </p>
                </div>

                <div>
                  <p className="flex gap-1 text-sm ">
                    {selectedUnit === "Fahrenheit" &&
                    forecastm !== undefined ? (
                      Object.keys(forecastm).map((key) => (
                        <p>{forecastm[key].main.temp}</p>
                      ))
                    ) : selectedUnit === "Celsius" &&
                      forecasti !== undefined ? (
                      Object.keys(forecasti).map((key) => (
                        <p>{forecasti[key].main.temp}</p>
                      ))
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
                          <button onClick={() => handleUnitSelection("Kelvin")}>
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
