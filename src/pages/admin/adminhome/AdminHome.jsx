import { useSelector, useDispatch } from 'react-redux'
import './AdminHome.css'
//import { RecentTransaction } from './RecentTransaction'
import { SearchBar } from '/src/common_components/SearchBar/SearchBar'
import { useEffect } from 'react'
import { fetchStats } from '/src/features/stats/statsSlice'

export const AdminHome = () => {
  const dispatch = useDispatch()
  const totalBooks = useSelector((state) => state.stats.totalBooks)
  const totalMembers = useSelector((state) => state.stats.totalMembers)
  const totalBooksBorrowedThisMonth = useSelector(
    (state) => state.stats.borrowedThisMonth
  )
  const totalBooksIssuedToday = useSelector((state) => state.stats.issuedToday)
  const totalBooksReturnedToday = useSelector(
    (state) => state.stats.returnedToday
  )
  const totalOverdueBooks = useSelector((state) => state.stats.BooksOverdue)

  useEffect(() => {
    dispatch(fetchStats())
  }, [dispatch])

  const transactionStats = [
    {
      title: 'Total Enrolled Members',
      value: totalBooks,
    },
    {
      title: 'Total Books in Stock',
      value: totalMembers,
    },
    {
      title: 'Total Books Borrowed This Month',
      value: totalBooksBorrowedThisMonth,
    },
    {
      title: 'Total Books Issued Today',
      value: totalBooksIssuedToday,
    },
    {
      title: 'Total Books Returned Today',
      value: totalBooksReturnedToday,
    },
    {
      title: 'Total Overdue Books',
      value: totalOverdueBooks,
    },
  ]
  return (
    <div className="flex-grow flex flex-col ml-6 gap-10">
      <SearchBar />
      <div className="flex flex-row mt-5">
        {transactionStats.map((stat, index) => (
          <div key={index} className="statsbox">
            <p className="text-lg">{stat.title}:</p>
            <p className="text-4xl mt-3">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold"> Recent Transactions </h1>
      { /* <RecentTransaction /> */}
      </div>
    </div>
  )
}
