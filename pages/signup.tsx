import sheetIdimg from '../utils/sheetId.png'
import addViewer from '../utils/newss.png'
import Image from 'next/image'
import { useState } from 'react'

export default function Signup() {

  const [url, setUrl] = useState<string>('')
  const [textReturned, setTextReturned] = useState<any>('')
  const [sheetId, setsheetId] = useState<string>('')


   async function setUrlHandler (e: any)  {
      setUrl(e.target.value)
      console.log(url)
      const res = await fetch(`http://localhost:3000/api/check-institute-id/${url}`)
      const data = await res.json()
      console.log(data)
      setTextReturned(data)
   }

   async function setSheetIdHandler (e: any) {
    setsheetId(e.target.value)
    const response = await fetch(`http://localhost:3000/api/register`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ instituteId: url , sheetId: sheetId})
    })
    const data = await response.text()
    alert(data)
 }

  return (
    <>
      <div className="p-2 xl:my-10 ">
        <div className="flex justify-center ">
          <div className="col-span-8 sm:col-span-4 ">
            <label className="block text-3xl  text-black-900 mb-3 ">
              Google Sheet ID
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <label className="block text-sm  text-black-900">
            Paste the google sheet id from url as shown
          </label>
        </div>
        <div className="flex justify-center mb-2">
          <Image src={sheetIdimg} width="600"  alt=''></Image>

        </div>
        <div className="flex justify-center mb-2">
          <input
            type="text"
            className="mt-2 block w-96 h-14 border-1 shadow-lg focus:border-black-500 focus:ring-black-500 sm:text-xl p-2 bg-slate-100 mb-3"
            placeholder='paste here'
          />
        </div>
        <div className="flex justify-center  xl:mt-10">
          <div className="col-span-6 sm:col-span-4">
            <label className="block text-3xl  text-black-700 p-2 ">
              Choose your path
            </label>

          </div>

        </div>
        <div className="flex justify-center mb-2">
          <input
            type="text"
            className="mt-2 block w-96 h-14 border-1 shadow-lg focus:border-black-500 focus:ring-black-500 sm:text-xl p-5 bg-slate-100 "
            placeholder=" Example : snu "
            onChange={setUrlHandler}
            title={`Your site URL will be https://gccp.vercel.app/${url}`}
          />
        </div>
        <div className="flex justify-center mb-6 ">
            <label>{!url ? "" : textReturned}</label>
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
        <div className="flex justify-center text-3xl">
          <button onClick={setSheetIdHandler} className='border-1 shadow-lg p-2  bg-slate-100'> Save </button>
      </div>
      </div>
     
    </>
  )
}

