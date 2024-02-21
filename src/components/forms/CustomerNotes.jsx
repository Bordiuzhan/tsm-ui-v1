import React, { useState } from "react";
import AngleUpSvg from "../svg/AngleUpSvg";
import AngleDownSvg from "../svg/AngleDownSvg";
import SmoothCollapse from "react-smooth-collapse";

function CustomerNotes({ register }) {
  const [isOpenCustomerNotes, setIsOpenCustomerNotes] = useState(false);

  return (
    <div className="my-2">
      <div
        className="bg-body-secondary px-3 py-1 d-flex justify-content-between align-items-center rounded-2 mb-2"
        onClick={() => setIsOpenCustomerNotes(!isOpenCustomerNotes)}
      >
        <h5 className="m-0">Customer notes</h5>
        {isOpenCustomerNotes ? <AngleUpSvg /> : <AngleDownSvg />}
      </div>
      <SmoothCollapse
        expanded={isOpenCustomerNotes}
        heightTransition="0.5s ease"
      >
        <div className="mb-3">
          <label htmlFor="customerNotes" className="form-label mt-3">
            Private Notes
          </label>
          <textarea
            className="form-control"
            id="customerNotes"
            rows="2"
            {...register("private_note")}
          ></textarea>

          <label htmlFor="customerNotes" className="form-label mt-3">
            Public Notes
          </label>
          <textarea
            className="form-control"
            id="customerNotes"
            rows="2"
            {...register("public_note")}
          ></textarea>
        </div>
      </SmoothCollapse>
    </div>
  );
}

export default CustomerNotes;
