import axios from 'axios';
import { GET_USER_DETAILS_END_POINT } from './constants/constants';

const fetchUserDetails = async ( studentID ) => {
    const userRootUrl = import.meta.env.VITE_APP_USER_ROOT_URL;
    const getUserDetails = GET_USER_DETAILS_END_POINT;

    try {
        const response = await axios.get( `${userRootUrl}/${getUserDetails}/${studentID}` );
        console.log( response )
        return response.data;
    } catch ( error ) {
        console.log( error.message );
    }
}

export default fetchUserDetails;