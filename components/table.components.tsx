type TableProp = {
  headers: string[];
  data: string[][]
}
const emogies = ['', '👑', '✨', '💫']

export default function Table(props: TableProp) {
  return (

    <>
      <div className="relative flex flex-col  sm:p-0 md:p-0 lg:p-0 m-auto md:w-11/12  lg:text-xl text-xs
        overflow-hidden   ">
        <div className="overflow-x-auto">
          <div className=" inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center ">
                {/* <!-- head --> */}
                <thead >
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
                      return <>
                        <tr key={i} className={'border-solid border-2  border-indigo-200 hover:bg-sky-400 p-2 m-4 cursor-pointer '
                          + `${(entry[1] === 'Yes') ? 'bg-green-700' : ''}`} >
                          <th >{emogies[i + 1] || i + 1} </th>
                          {
                            entry.map((val, j) => {
                              return (
                                <th key={j} className={`sm:text-xs md:text-xl  lg:text-xl text-sm `}> {
                                  val === 'Yes' ? '✅' : (val === 'No' ? '🐌' : val)
                                }</th>)
                            }
                            )}
                        </tr></>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}