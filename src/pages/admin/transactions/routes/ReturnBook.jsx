import React from 'react'
import ReturnForm from '../components/ReturnForm'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ReturnBook = () => {
  return (
    <div className=" w-full flex">
      <div className=" w-full p-5 flex-col space-y-10">
        <div className=' flex h-20 items-center'>
                <ArrowBackIcon className=' mr-5'/>
                <h1 className=' font-bold text-2xl'>Return / Renew</h1>
        </div>
        <ReturnForm/>
      </div>
    </div>
  )
}

export default ReturnBook