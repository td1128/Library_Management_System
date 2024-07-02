import { useEffect, useState } from "react";
import Table from "./Table"

const BASE_URL = "https://library-management-system-f9gh.onrender.com/api/user/myBooks/current_books/memberId/2";

const END_POINT = "/myBooks/current_books/memberId/:memberId"

const API_CUR = "/current_books/member-id/{member_id}";

//const [books, setBooks] = useState([]);


 const Fetch = () =>{
    const fetchBook = async (url)=>{
        const response = await fetch(url);
        const data = await response.json();
            //setBooks(data);
        console.log(data);
    }
    useEffect (() =>{
        fetchBook(BASE_URL);
    }, [])


return(
<>
{/* <Table books={books}/> */}
</>
)
};
export default Fetch;
