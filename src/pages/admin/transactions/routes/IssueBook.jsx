import IssueForm from '../components/IssueForm';

const ReturnBook = () => {
  return (
    <div className=" w-full flex">
      <div className=" w-full p-5 flex-col space-y-10">
        <IssueForm/>
      </div>
    </div>
  )
}

export default ReturnBook