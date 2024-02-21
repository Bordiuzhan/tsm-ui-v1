function EmailInput({register, errors, titleForm = "User Name"}) {
    return (
        <div className="mb-3">
            <label className="text-normal text-dark form-label">{titleForm}</label>
            <input
                type="text"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="email@address.com"
                {...register("email", {
                    /* required: { value: true, message: "Email is required" },
                                                             validate: (value) => validator.isEmail(value) ,*/
                })}
            />
            {errors.email && (
                <span className="invalid-feedback ">{errors.email.message}</span>
            )}
        </div>
    );
}

export default EmailInput;
