"use client";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchCurrentData } from "@/redux/actions/weatherAction";
import { fetchCurrentDataImperial } from "@/redux/actions/weatherAction";
import { fetchCurrentDataMetric } from "@/redux/actions/weatherAction";
import { fetchForacastData } from "@/redux/actions/weatherAction";
import { forecastDataImperial } from "@/redux/actions/weatherAction";
import { forecastDataMetric } from "@/redux/actions/weatherAction";
import { format, parseISO } from "date-fns";

import { FiDroplet } from "react-icons/fi";
import { WiDayCloudy } from "react-icons/wi";
import { MdAir } from "react-icons/md";
import { WiWindDeg } from "react-icons/wi";
import { RiCelsiusFill } from "react-icons/ri";
import { TbTemperatureFahrenheit } from "react-icons/tb";
import { FaTemperatureHigh } from "react-icons/fa";

async function getData(location, dispatch) {
  const data = await dispatch(fetchCurrentData(location));
  const datam = await dispatch(fetchCurrentDataMetric(location));
  const datai = await dispatch(fetchCurrentDataImperial(location));

  const dataf = await dispatch(fetchForacastData(location));
  const datamf = await dispatch(forecastDataMetric(location));
  const dataif = await dispatch(forecastDataImperial(location));
  return { data, datam, datai, dataf, datamf, dataif };
}

