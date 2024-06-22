import { useSelector } from 'react-redux'
import { Box, Grid } from '@mui/material'

export const SearchBookList = () => {
  const bookList = useSelector((state) => state.searchBookList.books)

  return (
    <Box
      sx={{ 
        display: 'flex',
        overflowX: 'auto',
        scrollBehavior: 'smooth',
        maxWidth: '75vw',
        padding: 2,
        boxSizing: 'border-box'
      }}
    >
      <Grid container spacing={2} wrap="nowrap">
        {Object.keys(bookList).map((key) => {
          const book = bookList[key]
          return (
            <Grid item key={key} sx={{ flex: '0 0 auto' }}>
              <Box
                sx={{
                  width: 360,
                  padding: 2,
                }}
              >
                <h3>{book.book.title}</h3>
                <p>{book.author_name}</p>
                <p>{book.book.date_of_publication}</p>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
