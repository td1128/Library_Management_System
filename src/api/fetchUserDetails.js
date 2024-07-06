import axios from 'axios';

const fetchUserDetails = async ( studentID ) => {
    const userRootUrl = import.meta.env.VITE_APP_USER_ROOT_URL;
    const getUserDetails = import.meta.env.VITE_APP_GET_USER_DETAILS;

    try {
        const response = await axios.get( `${userRootUrl}/${getUserDetails}/${studentID}` );
        console.log( response )
        return response.data;
    } catch ( error ) {
        console.log( error.message );
    }
}

export default fetchUserDetails;