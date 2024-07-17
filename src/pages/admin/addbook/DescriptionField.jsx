import { TextField } from '@mui/material'

const DescriptionField = ({ bookDescription, setBookDescription }) => {
  return (
    <>
      <h1 className="text-md"> Description </h1>
      <TextField
        id="outlined-basic"
        placeholder="Description"
        variant="outlined"
        value={bookDescription}
        onChange={(e) => setBookDescription(e.target.value)}
        sx={{ width: '50%', minWidth: '35vw' }}
        multiline
      />
    </>
  )
}

export default DescriptionField
