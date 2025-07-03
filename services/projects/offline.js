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
