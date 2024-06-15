
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

export const Search = ()=>  {
  return (
    <div className=' flex justify-between'>
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="Search (Name, Member ID, Book Name)" variant="standard" sx={{ width: '50ch' }} />
            </Box>
        </Box>
        <Button sx={{width: '20ch'}} variant="contained">Search</Button>
    </div>
  );
}
