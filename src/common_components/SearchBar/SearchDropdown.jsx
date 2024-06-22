import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export const SearchDropdown = ({ title, options, value, setValue }) => {
  return (
    <FormControl variant="outlined" sx={{ minWidth: 120 }}>
      <InputLabel>{title}</InputLabel>
      <Select
        value={value}
        onChange={(event) => setValue(event.target.value)}
        label={title}
      >
        {options.map((option,index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
