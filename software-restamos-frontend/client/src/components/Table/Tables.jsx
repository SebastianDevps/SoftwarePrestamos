import React from 'react'
import "./Table.scss"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Tables = () => {
    const rows = [
        {
            id: 1143155,
            nombre: "Juan",
            apellido: "Smith",
            cedula: "15123112121",
            cuotas: "14",
            saldo: "$ 1,500.000",
            saldoTotal: "$ 1,500.000",
            status: "Pagado",
        },
        {
            id: 1143155,
            nombre: "Juan",
            apellido: "Smith",
            cedula: "15123112121",
            cuotas: "14",
            saldo: "$ 1,500.000",
            saldoTotal: "$ 1,500.000",
            status: "Pendiente",
        }
    ];
    return (
        <div className="table">
            <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple-table">
                <TableHead >
                    <TableRow className='td-head'>
                        <TableCell className="tableCell">Nombre</TableCell>
                        <TableCell className="tableCell">Apellido</TableCell>
                        <TableCell className="tableCell">Cedula</TableCell>
                        <TableCell className="tableCell">Cantidad de cuotas</TableCell>
                        <TableCell className="tableCell">Saldo A Pagar</TableCell>
                        <TableCell className="tableCell">Total General</TableCell>
                        <TableCell className="tableCell">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody className='td-body'>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell className="tableCell">{row.nombre}</TableCell>
                            <TableCell className="tableCell">
                                <div className="cellWrapper">
                                    {row.apellido}
                                </div>
                            </TableCell>
                            <TableCell className="tableCell">{row.cedula}</TableCell>
                            <TableCell className="tableCell">{row.cuotas}</TableCell>
                            <TableCell className="tableCell">{row.saldo}</TableCell>
                            <TableCell className="tableCell">{row.saldoTotal}</TableCell>
                            <TableCell className="tableCell">
                                <span className={`status ${row.status}`}>{row.status}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
};

export default Tables
