import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IssueForm from '../components/IssueForm';

const ReturnBook = () => {
  return (
    <div className=" w-full flex">
      <div className=" w-full p-5 flex-col space-y-10">
        <div className=' flex h-20 items-center'>
                <ArrowBackIcon className=' mr-5'/>
                <h1 className=' font-bold text-2xl'>Issue Book</h1>
        </div>
        <IssueForm/>
      </div>
    </div>
  )
}

export default ReturnBook