'use client'

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  Skeleton,
  CircularProgress,
} from '@nextui-org/react'
import React, { useEffect } from 'react'
import type { Leave } from '../../types'
import { useSession } from 'next-auth/react'

const headers = ['Année', 'Acquis', 'Pris', 'Reliquat']

function TableLeave() {
  const [data, setData] = React.useState<Leave[]>([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api')
      const responseJson = await response.json()
      setData(responseJson)
    }
    fetchData()
  }, [data, setData])

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        {headers.map((header, idx) => (
          <TableColumn key={idx}>{header}</TableColumn>
        ))}
      </TableHeader>
      <TableBody
        emptyContent={
          <div className="flex justify-center align-center w-full">
            <CircularProgress color="danger" label="Loading..." />
          </div>
        }
      >
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
