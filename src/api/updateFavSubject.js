import axios from 'axios';

const updateFavSubject = async (membershipId, subjects) => {
    const userRootUrl = import.meta.env.VITE_APP_USER_ROOT_URL_2;
    const addSubUrl = import.meta.env.VITE_APP_UPDATE_USER_SUBJECT;

    try {
      const response = await axios.put(`${userRootUrl}/${addSubUrl}/${membershipId}`, { sub_list: subjects });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        throw new Error(error.response.data.message || 'Error updating favorite subjects');
      } else if (error.request) {
        console.error('Error request:', error.request);
        throw new Error('No response received while updating favorite subjects');
      } else {
        console.error('Error message:', error.message);
        throw new Error(error.message || 'Error updating favorite subjects');
      }
    }
};

export default updateFavSubject;
