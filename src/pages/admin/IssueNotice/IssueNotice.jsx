import React, { useEffect, useState } from 'react'
import './style/IssueNotice.css'

const IssueNotice = ({ fetchNoticesData }) => {
  const apiURL = import.meta.env.VITE_APP_API_URL;

  const [header, setHeader] = useState("")
  const [body, setBody] = useState("")
  const [disable, setDisable] = useState(true)

  useEffect(() => {
    setDisable(header === "" || body === "");
  }, [header, body])

  const handleSubjectChange = (e) => {
    setHeader(e.target.value);
  }

  const handleContentChange = (e) => {
    setBody(e.target.value);
  }

  const publishNotice = async () => {
    const data = {
      heading: header,
      body: body
    };

    try {
      const response = await fetch(`${apiURL}/api/admin/notice/issue`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Details updated successfully:', result);
        alert('Details updated successfully!');
        setHeader("");
        setBody("");
        fetchNoticesData(); // Refresh the notices list
      } else {
        console.error('Failed to update details:', response.statusText);
        alert('Failed to update details!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred while updating details!');
    }
  }

  return (
    <div className='content'>
      <p className='custom-heading'>Issue a Notice</p>
      <div className='Subject'>
        <label htmlFor="Subject" className='custom-mark'>Subject</label>
        <textarea id="Subject" className='subjectArea' value={header} onChange={handleSubjectChange}></textarea>
      </div>
      <div className='Subject'>
        <label htmlFor="Content" className='custom-mark'>Content</label>
        <textarea id="Content" className='subjectArea' style={{height:'40vh'}} value={body} onChange={handleContentChange}></textarea>
      </div>
      <button className='Publish' disabled={disable} onClick={publishNotice}>Publish</button>
    </div>
  )
}

export default IssueNotice;
