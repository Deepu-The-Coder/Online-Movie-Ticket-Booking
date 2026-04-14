// Add this to your src/lib/utils.js file

export const dateFormat = (dateString) => {
  if (!dateString) return "";
  
  const date = new Date(dateString);
  
  // This will format "2026-04-15T19:00:00" into "15 Apr 2026, 07:00 PM"
  return date.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export default dateFormat;