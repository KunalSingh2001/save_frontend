function Table({ data = [], columns = [], actions }) {
    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        {columns.map((col, index) => (
                            <th key={index}>{col.label}</th>
                        ))}
                        {actions && <th>Actions</th>}
                    </tr>
                </thead>

                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length + (actions ? 2 : 1)}
                                className="text-center"
                            >
                                No data found
                            </td>
                        </tr>
                    ) : (
                        data.map((row, index) => (
                            <tr key={row.id || index}>
                                <td>{index + 1}</td>

                                {columns.map((col, i) => (
                                    <td key={i}>
                                        {typeof col.render === "function"
                                            ? col.render(row)
                                            : row[col.key]}
                                    </td>
                                ))}

                                {actions && <td>{actions(row)}</td>}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
