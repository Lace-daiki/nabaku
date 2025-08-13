
import { authService } from '@/services/auth/auth';
import { API_BASE_URL } from '@/lib/contants';

const token = authService.getCurrentToken();
console.log(token);

if (!token) {
    throw new Error('No authentication token found');
}

// Fetch bank details
export const fetchBankDetails = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/bank`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching bank details:', error);
        throw error;
    }
};

// Process withdrawal
export const processWithdrawal = async (amount, bankId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/withdrawal`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                amount,
                bankId
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error processing withdrawal:', error);
        throw error;
    }
};
