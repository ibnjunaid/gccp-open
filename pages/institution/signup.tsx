import addViewer from '../../utils/newss.png'
import { useEffect, useState } from 'react'
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toast } from "react-toastify";

export default function Signup() {

  const router = useRouter()

  const [instituteId, setinstituteId] = useState<string>('')
  const [checkInstituteRes, setCheckInstitute] = useState<any>({ message: '', available: false })
  const [sheetId, setsheetId] = useState<string>('')
  const [instituteName, setInstituteName] = useState<string>('')
  const [progress, setProgress] = useState<boolean>(false);

  async function setinstituteIdHandler(e: any) {
    setinstituteId(e.target.value)
  }

  async function checkInstitute() {
    if (instituteId !== '') {
      const res = await fetch(`http://192.168.1.4:3000/api/check-institute-id/${instituteId}`)
      if (res.status === 200) {
        const data = await res.json()
        setCheckInstitute(data)
      }
    } else {
      setCheckInstitute({ message: '', available: false })
    }
  }

  async function setSheetIdHandler(e: any) {
    setsheetId(e.target.value)
  }

  async function setInstituteHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '') {
      setCheckInstitute({ message: '', available: false })
    }
    setInstituteName(e.target.value)
  }

  useEffect(() => {
    const debouncedHandler = Debounce(checkInstitute, 900)
    return () => clearTimeout(debouncedHandler)
  }, [instituteId])

  async function registrationHandler() {
    setProgress(true)
    const response = await fetch(`https://gccp.vercel.app/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ instituteId: instituteId, sheetId: sheetId, instituteName: instituteName })
    })

    const data = await response.json()
    // console.log("promise Data ", data)
    if (response.status === 404) {
      toast.error('Please check your sheet Id ❎')
      setProgress(false)
    }
    if (response.status === 400) {
      toast.error('Please add sheets@halogen-data-340911.iam.gserviceaccount.com as viewer on the sheet 🙇')
      setProgress(false)
    }

    else if (data.message === "created") {
      toast.success(data.message + " " + "successfully regsitered : ✅ ,  Redirecting... 🚀🚀")
      router.push(`/${instituteId}`)
    }
  }



  return (
    <>
      <div className="p-2  bg-gradient-to-r
            from-indigo-200 via-red-200 to-indigo-200 max-w-full ">
        <div className="flex justify-center ">
          <div className="col-span-8 sm:col-span-4 ">
            <label className="block text-3xl  text-black-900 mb-3 ">
              Google Sheet ID
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <label className="block text-sm  text-black-900">
            Paste the google sheet id as shown
          </label>
        </div>
        <div className="flex justify-center ">
          <h3 className='p-1 text-xl'>
            https://docs.google.com/spreadsheets/d/
            <span className='bg-red-300  font-extrabold text-fuchsia-900 '>
              1l3PDAGoJhss7PFkfWxPTdbJVhTLlSAau7af0zsbTCqI8
            </span>/edit#gid=0
          </h3>
        </div>

        {/* institute, sheet id and path  */}
        <div className="block  w-8/12 m-auto mt-5 p-1 rounded-xl bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 ">

          <div className="flex  justify-around	text-center	items-center	 xl:mt-10  ">
            {/* for institute Name */}
            <div className="col-span-6 sm:col-span-4">
              <label className="block text-2xl  text-black-700 p-0 ">
                Enter your institute Name
              </label>
            </div>
            <div className="flex justify-center mb-0">
              <input
                type="text"
                className="mt-0 block w-96  border-1 shadow-lg focus:border-black-500 focus:ring-black-500 sm:text-xl p-2 bg-slate-100 mb-3 input input-bordered"
                placeholder='Enter your institute Name'
                onChange={setInstituteHandler}
              />
            </div>
          </div>
          {/* for Spreadsheet  */}
          <div className="flex  justify-around	text-center	items-center	 xl:mt-10  ">
            <div className="col-span-6 sm:col-span-4">
              <label className="block text-2xl  text-black-700 p-0 ">
                Paste Spreadsheet ID
              </label>
            </div>
            <div className="flex justify-center mb-0">
              <input
                type="text"
                className="mt-0 block w-96  border-1 shadow-lg focus:border-black-500 focus:ring-black-500 sm:text-xl p-2 bg-slate-100 mb-3 input input-bordered"
                placeholder='paste sheet id'
                onChange={setSheetIdHandler}
              />
            </div>
          </div>

          {/* for path  */}
          <div className="flex  justify-around	text-center	items-center	 xl:mt-10 ">
            <div className="col-span-6 sm:col-span-4">
              <label className="block text-2xl  text-black-700 p-2 ">
                Choose your path
              </label>
            </div>
            <div className="flex justify-center mb-4">
              <input
                type="text"
                className={`mt-0 block w-96  border-1 shadow-lg focus:border-black-500 focus:ring-black-500 sm:text-xl p-2 bg-slate-100 input input-bordered
                  ${!checkInstituteRes.available ? 'border-2 border-rose-600' : 'border-2 border-green-500'}`}
                placeholder=" Example : snu "
                onChange={setinstituteIdHandler}
                title={`Your site instituteId will be https://gccp.vercel.app/${instituteId}`}
              />
            </div>
          </div>
          <div className="flex justify-center  tracking-widest	 text-2xl">
            <button onClick={registrationHandler}
              className=' w-2/12 tracking-widest text-white bg-gradient-to-br  from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
              disabled={progress}
            >
              {progress ? 'Please wait...' : 'Save'}
            </button>
          </div>
        </div>

        <div className="flex justify-center xl:mt-10">
          <label className="block text-lg  text-black-900 ">
            Give Google Sheet 'Viewer' permission to :
          </label>
        </div>
        <div className="flex justify-center">
          <label className="block text-sm  text-black-900 p-2">
            sheets@halogen-data-340911.iam.gserviceaccount.com
          </label>
        </div>
        <div className="flex justify-center mb-1">
          <Image src={addViewer} width="400" alt=''></Image>
        </div>

      </div>
    </>
  )
}

function Debounce(func: Function, timeout: number) {
  return setTimeout(() => {
    console.info('Debounced')
    func()
  }, timeout)
}