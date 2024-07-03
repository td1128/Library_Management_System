import { TextField } from '@mui/material'
import { useState } from 'react'

const InputTextField = ({ title, value, setValue, maxWidth, pattern }) => {
  const [valid, setValid] = useState(true)

  const handleChange = (e) => {
    e.preventDefault()

    if (e.target.value === '' || !pattern.test(e.target.value)) {
      setValid(false)
    }
    else {
      setValid(true)
    }

    setValue(e.target.value)
  }

  return (
    <>
      <h1 className="text-md"> {title} </h1>
      <TextField
        id="outlined-basic"
        variant="outlined"
        label={''}
        placeholder={title}
        value={value}
        onChange={handleChange}
        sx={{ width: '90%', maxWidth: maxWidth }}
        error={!valid}
        helperText={!valid ? 'Please enter a valid value' : ''}
      />
    </>
  )
}

export default InputTextField
