'use client'

import React from 'react'
import TableLeave from './table-leave'
import { useSession } from 'next-auth/react'

function TableLeaveAuth() {
  const session = useSession()

  let tableContent: React.ReactNode
  if (session.status === 'loading') {
    tableContent = null
  } else if (session.data?.user) {
    tableContent = <TableLeave />
  } else {
    tableContent = (
      <div className="flex justify-center align-center w-full">
        <p className="text-slate-500">
          You must be logged in to see your leaves
        </p>
      </div>
    )
  }
  return tableContent
}

export default TableLeaveAuth
