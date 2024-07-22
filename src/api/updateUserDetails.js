import axios from 'axios';

const updateUserDetails = async ( studentDetails ) => {
    const userRootUrl = import.meta.env.VITE_APP_USER_ROOT_URL;
    const updateUrl = import.meta.env.VITE_APP_UPDATE_USER_DETAILS;

    try {
        const response = await axios.put( `${ userRootUrl }/${ updateUrl }`, studentDetails );
        console.log( response );
    } catch ( error ) {
        console.log( error.message );
    }
}

export default updateUserDetails;