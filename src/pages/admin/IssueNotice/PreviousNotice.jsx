import React, { useEffect, useState } from 'react';
import './style/PreviousNotice.css';
import Cards from '../../../common_components/IssueNoticeCards/Cards';

const PreviousNotice = ({ notices, fetchNoticesData }) => {
  const apiURL = import.meta.env.VITE_APP_API_URL;

  const handleDeleteNotice = async (noticeId) => {
    console.log(noticeId)
    try {
      const response = await fetch(`${apiURL}/api/admin/notice/mark-obsolete/noticeid/${noticeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Notice deleted successfully:', result);
      alert('Notice deleted successfully!');

      fetchNoticesData(); // Refresh the notices list
    } catch (error) {
      console.error('Error deleting notice:', error);
      alert('Error occurred while deleting notice!');
    }
  };

  return (
    <div>
      <p className='custom-heading1'>Previous Notices</p>
      <div className='Allcards'>
        {notices.map((notice) => (
          <Cards key={notice.id} notice={notice} onDelete={handleDeleteNotice} />
        ))}
      </div>
    </div>
  );
};

export default PreviousNotice;
