import { TextField } from '@mui/material'

const InputTextField = ({ field }) => {
  return (
    <>
      <h1 className="text-md"> {field.title} </h1>
      <TextField
        id="outlined-basic"
        variant="outlined"
        label={''}
        placeholder={field.title}
        value={field.value}
        onChange={field.handleChange}
        sx={{ maxWidth: field.maxWidth }}
      />
    </>
  )
}

export default InputTextField
