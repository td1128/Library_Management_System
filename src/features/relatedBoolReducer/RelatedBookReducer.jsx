import { createSlice } from '@reduxjs/toolkit';

const initialArray = [
    {isbn: '978-3-16-148410-1',author:"abcd",title:"Learn C++ online",description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, voluptate qui provident fuga mollitia voluptas molestiae magni quidem nobis dicta totam iste animi! Fuga veritatis iure earum ipsum soluta! Molestiae", dateOfPublication:"2023", publisher:"Mc Graw Hill", availability:true},
    {isbn: '978-3-16-148410-2',author:"kafjja",title:"Data structure and algorithm",description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, voluptate qui provident fuga mollitia voluptas molestiae magni quidem nobis dicta totam iste animi! Fuga veritatis iure earum ipsum soluta! Molestiae", dateOfPublication:"2021", publisher:"Publication publisher", availability:true},
    {isbn: '978-3-16-148410-3',author:"eirip",title:"Data base management system",description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, voluptate qui provident fuga mollitia voluptas molestiae magni quidem nobis dicta totam iste animi! Fuga veritatis iure earum ipsum soluta! Molestiae", dateOfPublication:"2022", publisher:"lkajfa lkjajf ", availability:true},
    {isbn: '978-3-16-148410-4',author:"cvlf;fk",title:"Operating System",description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, voluptate qui provident fuga mollitia voluptas molestiae magni quidem nobis dicta totam iste animi! Fuga veritatis iure earum ipsum soluta! Molestiae", dateOfPublication:"2020", publisher:"lafj oerpop", availability:true},
    {isbn: '978-3-16-148410-5',author:"prkkklkp",title:"Computer Network",description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, voluptate qui provident fuga mollitia voluptas molestiae magni quidem nobis dicta totam iste animi! Fuga veritatis iure earum ipsum soluta! Molestiae", dateOfPublication:"2023", publisher:"mfnlj irjdljls", availability:true}
];

// Convert array to object
const initialState = {
    books: initialArray.reduce((acc, item) => {
        // console.log("item: ",item);
        acc[item.isbn] = item;
        return acc;
    }, {})
};

const relatedBookListSlice = createSlice({
    name: 'bookList',
    initialState,
    reducers: {
        setInitialState: (state, action)=>{
            const bookArray = action.payload;
            state.books = bookArray.reduce((acc, item) => {
                acc[item.isbn] = item;
                return acc;
            }, {})
        },
        setBookDetails: (state, action) => {
            const { key, value } = action.payload;
            state.books[key] = value;// Set value in the object
        },
        removeBookDetails: (state, action) => {
            const { key } = action.payload;
            delete state.books[key];// Remove value from the object
        }
    }
});

export const { setBookDetails, removeBookDetails, setInitialState } = relatedBookListSlice.actions;
export default relatedBookListSlice.reducer;

export const fetchRelatedBookList =
  (isbn) => async (dispatch) => {
    const apiURL = import.meta.env.VITE_APP_API_URL
    try {
      const response = await fetch(
        `${apiURL}/api/user/books/related-books/isbn/${isbn}`
      )
      const data = await response.json()
      dispatch(setInitialState(data))
    } catch (error) {
      console.log('Error while fetching related books: ', error)
    }
  }