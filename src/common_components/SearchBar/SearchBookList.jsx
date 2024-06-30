import { useSelector } from 'react-redux'
import { Box, Grid } from '@mui/material'
import searchstyles from './SearchStyles'
import Card from '../cards/Card'

export const SearchBookList = () => {
  const bookList = useSelector((state) => state.searchBookList.books)

  return (
    <Box sx={searchstyles.booklist}>
      <Grid container spacing={2} wrap="nowrap">
        {Object.keys(bookList).map((key) => {
          const book = bookList[key]
          return (
            <Grid item key={key} sx={{ flex: '0 0 auto' }}>
              {/*<h3>{book.book.title}</h3>
                <p>{book.author_name}</p>
                <p>{book.book.date_of_publication}</p>*/}
              <Card
                pic={book.book.cover_img}
                title={book.book.title}
                author={book.author_name}
              />
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
