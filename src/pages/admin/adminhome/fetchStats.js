export const selectRecentTransactions = (state) => {
  const transactionListCopy = [...state.transaction.transactionList]
  return transactionListCopy
    //.sort((a, b) => lastUpdated(b) - lastUpdated(a))
    .slice(0, 5)
}
