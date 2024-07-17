import axios from 'axios';

const getLibraryCards = async ( membershipId ) => {
    const userRootUrl = import.meta.env.VITE_APP_USER_ROOT_URL_2;
    const getLibraryCardsUrl = import.meta.env.VITE_APP_GET_LIBRARY_CARDS;

    try {
        const response = await axios.get( `${ userRootUrl }/${ getLibraryCardsUrl }/${ membershipId }` );
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            throw new Error(error.response.data.message || 'Error getting the library cards');
        } else if (error.request) {
            console.error('Error request:', error.request);
            throw new Error('No response received while getting the library cards');
        } else {
            console.error('Error message:', error.message);
            throw new Error(error.message || 'Error getting the library cards');
        }
    }
}

export default getLibraryCards;