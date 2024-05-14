
import '../../../globals.css';

import './fmtable.css';



interface FmTableProps {

    className?: string;
    columns: any;
    data: any;
}



export default function FmTable(props: FmTableProps) {
    return (
        <table className={"fm-table " + props.className}>
            <thead>
                <tr>
                    {props.columns.map((column: any) => (
                        <th key={column.key}>{column.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {props.data.map((row: any) => (
                    <tr key={row.id}>
                        {props.columns.map((column: any) => (
                            <td key={column.key}>{row[column.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}