export default function FetchData() {
  const [currentData, setCurrentData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("Celsius");
  const [imperial, setImperial] = useState();
  const [metric, setMetric] = useState();
  const [location, setLocation] = useState();
  const [forecastData, setForecastData] = useState({});
  const [forecastMData, setForecastMData] = useState({});
  const [forecastIData, setForecastIData] = useState({});
  const dispatch = useDispatch();

  const searchLocation = async (event) => {
    if (event.key === `Enter`) {
      const { data, datam, datai, dataf, datamf, dataif } = await getData(
        location,
        dispatch
      );
      setCurrentData(data);
      setImperial(datam);
      setMetric(datai);
      setForecastData(dataf);
      setForecastMData(datamf);
      setForecastIData(dataif);
    }
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
      {/* current data */}
      <div className="">
        <input
          className="bold bg-white border rounded-lg p-2 my-0"
          placeholder="search location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          type="text"
        />

        <div className="flex flex-row my-3">
          <p className="flex text-sm pr-3 items-center">
            select temperature unit:{" "}
          </p>
          <div className="dropdown dropdown-bottom bg-white flex">
            <div
              tabIndex={0}
              role="button"
              className="btn m-1 w-15"
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
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-30"
              >
                <li>
                  <button onClick={() => handleUnitSelection("Fahrenheit")}>
                    Fahrenhit
                  </button>
                </li>
                <li>
                  <button onClick={() => handleUnitSelection("Celsius")}>
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
        <div className="text-lg py-4 pl-0 justify-start">Current weather</div>
        <h2>{currentData.name}</h2>

        <div className="w-full bg-blue-100 px-6 gap-8 justify-between overflow-x-auto border rounded-xl flex py-4 shodow-sm">
          <div className="flex flex-row gap-10 py-4">
            {selectedUnit === "Celsius" && imperial !== undefined ? (
              <div className="flex flex-col justify-between gap-8 items-center text-xs font-semibold text-black/80">
                <p className="whitespace-nowrap">Temperature</p>
                <div className="text-3xl">{<FaTemperatureHigh />}</div>

                {imperial.main ? (
                  <div className="flex flex-row">
                    <div className="text-lg flex">{imperial.main.temp}</div>
                    <div className="text-xl flex">{<RiCelsiusFill />}</div>
                  </div>
                ) : null}
              </div>
            ) : selectedUnit === "Fahrenheit" && metric !== undefined ? (
              <div className="flex flex-col justify-between gap-8 items-center text-xs font-semibold text-black/80">
                <p className="whitespace-nowrap">Temperature</p>
                <div className="text-3xl">{<FaTemperatureHigh />}</div>
                {metric.main ? (
                  <div className="flex flex-row">
                    <div className="text-xl flex">{metric.main.temp}</div>
                    <div className="text-xl flex">
                      {<TbTemperatureFahrenheit />}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : selectedUnit === "Kelvin" ? (
              <div className="flex flex-col justify-between gap-8 items-center text-xs font-semibold text-black/80">
                <p className="whitespace-nowrap">Temperature</p>
                <div className="text-3xl">{<FaTemperatureHigh />}</div>
                {currentData.main ? (
                  <div className="text-xl ">{currentData.main.temp}K</div>
                ) : null}
              </div>
            ) : (
              <p></p>
            )}

            <div className="flex flex-col justify-between gap-8 items-center text-xs font-semibold text-black/80">
              <p className="whitespace-nowrap">humidity</p>
              <div className="text-2xl">{<FiDroplet />}</div>
              {currentData.main ? <p>{currentData.main.humidity}</p> : null}
            </div>

            <div className="flex flex-col justify-between gap-8 items-center text-xs font-semibold text-black/80">
              <p className="whitespace-nowrap">wind speed</p>
              <div className="text-3xl">{<MdAir />}</div>
              {currentData.wind ? <p>{currentData.wind.speed}</p> : null}
            </div>

            <div className="flex flex-col justify-between gap-8 items-center text-xs font-semibold text-black/80">
              <p className="whitespace-nowrap">Air Pressure</p>
              <div className="text-3xl">{<WiWindDeg />}</div>
              {currentData.main ? <p>{currentData.main.pressure}</p> : null}
            </div>
          </div>
        </div>
      </div>

      {/* forecast data */}

      <div classname="w-full bg-white border rounded-xl flex py-4 shodow-sm">
        <p className="text-lg py-4 pl-0 justify-start">Hourly forecast</p>

        <div></div>

        <div className=" flex flex-col px-3 max-w-7xl mx-auto gap-20 w-full pb-10 pt-4">
          <div className="">
            {forecast !== undefined ? (
              Object.keys(forecast).map((key) => (
                <div className="w-full bg-blue-100 px-6 gap-8 justify-between overflow-x-auto border rounded-xl flex my-8 shodow-sm ">
                  <div className="flex flex-row gap-7 my-8">
                    <div className="flex flex-col justify-between gap-4 items-center text-xs font-semibold text-black/80">
                      <p className="whitespace-nowrap">
                        {format(parseISO(forecast[key].dt_txt ?? ""), "EEEE")}
                      </p>
                      <p className="whitespace-nowrap">
                        {format(
                          parseISO(forecast[key].dt_txt ?? ""),
                          "dd.MM.yyyy"
                        )}
                      </p>
                      <p className="whitespace-nowrap">
                        {format(
                          parseISO(forecast[key].dt_txt ?? ""),
                          "hh:mm:ss"
                        )}
                      </p>
                      <div className="text-3xl">{<WiDayCloudy />}</div>
                    </div>

                    {selectedUnit === "Celsius" && forecasti !== undefined ? (
                      <div className="flex flex-col justify-between gap-4 items-center text-xs font-semibold text-black/80">
                        <p className="whitespace-nowrap">Temperature</p>
                        <div className="text-3xl">{<FaTemperatureHigh />}</div>
                        {currentData.main ? (
                          <div className="flex flex-row">
                            <div className="text-lg flex">
                              {forecasti[key].main.temp}
                            </div>
                            <div className="text-xl flex">
                              {<RiCelsiusFill />}
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : selectedUnit === "Fahrenheit" &&
                      forecastm !== undefined ? (
                      <div className="flex flex-col justify-between gap-4 items-center text-xs font-semibold text-black/80">
                        <p className="whitespace-nowrap">Temperature</p>
                        <div className="text-3xl">{<FaTemperatureHigh />}</div>
                        <div className="flex flex-row">
                          <div className="text-xl flex">
                            {forecastm[key].main.temp}
                          </div>
                          <div className="text-xl flex">
                            {<TbTemperatureFahrenheit />}
                          </div>
                        </div>
                      </div>
                    ) : selectedUnit === "Kelvin" ? (
                      <div className="flex flex-col justify-between gap-4 items-center text-xs font-semibold text-black/80">
                        <p className="whitespace-nowrap">Temperature</p>
                        <div className="text-3xl">{<FaTemperatureHigh />}</div>
                        <div className="text-xl ">
                          {forecast[key].main.temp}K
                        </div>
                      </div>
                    ) : (
                      <p></p>
                    )}

                    <div className="flex flex-col justify-between gap-4 items-center text-xs font-semibold text-black/80">
                      <p className="whitespace-nowrap">humidity</p>
                      <div className="text-2xl">{<FiDroplet />}</div>
                      <p>{forecast[key].main.humidity}</p>
                    </div>

                    <div className="flex flex-col justify-between gap-4 items-center text-xs font-semibold text-black/80">
                      <p className="whitespace-nowrap">wind speed</p>
                      <div className="text-3xl">{<MdAir />}</div>
                      <p>{forecast[key].wind.speed}</p>
                    </div>

                    <div className="flex flex-col justify-between gap-4 items-center text-xs font-semibold text-black/80">
                      <p className="whitespace-nowrap">Air Pressure</p>
                      <div className="text-3xl">{<WiWindDeg />}</div>
                      <p>{forecast[key].main.pressure}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
