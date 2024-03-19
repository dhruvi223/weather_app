"use client";

import { fetchCurrentData } from "@/redux/actions/weatherAction";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { fetchCurrentDataImperial } from "@/redux/actions/weatherAction";
import { fetchCurrentDataMetric } from "@/redux/actions/weatherAction";

function FetchData(props) {
  const dispatch = useDispatch();
  console.log(props);
  const [currentData, setCurrentData] = useState({});
  const [location, setLocation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("Kelvin");
  const [imperial, setImperial] = useState();
  const [metric, setMetric] = useState();


  const searchLocation = async (event) => {
    if (event.key === `Enter`) {
      const data = await dispatch(fetchCurrentData(location));
      const datam = await dispatch(fetchCurrentDataMetric(location))
      const datai = await dispatch(fetchCurrentDataImperial(location))
      console.log(data);
      setCurrentData(data);
      setMetric(datam)
      setImperial(datai)
      console.log(data.main.humidity);
      // setTemp(data.main.temp);
    }
    // setLocation('')
  };

  console.log(currentData);
  console.log(currentData.name);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleUnitSelection = (unit) => {
    setSelectedUnit(unit);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="">
        <input className="bold bg-white border rounded-lg p-2 my-0"
          placeholder="search location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          type="text"
        />

        <div className="flex justify-start text-lg bold bg-gray-300 border rounded-lg p-2 my-4">Current weather</div>
        <h2>{currentData.name}</h2>
      
    <div className="flex flex-col gap-2 bg-gray-300 border rounded-lg p-2 m-3">
        {currentData.main ? (
          <div>
            <div>
              <p className="flex gap-1 text-sm ">
                {selectedUnit === "Fahrenheit" ? (
                  <p>{imperial.main.temp}</p>
                ) : selectedUnit === "Celsius" ? (
                  <p>{metric.main.temp}</p>
                  ) : selectedUnit === "Kelvin" ? (
                    <p>{currentData.main.temp}</p>
                ) : (
                  <p></p>
                )}


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

              <div className="dropdown dropdown-bottom inline">
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

            <p>humidity:{currentData.main.humidity}</p>
            <p>pressure:{currentData.main.pressure}</p>
          </div>
        ) : null}

        {currentData.wind ? (
          <div className="flex gap-1 text-sm items-center">
            <p>wind-speed:{currentData.wind.speed}</p>
          </div>
        ) : null}

        {currentData.weather ? (
          <div className="flex gap-1 text-sm items-end">
            <p>{currentData.weather[0].description}</p>
          </div>
        ) : null}
        </div>
      
    </div>
    </div>
  );
}

export default FetchData;
