import React, { useEffect, useState } from 'react'
import IssueNotice from './IssueNotice'
import PreviousNotice from './PreviousNotice'

const IssueNoticePage = () => {
  const [notices, setNotices] = useState([]);

  const apiURL = import.meta.env.VITE_APP_API_URL;

  const fetchNoticesData = async () => {
    try {
      const response = await fetch(`${apiURL}/api/admin/notice/get-all-active`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setNotices(data);
      console.log('IssueNoticePage')
    } catch (error) {
      console.error('Error fetching data:', error);
      setNotices([]);
    }
  };

  useEffect(() => {
    fetchNoticesData();
  }, []); // Ensure it only runs once after initial render

  return (
    <div style={{display:'flex',justifyContent:'space-evenly'}}>
      <IssueNotice fetchNoticesData={fetchNoticesData} />
      {notices.length > 0 && <PreviousNotice notices={notices} fetchNoticesData={fetchNoticesData} />}
    </div>
  )
}

export default IssueNoticePage;
