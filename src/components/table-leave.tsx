'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
} from '@nextui-org/react'
import React from 'react'

const headers = ['Année', 'Acquis', 'Pris', 'Reliquat']
const data = [
  {
    year: 2023,
    acquired: 4,
    taken: 4,
    balance: 0,
  },
]
function TableLeave() {
  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        {headers.map((header, idx) => (
          <TableColumn key={idx}>{header}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {data.map((row, idx) => (
          <TableRow key={idx}>
            <TableCell>{row.year}</TableCell>
            <TableCell>
              <p>{row.acquired}</p>
            </TableCell>
            <TableCell>
              <p className="text-danger-600">{row.taken}</p>
            </TableCell>
            <TableCell>
              <p className="text-success-600">{row.balance}</p>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableLeave
