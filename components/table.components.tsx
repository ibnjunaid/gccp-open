type TableProp = {
  headers: string[];
  data: string[][]
}
const colors = [" bg-gradient-to-r from-rose-100 via-fuchsia-500 to-indigo-500", " Pastel bg-gradient-to-tr from-orange-100 to-violet-500", " bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-fuchsia-100 via-green-400 to-rose-700"];
const emogies = ['👑', '✨', '💫']

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
                        {/* <th >
                          {emogies[i]}
                        </th> */}
                        <tr key={i} className={'border-solid border-2  border-indigo-200 hover:bg-sky-400 p-2 m-4 cursor-pointer' + colors[i]} >
                          <th >{emogies[i] || i} </th>
                          {
                            entry.map((val, j) => <th key={j} className=' sm:text-xs md:text-xl  lg:text-xl text-sm'>{val}</th>)
                          }
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