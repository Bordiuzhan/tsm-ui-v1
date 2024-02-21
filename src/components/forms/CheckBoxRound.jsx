function CheckBoxRound({register, data}) {
    return (
        <div className="mb-3">
            <label className="text-normal text-dark form-label">Status</label>
            <div className="d-flex">
                <div className="form-check form-switch">
                    <input className="form-check-input"
                           type="checkbox"
                           id="flexSwitchCheckChecked"
                           {...register("status")}
                    />
                    <label className="form-check-label"
                           htmlFor="flexSwitchCheckChecked">{data("status") ? "Active" : "Inactive"}</label>
                </div>
            </div>
        </div>
    );
}

export default CheckBoxRound;

