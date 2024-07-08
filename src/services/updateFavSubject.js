import axios from 'axios';
import { UPDATE_USER_SUBJECT_END_POINT } from './constants/constants';

const updateFavSubject = async (membershipId, subjects) => {
    const userRootUrl = import.meta.env.VITE_APP_USER_ROOT_URL_2;
    const updateSubUrl = UPDATE_USER_SUBJECT_END_POINT;

    try {
      const response = await axios.put(`${userRootUrl}/${updateSubUrl}/${membershipId}`, { sub_list: subjects });
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
