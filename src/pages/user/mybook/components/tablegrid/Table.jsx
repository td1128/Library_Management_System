import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { useMemo, useState, useCallback } from 'react';
import "./style.css"


const patchData = (data) => {
  // hack the data, replace each country with an object of country name and code
  data.forEach((row) => {
    const bookName = row.title;
    row.book = {
      name: bookName,
    };
  });
};

const GridExample = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  // Row Data: The data to be displayed.
  <div>
    <h4>Current Borrowed Books</h4>
  </div>
  const [rowData, setRowData] = useState([
    {
      Title: "Concept of Phtsics", Author: "HC Verma", Issue_Date: "11/06/2024",
      Due_Date: "11/07/2024", Returned_Date: "11/07/2024", Fine: "0", Status: "Active"
    },
    {
      Title: "XYZ", Author: "ABCD", Issue_Date: "11/07/2024",
      Due_Date: "11/08/2024", Returned_Date: "11/07/2024", Fine: "0", Status: "Due"
    },
    {
      Title: "ASDFG", Author: "QWERTY", Issue_Date: "11/06/2024",
      Due_Date: "11/08/2024", Returned_Date: "11/07/2024", Fine: "0", Status: "Active"
    },
    {
      Title: "Concept of Phtsics", Author: "HC Verma", Issue_Date: "11/06/2024",
      Due_Date: "11/07/2024", Returned_Date: "", Fine: "0", Status: "Active"
    },
    {
      Title: "XYZ", Author: "ABCD", Issue_Date: "11/07/2024",
      Due_Date: "11/08/2024", Returned_Date: "11/07/2024", Fine: "0", Status: "Active"
    },
    {
      Title: "ASDFG", Author: "QWERTY", Issue_Date: "11/06/2024",
      Due_Date: "11/08/2024", Returned_Date: "11/07/2024", Fine: "0", Status: "Active"
    },
  ]);
  // const currencyFormatter = (params) => {
  //     return "£" + formatNumber(params.value);
  //   };

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
    {
      field: "Title",
      filter: true,
      floatingFilter: true, cellDataType: 'text'
    },

    {
      field: "Author",
      filter: true,
      floatingFilter: true, cellDataType: 'text'
    },

    {
      field: "Issue_Date",
      filter: true,
      floatingFilter: true
    },

    {
      field: "Due_Date",
      filter: true,
      floatingFilter: true,
    },

    {
      field: "Returned_Date",
      filter: true,
      floatingFilter: true,
    }, //cellDataType: 'dateString'

    {
      field: "Fine",
      filter: true,
      floatingFilter: true
    },

    {
      field: "Status",
      filter: true,
      floatingFilter: true,
      cellStyle: params => {
        if (params.value === 'Active') {
          //mark police cells as red
          return { color: 'black', backgroundColor: 'green' };
        }
        if (params.value === 'Due') {
          //mark police cells as red
          return { color: 'black', backgroundColor: 'red' };
        }
        return null;
      }
    }
  ]);

  // ...
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [20, 50, 100];

  const BASE_URL = "https://library-management-system-f9gh.onrender.com/api/user/myBooks/current_books/memberId/2";

  const END_POINT = "/myBooks/current_books/memberId/:memberId"

  const onGridReady = useCallback((params) => {
    fetch("BASE_URL")
      .then((resp) => resp.json())
      .then((data) => {
        patchData(data);
        setRowData(data);
      });
  }, []);

  const autoSizeStrategy = useMemo(() => {
    return {
      type: "fitGridWidth",
    };
  }, []);
  return (
    // wrapping container with theme & size

    <div className="ag-theme-quartz" style={{ height: 500, width: 1200, marginLeft: 240, paddingTop: 15 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        autoSizeStrategy={autoSizeStrategy}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
      />
    </div>


  )
}
export default GridExample;