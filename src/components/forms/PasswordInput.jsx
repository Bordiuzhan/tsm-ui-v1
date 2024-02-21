const PasswordInput = ({register, errors, isRequired = true}) => {
    const minLength = 3;
    const maxLength = 52;
    const validateNoSpaces = (value) => {
        return !/\s/.test(value) || "Spaces are not allowed in the password";
    };


    return (<div className="mb-3">
        <label className="text-normal text-dark form-label">Password</label>

        <input
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Password"
            {...register('password', {
                required: {value: isRequired, message: 'Password is required'},
                minLength: {
                    value: minLength, message: `Password must be at least ${minLength} characters long`
                },
                maxLength: {value: maxLength, message: `Password must be at most ${maxLength} characters long`},
                validate: validateNoSpaces,
            })}
        />
        {errors.password && <span className="invalid-feedback ">{errors.password.message}</span>}
    </div>);
};

export default PasswordInput;
