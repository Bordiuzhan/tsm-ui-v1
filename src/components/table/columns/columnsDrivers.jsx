import CheckedSvg from "../../svg/CheckedSvg";
import XSvg from "../../svg/XSvg";


export const columnsDrivers = (openModal) => [{
    header: "Active", accessorKey: "active", width: 60, minWidth: 60, maxWidth: 60, cell: ({cell}) => {
        const value = cell.row.original.active === 1;
        return (<div className="w-1r m-auto">
            {value ? <CheckedSvg value={true} color={"text-success"}/> : <XSvg/>}
        </div>)
    },
}, {
    header: "Name", accessorFn: (row) => row.first_name + " " + row.last_name,
    cell: ({cell}) => {
        return cell.row.original.first_name + " " + cell.row.original.last_name
    }, width: 180, minWidth: 180
}, {
    header: "Email", accessorKey: "email", width: 200, minWidth: 200
}, {
    header: "License Unit", accessorKey: "license_expires_at", width: 150, minWidth: 150
}, {
    header: "Address", accessorKey: "address", width: 250, minWidth: 200
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
    </div>, width: 120
},]