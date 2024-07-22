import React from 'react';
import Tooltip from '@mui/material/Tooltip'
import './cardsStyle.css';

const Cards = ({ notice, onDelete }) => {
  const monthname = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December',
  };

  const formatDate = (dateString) => {
    // Split the date string and construct a new Date object
    const [day, month, year] = dateString.split('-');
    const date = new Date(`${year}-${month}-${day}`);

    // Extract day and add ordinal suffix
    const dayWithSuffix = (day) => {
      const suffixes = ["th", "st", "nd", "rd"];
      const mod100 = day % 100;
      return day + (suffixes[(mod100 - 20) % 10] || suffixes[mod100] || suffixes[0]);
    };

    const dayFormatted = dayWithSuffix(date.getDate());
    return `Date of Issue: ${dayFormatted} ${monthname[month]}, ${year}`;
  };

  return (
    <div className='box'>
      <Tooltip title={notice.heading} arrow>
        <p className='subject'>{notice.heading}</p>
      </Tooltip>
      <p className='issue'>{formatDate(notice.issue_date)}</p>
      <p>Status: Active</p>
      <div className='Mark'>
        <button onClick={() => onDelete(notice.id)}>Mark Inactive</button>
      </div>
    </div>
  );
};

export default Cards;
