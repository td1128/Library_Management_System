import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

const notices = [
  { id: 1, subject: "Notice Subject 1", date: "29th May, 2024", status: "Active" },
  { id: 2, subject: "Notice Subject 2", date: "29th May, 2024", status: "Inactive" },
  { id: 3, subject: "Notice Subject 3", date: "29th May, 2024", status: "Inactive", demise: "2nd June, 2024" },
  { id: 4, subject: "Notice Subject 4", date: "29th May, 2024", status: "Active" },
];

const IssueNotice = () => {
  const [unread, setUnread] = useState(2);

  return (
    <>
    <Outlet/>
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-purple-200 text-purple-800 rounded-full px-3 py-1">
          {unread} unread
        </div>
        <div className="flex items-center">
          <span className="mr-2">John</span>
          <img className="w-8 h-8 rounded-full" src="path/to/avatar.jpg" alt="User Avatar" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Issue a Notice</h2>
        <form className="mb-6">
          <div className="mb-4">
            <label className="block text-gray-700">Subject</label>
            <input className="w-full px-3 py-2 border border-gray-300 rounded-lg" type="text" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Content</label>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg"></textarea>
          </div>
          <button className="bg-purple-700 text-white px-4 py-2 rounded-lg">Publish</button>
        </form>
        <h3 className="text-xl font-semibold mb-4">Previous Notices</h3>
        <div>
          {notices.map((notice) => (
            <div key={notice.id} className="border rounded-lg p-4 mb-4">
              <h4 className="font-bold">{notice.subject}</h4>
              <p>Date of Issue: {notice.date}</p>
              <p>Status: {notice.status}</p>
              {notice.demise && <p>Date of Demise: {notice.demise}</p>}
              <button className="bg-red-500 text-white px-3 py-1 rounded-lg mt-2">Mark Inactive</button>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}

export default IssueNotice;
