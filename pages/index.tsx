import { useState } from 'react'
import NavBar from '../components/navbar.component'
import Table from '../components/table.components'

export default function Home({participantsData}: any) {

  const [data, setData] = useState(participantsData.data)

  function handleFilter(event: React.ChangeEvent<HTMLInputElement>) {

    if(event.target.value){
      const filtered_data = data.filter(
          (entry: any) => entry.some(
              (e:string) => e.toLowerCase().includes(event.target.value.toLowerCase())
            )
      )
      setData(filtered_data)
    } else {
      setData(participantsData.data)
    }
  }

  return (
    <>
        <NavBar filterFunc = {handleFilter} />
        <Table headers={participantsData.headers} data={data}/>
    </>
  )
}


export async function getStaticProps(){
    // Fetch data from external API
    const res = await fetch(`https://gccp.vercel.app/api/hello`)
    const data = await res.json()
    return { props: { participantsData: data }, revalidate: 518400 }
}