import axios from 'axios'
import { useEffect, useState } from 'react'
import Poke from '../components/poke'

export default function List(){
    const [data,setData] = useState()

    function call(name){
        let url = ""
        if (name === undefined) {
            url = "https://pokeapi.co/api/v2/pokemon"
        }else {
            url = "https://pokeapi.co/api/v2/pokemon/" + name
        }
        axios.get(url)
        .then((r)=> {
            setData(r.data.results)
        })
        .catch((err)=> {
            console.log(err.response.data)
        })
    }

    useEffect(() => {
        call()
    },[])

    return (
        <>
            {
                data ? data.map((x,i) => {
                   return <Poke key={i} data={x} list={true}></Poke> 
                }) : "empty"
            }
        </>
    )
}
