export const columnsUser = (openModal) => [{
    header: 'ID', accessorKey: 'id', width: 60, minWidth: 60,
}, {
    header: 'Name', accessorKey: 'name', width: 300, minWidth: 200,
}, {
    header: 'Email', accessorKey: 'email', width: 350, minWidth: 200,
}, {
    header: 'Status', accessorKey: 'status', minWidth: 120, maxWidth: 150,
}, {
    header: 'Roles', accessorKey: 'role', minWidth: 140, maxWidth: 150, cell: ({cell}) => {
        cell.row.original.role.map((role) => {
            return role
        })
    }
}, {
    header: 'Action',
    accessorKey: 'action',
    maxWidth: 100,
    cell: ({cell}) => <div className="d-flex justify-content-around">
        <button
            className="border-0 link-primary text-decoration-underline link-underline-opacity-0-hover bg-transparent"
            type="button"
            onClick={() => openModal(cell.row.original)}>Change
        </button>
    </div>,
},];

