import axios from 'axios';

const fetchUserDetails = async ( studentID ) => {
    const userRootUrl = import.meta.env.VITE_APP_USER_ROOT_URL;
    const getUserDetails = import.meta.env.VITE_APP_GET_USER_DETAILS;

    const res = await axios.get( `${userRootUrl}/${getUserDetails}/${studentID}` );
    console.log( res )
    return res.data;
}

export { fetchUserDetails };