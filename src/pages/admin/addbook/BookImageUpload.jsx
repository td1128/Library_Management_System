import { useState, useEffect } from 'react'
import './AddBook.css'

const BookImageUpload = ({ setImage, loading }) => {
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    if (loading) {
      setImagePreview(null)
    }
  }, [loading])

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

  const handleTriggerInput = () => {
      document.getElementById('upload-button').click()
  }

  return (
    <div className="image-upload">
      {imagePreview ? (
        <img src={imagePreview} alt="Book Cover" className="image-preview" onClick={handleTriggerInput}/>
      ) : (
        <div className="placeholder" onClick={handleTriggerInput}>
          <span className="text-xl">Select an image</span>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
        id="upload-button"
      />
    </div>
  )
}

export default BookImageUpload
