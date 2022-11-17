import * as react from 'react'
import { useState } from 'react';

type TableProp = {
  headers: string[];
  data: string[][]
}

export default function Table(props: TableProp) {
  return (

    <>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* <!-- head --> */}
          <thead>
            <tr>
              <th>Serial</th>
              {
                props.headers.map((header, index) => <th key={index}>{header}</th>)
              }
            </tr>
          </thead>
          <tbody>
            {
              props.data.map((entry, i) => {
                return <tr key={i}>
                  <th>{i}</th>
                  {
                    entry.map((val, j) => <th key={j}>{val}</th>)
                  }
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </>
  )
}