
import { API_BASE_URL } from '@/lib/contants';

export async function getOrganizationDetails(organizationId) {
    try {
        const response = await fetch(`${API_BASE_URL}/organization/public/${organizationId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch organization details');
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        throw error;
    }
}

export async function searchOrganizations(searchQuery = '') {
    try {
        const url = new URL(`${API_BASE_URL}/organization/list`);
        const res = await fetch(url.toString());
        if (!res.ok) {
            throw new Error('Failed to fetch organizations');
        }
        const data = await res.json();
        let orgs = data.data || [];

        // Client-side filter since API search query returns 404
        if (searchQuery && typeof searchQuery === 'string') {
            const q = searchQuery.trim().toLowerCase();
            if (q.length > 0) {
                orgs = orgs.filter(org => {
                    const name = (org.name || '').toLowerCase();
                    const email = (org.email || '').toLowerCase();
                    const type = (org.type || '').toLowerCase();
                    const description = (org.description || '').toLowerCase();
                    return (
                        name.includes(q) ||
                        email.includes(q) ||
                        type.includes(q) ||
                        description.includes(q)
                    );
                });
            }
        }

        return orgs.map(org => ({
            id: org._id || org.id,
            profile_image: (typeof org.profile_image === 'string' && org.profile_image.trim())
                ? org.profile_image
                : ((typeof org.cover_image === 'string' && org.cover_image.trim())
                    ? org.cover_image
                    : '/nabaku.png'),
            title: org.name || 'No Title',
            raised: null,
            amount: null,
            daysLeft: null,
            tag: org.type || 'Organization',
            category: 'org',
        }));
    } catch (error) {
        throw error;
    }
}