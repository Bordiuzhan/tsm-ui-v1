export const columnsCustomers = (openModal) => [{
    header: "ID", accessorKey: "id", width: 60, minWidth: 60,
}, {header: "Company Name", accessorKey: "name", width: 250, minWidth: 200}, {
    header: "Address", accessorKey: "line1", width: 300, minWidth: 200, cell: ({cell}) => {
        return cell.row.original.line1 + " " + cell.row.original.country;
    },
}, {
    header: "Primary Contact",
    accessorFn: (row) => row.contacts.find((contact) => contact.primary).name,
    minWidth: 150,
    maxWidth: 200,
}, {
    header: "Primary Phone",
    accessorFn: (row) => row.contacts.find((contact) => contact.primary).phone,
    minWidth: 140, maxWidth: 150, cell: ({cell}) => {
        return cell.row.original.contacts.map((contact) => contact.primary ? contact.phone : null);
    },
}, {
    header: "Action",
    accessorKey: "action",
    maxWidth: 100,
    cell: ({cell}) => (<div className="d-flex justify-content-around">
        <button
            className="border-0 bg-white link-primary text-decoration-underline link-underline-opacity-0-hover bg-transparent"
            type="button"
            onClick={() => openModal(cell.row.original)}
        >
            Change
        </button>
        <span>|</span>
        <button
            className="border-0 bg-white link-danger text-decoration-underline link-underline-opacity-0-hover bg-transparent"
            type="button"
            onClick={() => {
            }}
        >
            Delete
        </button>
    </div>),
},];
