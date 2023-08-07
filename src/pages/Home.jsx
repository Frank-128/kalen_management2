import React,{useState} from 'react'
import Sidebar from '../components/Sidebar'
import Main from '../components/Main'

function Home() {
  
  return (
    <div className='flex flex-col h-screen w-screen  '>
       <div className='flex basis-11/12'>
       <Sidebar />
        <Main  />
       </div>
        <footer className="bg-slate-300 basis-1/12 bottom-0 items-center flex justify-center">
        <span>&copy;2023 Kalen Technologies Solutions.</span>
    </footer>
    </div>
  )
}

export default Home