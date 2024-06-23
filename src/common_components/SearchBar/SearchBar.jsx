import { useState, useEffect, useRef } from 'react'
import { Box, TextField, Icon, FormControl } from '@mui/material'
import { SearchDropdown } from './SearchDropdown'
import { SearchToggle } from './SearchToggle'
import { SearchBookList } from './SearchBookList'
import { useDispatch } from 'react-redux'
import { fetchBookList } from '/src/features/searchBookReducer/SearchBookReducer'

export const SearchBar = () => {
  // queryRef is used to store the previous search query
  // on carraiage return, the search query is updated
  // this prevents unnecessary API calls
  const queryRef = useRef('a')

  const [searchQuery, setSearchQuery] = useState('')
  const [availability, setAvailability] = useState(false)
  //const [subject, setSubject] = useState('')
  const [sortBy, setSortBy] = useState('Popularity')
  const dispatch = useDispatch()

  /*useEffect(() => {
    dispatch(fetchBookList(queryRef.current, availability, sortBy))
  }, [dispatch, availability, sortBy])*/

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      queryRef.current = searchQuery
      if (queryRef.current === '') return;
      dispatch(fetchBookList(searchQuery, availability, sortBy))
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '70%' }}
      >
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search by name, author or subject"
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <Icon>
                <img src="/src/assets/icons/search-normal.svg" />
              </Icon>
            ),
          }}
        />
        { searchQuery==='' && <p className="text-bold mx-auto">Please enter a search query!</p> }
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <p> Filter by: </p>
          <SearchToggle
            title="Availability"
            value={availability}
            setValue={setAvailability}
          />
          {/*<SearchDropdown
            title="Subject"
            options={['Physics', 'Chemistry', 'Mathematics']}
            value={subject}
            setValue={setSubject}
          />*/}
          <p className="ml-5"> Sort by: </p>
          <SearchDropdown
            title="Sort"
            options={['Popularity', 'Edition']}
            value={sortBy}
            setValue={setSortBy}
          />
        </Box>
      </Box>
      <SearchBookList />
    </Box>
  )
}
