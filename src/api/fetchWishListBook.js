import axios from 'axios';

const fetchWishListBook = async ( memberId ) => {
    const rootUrl = import.meta.env.VITE_APP_API_URL;
    console.log("app url at api: ",rootUrl);

    try {
        const response = await axios.get( `${rootUrl}/api/user/myBooks/wishlist/memberId/${memberId}` );
        console.log("response at api call of fetch wishlisted books: ", response )
        return response.data;
    } catch ( error ) {
        console.log( error.message );
    }
}

export default fetchWishListBook;