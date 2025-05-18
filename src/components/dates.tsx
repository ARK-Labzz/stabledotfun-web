

export const getThursdayDates = () => {
  const today = new Date();
  
  // Find the most recent Thursday (0 = Sunday, 4 = Thursday)
  const mostRecentThursday = new Date(today);
  const daysSinceThursday = (today.getDay() + 3) % 7; // Days since last Thursday
  mostRecentThursday.setDate(today.getDate() - daysSinceThursday);
  
  // Find the next Thursday
  const nextThursday = new Date(mostRecentThursday);
  nextThursday.setDate(mostRecentThursday.getDate() + 7);
  
  // Format dates as Month Day, Year
  const formatDate = (date: Date): string => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };
  
  return {
    startDate: formatDate(mostRecentThursday),
    maturityDate: formatDate(nextThursday),
    nextThursdayDate: nextThursday, // Return the actual date object too
    mostRecentThursdayDate: mostRecentThursday
  };
};