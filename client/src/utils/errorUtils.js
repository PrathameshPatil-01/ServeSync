export const handleAuthError = (error) => {
  if (error.response) {
    throw new Error(error.response.data.message || 'Authentication failed');
  } else if (error.request) {
    throw new Error('No response from server');
  } else {
    throw new Error(error.message || 'An error occurred');
  }
};
