

export const fetchOrganizations = async () => {
  try {
      const response = await fetch("https://fundraiserr-api-9c9114b232c4.herokuapp.com/api/v1/organization/list");
      
      if (!response.ok) {
          throw new Error(`Failed to fetch organizations: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data.data; // Return the organizations data
  } catch (error) {
      console.error(error);
      throw new Error('An error occurred while fetching organizations');
  }
};
