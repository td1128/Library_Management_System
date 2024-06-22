import { useState } from 'react'
import { Box, TextField, Icon, FormControl } from '@mui/material'
import { SearchDropdown } from './SearchDropdown'
import { SearchToggle } from './SearchToggle'

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [availability, setAvailability] = useState(false)
  const [subject, setSubject] = useState('')
  const [sortBy, setSortBy] = useState('Popularity')
  //const [popularity, setPopularity] = useState(false)
  //const [edition, setEdition] = useState(false)

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
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
          InputProps={{
            endAdornment: (
              <Icon>
                <img src="/src/assets/icons/search-normal.svg" />
              </Icon>
            ),
          }}
        />
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
    </Box>
  )
}
