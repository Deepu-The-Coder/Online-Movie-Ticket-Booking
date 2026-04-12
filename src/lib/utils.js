export const timeFormat = (totalMinutes) => {
  // Ensure we are working with a number
  const minutes = Number(totalMinutes);
  
  // Return a fallback if the data is missing or invalid
  if (!minutes || isNaN(minutes)) return "N/A";

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes}m`;
  } else if (remainingMinutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${remainingMinutes}m`;
  }
};