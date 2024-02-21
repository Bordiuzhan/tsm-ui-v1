import React, { useState } from "react";
import AngleUpSvg from "../svg/AngleUpSvg";
import AngleDownSvg from "../svg/AngleDownSvg";
import SmoothCollapse from "react-smooth-collapse";

function CustomizeUnitsCustomer({ register }) {
  const [isOpenCustomizeUnits, setIsOpenCustomizeUnits] = useState(false);

  return (
    <div>
      <div
        className="bg-body-secondary px-3 py-1 d-flex justify-content-between align-items-center rounded-2"
        onClick={() => setIsOpenCustomizeUnits(!isOpenCustomizeUnits)}
      >
        <h5 className="m-0">Customize units of Measurement (Optional)</h5>
        {isOpenCustomizeUnits ? <AngleUpSvg /> : <AngleDownSvg />}
      </div>
      <SmoothCollapse
        expanded={isOpenCustomizeUnits}
        heightTransition="0.3s ease"
      >
        <div>
          <div className="d-flex justify-content-between flex-column flex-lg-row">
            <div className="w-100 me-3 my-3">
              <label htmlFor="weight_unit">Weight Unit</label>
              <select
                className="form-select"
                id="weight_unit"
                {...register("weight_unit")}
              >
                <option value="">Select</option>
                <option value="lbs">lbs</option>
                <option value="kg">kg</option>
              </select>
            </div>
            <div className="w-100 me-3 my-3">
              <label htmlFor="distance_unit">Distance Unit</label>
              <select
                className="form-select"
                id="distance_unit"
                {...register("distance_unit")}
              >
                <option value="">Select</option>
                <option value="mi">mi</option>
                <option value="km">km</option>
              </select>
            </div>
            <div className="w-100 my-3">
              <label htmlFor="temperature_unit">Temperature Unit</label>
              <select
                className="form-select"
                id="temperature_unit"
                {...register("temperature_unit")}
              >
                <option value="">Select</option>
                <option value="f">F</option>
                <option value="c">C</option>
              </select>
            </div>
          </div>
        </div>
      </SmoothCollapse>
    </div>
  );
}

export default CustomizeUnitsCustomer;
