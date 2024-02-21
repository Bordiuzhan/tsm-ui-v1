import CheckedSvg from "../../svg/CheckedSvg";
import XSvg from "../../svg/XSvg";

export const columnsUnits = (openModal) => [{
    header: "Active", accessorKey: "active", width: 60, minWidth: 60, maxWidth: 60, cell: ({cell}) => {
        const value = cell.row.original.active === 1;
        return (<div className="w-1r m-auto">
            {value ? <CheckedSvg value={true} color={"text-success"}/> : <XSvg/>}
        </div>)
    }
}, {
    header: "Make/Model", accessorKey: "model", width: 100, minWidth: 100
}, {
    header: "Unit Namber", accessorKey: "pu_number", width: 130, minWidth: 100
}, {
    header: "Vehicle ID Number", accessorKey: "vehicle_id_number", width: 200, minWidth: 200
}, {
    header: "Trailer Number", accessorKey: "trailer.trailer_number", width: 150, minWidth: 100
}, {
    header: "Licence Plate", accessorKey: "license_plate", width: 150, minWidth: 150
}, {
    header: "Licence Plate Expiration", accessorKey: "license_plate_expiration", width: 200, minWidth: 200
}, {
    header: "Action", accessorKey: "action", cell: ({cell}) => <div className="d-flex">
        <button
            className="border-0 bg-white link-primary text-decoration-underline link-underline-opacity-0-hover bg-transparent"
            type="button" onClick={() => openModal(cell.row.original)}>Change
        </button>
        <button
            className="border-0 bg-white link-danger text-decoration-underline link-underline-opacity-0-hover bg-transparent"
            type="button" onClick={() => {
        }}>Delete
        </button>
    </div>, width: 180,
},]
