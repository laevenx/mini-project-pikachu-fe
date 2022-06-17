import { useEffect, useState } from 'react'
import Poke from '../components/poke'

export default function Mypoke(){
    const [data,setData] = useState()

    useEffect(() => {
        const temp = localStorage.getItem("myPoke")
        let file = JSON.parse(temp)
        setData(file)
        console.log(temp)
    },[])

    return (
        <>
            {
                data ? data.map((x,i) => {
                   return <Poke key={i} data={x} list={false}></Poke> 
                }) : "empty"
            }
        </>
    )
}