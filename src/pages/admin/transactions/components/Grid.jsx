import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState } from 'react';
import TemporaryDrawer from './Drawer';



export const Grid = () => {
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
      { 'member id': 234, 'issue date': '25/06/2024', book: 'The Alchemist', 'due date': '25/07/2024', 'return date': '25/07/2024', status: 'Returned', fine: '0', actions: 'Renew/Return' },
    ]);
    
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
      { field: "member id", flex: 2 },
      { field: "issue date", flex: 2 },
      { field: "book", flex: 4 },
      { field: "due date", flex: 2 },
      { field: "return date", flex: 2 },
      { field: "status", flex: 2 },
      { field: "fine", flex: 1 },
      { field: "actions", cellRenderer: TemporaryDrawer, flex: 2 },
    ]);

    const pagination = true;
    const paginationPageSize = 500;
    const paginationPageSizeSelector = [200, 500, 1000];
   
    // ...
    return (
        // wrapping container with theme & size
        <div
         className="ag-theme-quartz overflow-x-scroll" // applying the grid theme
         style={{ height: 500 }} // the grid will fill the size of the parent container
        >
          <AgGridReact
              rowData={rowData}
              columnDefs={colDefs}
              pagination={pagination}
              paginationPageSize={paginationPageSize}
              paginationPageSizeSelector={paginationPageSizeSelector}
          
          />
        </div>
       )
   }