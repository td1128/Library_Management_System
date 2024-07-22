import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Backdrop, CircularProgress, Select } from '@mui/material';
import FormModal from './Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';


export const Grid = () => {
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([]);


    // Search params and filters
    const [searchBy, setSearchBy] = useState(1);
    const [filterByTime, setFilterByTime] = useState('');
    const [status, setStatus] = useState('');
    const [searchText, setSearchText] = useState('');

    const [backDrop, setBackDrop] = useState(false);


    const getFilterDate = () => {

      let today = new Date();

      if(filterByTime === 1){
        let sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(today.getDate() - 7);

        // Format the date as needed
        let day = String(sevenDaysAgo.getDate()).padStart(2, '0');
        let month = String(sevenDaysAgo.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        let year = sevenDaysAgo.getFullYear();

        let formattedDate = `${day}-${month}-${year}`;
        return(formattedDate);

      } else if(filterByTime === 2){
        
          // Calculate the date 30 days ago
          let thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(today.getDate() - 30);

          // Format the date as needed
          let day = String(thirtyDaysAgo.getDate()).padStart(2, '0');
          let month = String(thirtyDaysAgo.getMonth() + 1).padStart(2, '0'); // Months are zero-based
          let year = thirtyDaysAgo.getFullYear();

          let formattedDate = `${day}-${month}-${year}`;
          return(formattedDate);

      } else if(filterByTime === 3){
        
        // Calculate the date 6 months ago
        let sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6);

        // Handle cases where the subtraction leads to an invalid date
        if (sixMonthsAgo.getMonth() > today.getMonth() - 6 + 12) {
            sixMonthsAgo.setDate(0); // Move to the last day of the previous month
        }

        // Format the date as needed
        let day = String(sixMonthsAgo.getDate()).padStart(2, '0');
        let month = String(sixMonthsAgo.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        let year = sixMonthsAgo.getFullYear();

        let formattedDate = `${day}-${month}-${year}`;
        return(formattedDate);
      } 
    };

    const handleSearch = () => {
      // fetch data
      const dataFetch = async () => {

        let url = `${import.meta.env.VITE_APP_API_URL}/${import.meta.env.VITE_APP_ADMIN_PATH}/transaction/history?`;

        if (searchBy === 1) {
          url += `&memberId=${searchText}`;
        } 
        if (searchBy === 2) {
          url += `&isbn=${searchText}`;
        }
        if (searchBy === 3) {
          url += `&name=${searchText}`;
        }
        if (filterByTime !== '') {
          url += `&firstdate=${getFilterDate()}`;
        }
        if (status !== '') {
          url += `&status=${status}`;
        }
        setBackDrop(true);
        const data = await fetch(url)
        .then(res =>  res.json())

        console.log(data);

        if(Array.isArray(data)){
          const newData = data?.map(item => ({
            'transaction id': item.transaction.id,
            'member id': item.memberId,
            'issue date': item.transaction.issue_date,
            book: item.isbn,
            'due date': item.transaction.due_date,
            'return date': item.transaction.return_date,
            status: item.transaction.status,
            fine: item.transaction.fine,
            actions: 'Renew/Return',
        }));
  
          setRowData(newData);
          setBackDrop(false);
        } else {
          toast.error('No data found');
          setRowData([]);
          setBackDrop(false);
        }
 
      };
  
      dataFetch();
    };

    useEffect(() => {
      // fetch data
      const dataFetch = async () => {
        setBackDrop(true);
        const data = await fetch(
            `${import.meta.env.VITE_APP_API_URL}/${import.meta.env.VITE_APP_ADMIN_PATH}/transaction/history?`,
          ).then(req => req.json());
          
  
        const newData = data.map(item => ({
            'transaction id': item.transaction.id,
            'member id': item.memberId,
            'issue date': item.transaction.issue_date,
            book: item.isbn,
            'due date': item.transaction.due_date,
            'return date': item.transaction.return_date,
            status: item.transaction.status,
            fine: item.transaction.fine,
            actions: 'Renew/Return',
        }));
          
        console.log(newData);
        setBackDrop(false);

        setRowData(newData);
      };
  
      dataFetch();
    }, []);
    
    // Column Definitions: Defines the columns to be displayed.
    const [colDefs, setColDefs] = useState([
      { field: "transaction id", flex: 2 },
      { field: "member id", flex: 2 },
      { field: "issue date", flex: 2 },
      { field: "book", flex: 4 },
      { field: "due date", flex: 2 },
      { field: "return date", flex: 2 },
      { field: "status", flex: 2 },
      { field: "fine", flex: 2 },
      { field: "actions", cellRenderer: FormModal, flex: 2 },
    ]);

    const pagination = true;
    const paginationPageSize = 500;
    const paginationPageSizeSelector = [200, 500, 1000];
   
    // ...
    return (
        <div>
          <div className=' flex justify-between items-center'>
              <div>
              <FormControl sx={{ minWidth: 240, minHeight:50 }}>
                        <InputLabel id="demo-simple-select-helper-label">Search by</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Search by"
                        value={searchBy}
                        onChange={(e) => setSearchBy(e.target.value)}
                        >
                        <MenuItem value={1}>Search by ID</MenuItem>
                        <MenuItem value={2}>Search by ISBN</MenuItem>
                        <MenuItem value={3}>Search by Name</MenuItem>
                        </Select>
                    </FormControl>
              </div>
              <Box sx={{ '& > :not(style)': { m: 1 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                      <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}  />
                      <TextField id="input-with-sx" label="Search (Name, Member ID, Book Name)" variant="standard" sx={{ width: '50ch' }} value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                        {console.log(searchText)}
                  </Box>
              </Box>
              <Button sx={{width: '20ch', height: '5ch', backgroundColor:'#761236', borderRadius:50}} variant="contained" onClick={handleSearch}>Search</Button>
          </div>
          <div className=' flex mt-4 mb-8 space-x-4 items-center'>
            <h6>Filter:</h6>
            <div>
              <FormControl sx={{ minWidth: 240, minHeight:50 }}>
                        <InputLabel id="demo-simple-select-helper-label">Filter by time</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Filter by time"
                        value={filterByTime}
                        onChange={(e) => setFilterByTime(e.target.value)}
                        >
                        <MenuItem value={1}>Last 7 days</MenuItem>
                        <MenuItem value={2}>Last 30 days</MenuItem>
                        <MenuItem value={3}>Last 6 months</MenuItem>
                        </Select>
                    </FormControl>
            </div>
            <div>
              <FormControl sx={{ minWidth: 240, minHeight:50 }}>
                        <InputLabel id="demo-simple-select-helper-label">Status</InputLabel>
                        <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        >
                        <MenuItem value={'late'}>Late</MenuItem>
                        <MenuItem value={'returned'}>Returned</MenuItem>
                        <MenuItem value={'issued'}>Issued</MenuItem>
                        </Select>
                    </FormControl>
            </div>
          </div>
          <div
          className="ag-theme-quartz overflow-x-scroll overflow-x-hidden w-full" // applying the grid theme
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
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backDrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
       )
   }