import { useState } from 'react'
import './AddBook.css'

const BookImageUpload = ({ setImage }) => {
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
        setImage(file)
      }
      reader.readAsDataURL(file)
    }
  }

return (
    <div className="image-upload">
      {imagePreview ? (
        <img src={imagePreview} alt="Book Cover" className="image-preview" />
      ) : (
        <div className="placeholder">
          <span>Book Image</span>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="upload-button"
      />
      <label htmlFor="upload-button" className="upload-button">
        Upload Image
      </label>
    </div>
  );
}

export default BookImageUpload
