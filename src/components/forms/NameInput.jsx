import React from 'react';

function NameInput({register, errors,}) {

    const regex = /^[a-zA-Z]+$/
    return (
        <div className="row ">
            <div className="mb-3 col-md-6">
                <label className="text-normal text-dark form-label">First name</label>
                <input
                    type="text"
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                    placeholder="Username"
                    {...register("firstName", {
                            required: {value: true, message: "First name is required"},
                            pattern: {
                                value: regex, message: "Invalid first name format"
                            }

                        }
                    )}
                />
                {errors.firstName && (<span className="invalid-feedback ">{errors.firstName.message}</span>)}
            </div>
            <div className="mb-3 col-md-6">
                <label className="text-normal text-dark form-label">Last name</label>
                <input
                    type="text"
                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                    placeholder="Username"
                    {...register("lastName", {
                            required: {value: true, message: "Last name is required"},
                            pattern: {
                                value: regex, message: "Invalid last name format"
                            }

                        }
                    )}
                />
                {errors.lastName && (<span className="invalid-feedback ">{errors.lastName.message}</span>)}
            </div>

        </div>
    );
}

export default NameInput;