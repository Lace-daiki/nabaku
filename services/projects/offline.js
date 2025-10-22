import { API_BASE_URL } from "@/lib/contants";
export async function getTopProjects() {
  // Replace with your actual API endpoint
  const API_URL = 'https://fundraiserr-api-9c9114b232c4.herokuapp.com/api/v1/project/random';

  try {
    const res = await fetch(API_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = await res.json();
    // If the array is inside a property, return that property
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error('Error fetching top projects:', error);
    return [];
  }
}

export async function getProjectsByOrganization(organizationId) {
  if (!organizationId) return [];
  const API_URL = `${API_BASE_URL}/project/organization/${organizationId}`;

  try {
    const res = await fetch(API_URL, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status === 404) {
        console.log(`No projects for organization ${organizationId}`);
        return [];
      }
      throw new Error('Failed to fetch organization projects');
    }
    const data = await res.json();
    return Array.isArray(data) ? data : data.data || [];
  } catch (error) {
    console.error(`Error fetching projects for organization ${organizationId}:`, error);
    return [];
  }
}

