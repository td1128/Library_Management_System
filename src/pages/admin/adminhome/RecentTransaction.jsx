import { selectRecentTransactions } from './fetchStats'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchTransactions } from '/src/features/transaction/transactionSlice'

export const RecentTransaction = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchTransactions())
  }, [dispatch])

  // TODO : memoize selector
  const recentTransactions = useSelector(selectRecentTransactions)
  console.log(recentTransactions)

  return (
    <div className="flex flex-col mt-10 items-center mr-5">
      <div className="flex flex-row text-center w-fit">
        <div className="w-32">
          <p> Status </p>
        </div>
        {/*<div className="w-56">
          <p> ISBN </p>
        </div>*/}
        <div className="w-56">
          <p> Library Card No. </p>
        </div>
        <div className="w-32">
          <p> Member ID </p>
        </div>
        {/*<div className="w-56">
          <p> Book Name </p>
        </div>*/}
        <div className="w-40">
          <p> Issue Date </p>
        </div>
        <div className="w-40">
          <p> Due Date </p>
        </div>
        <div className="w-40">
          <p> Return Date </p>
        </div>
      </div>
      {recentTransactions.map((transaction, index) => (
        <div
          key={index}
          className="flex flex-row text-center text-base mt-4 py-2 rounded-lg w-fit px-4"
          style={{ backgroundColor: '#CCCCCC' }}
        >
          {transaction.transaction.status === 'issued' ? (
            <div className="statustext bg-green-400">
              <p className="text-blue-600">Issued</p>
            </div>
          ) : transaction.transaction.status === 'returned' ? (
            <div className="statustext border-gray-300 bg-white">
              <p className="text-gray-600">Returned</p>
            </div>
          ) : (
            <div className="statustext bg-red-600">
              <p className="text-yellow-300">Overdue</p>
            </div>
          )}
          {/*<div className="w-56">
            <p>{transaction.isbn}</p>
          </div>*/}
          <div className="w-56">
            <p>{transaction.transaction.lib_card_no}</p>
          </div>
          <div className="w-32">
            <p>{transaction.memberId}</p>
          </div>
          {/*
          <div className="w-56">
            <p>{transaction.book_name}</p>
          </div>*/}
          <div className="w-40">
            <p>{transaction.transaction.issue_date}</p>
          </div>
          <div className="w-40">
            <p>{transaction.transaction.due_date}</p>
          </div>
          <div className="w-40">
            <p>
              {transaction.transaction.return_date !== '00-00-0000'
                ? transaction.transaction.return_date
                : '-'}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
