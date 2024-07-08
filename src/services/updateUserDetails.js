import axios from 'axios';
import { UPDATE_USER_DETAILS_END_POINT } from './constants/constants';

const updateUserDetails = async ( studentDetails ) => {
    const userRootUrl = import.meta.env.VITE_APP_USER_ROOT_URL;
    const updateUrl = UPDATE_USER_DETAILS_END_POINT;

    try {
        const response = await axios.put( `${ userRootUrl }/${ updateUrl }`, studentDetails );
        console.log( response );
    } catch ( error ) {
        console.log( error.message );
    }
}

export default updateUserDetails;