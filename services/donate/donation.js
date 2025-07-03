import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Create a new donation
 * @param {Object} donationData - The donation data
 * @param {number} donationData.amount - The donation amount
 * @param {string} donationData.projectId - The project ID
 * @param {string} donationData.email - The donor's email
 * @param {boolean} donationData.anonymous - Whether the donation is anonymous
 * @returns {Promise<Object>} The response data containing the payment link
 */
export const createDonation = async (donationData) => {
  try {
    console.log('Making donation request with data:', donationData);
    console.log('API URL:', `${API_URL}/donation/make-donation`);

    const response = await axios.post(`${API_URL}/donation/make-donation`, donationData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Donation response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Donation error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers,
    });

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(
        error.response.data?.message || 
        `Server error: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from server. Please check your internet connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Request setup error: ${error.message}`);
    }
  }
};

/**
 * Get donations for a specific project
 * @param {string} projectId - The project ID
 * @returns {Promise<Array>} Array of donations
 */
export const getProjectDonations = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/donation/project/${projectId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch donations');
  }
};

/**
 * Get a specific donation by ID
 * @param {string} donationId - The donation ID
 * @returns {Promise<Object>} The donation data
 */
export const getDonation = async (donationId) => {
  try {
    const response = await axios.get(`${API_URL}/donation/${donationId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch donation');
  }
};

/**
 * Get all donations for the current user
 * @returns {Promise<Array>} Array of user's donations
 */
export const getUserDonations = async () => {
  try {
    const response = await axios.get(`${API_URL}/donation/user`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch user donations');
  }
}; 