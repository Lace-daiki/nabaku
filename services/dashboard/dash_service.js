import axios from 'axios';
import { API_BASE_URL } from '@/lib/contants'; 
import { authService } from '../auth/auth';

export const fetchDashboardData = async () => {
    const token = authService.getCurrentToken();
    console.log(token);
    
    if (!token) {
        throw new Error('No authentication token found');
    }
    
    try {
        const response = await axios.get(`${API_BASE_URL}/organization/dashboard`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Include the token in the headers
            },
        });
        
        // Axios automatically resolves the response data
        return response.data; // Return the data directly
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        return null; // Handle error appropriately
    }
};
