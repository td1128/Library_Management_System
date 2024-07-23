
export const parseOpeningHours = (timeRange) => {
    if (!timeRange) return { open: '00:00', close: '00:00' };
    const [open, close] = timeRange.split(' - ');
    return { open, close };
  };
  
  export const validateTimes = (openingHoursSunday, openingHoursOtherday, setTimeError) => {
    if (openingHoursSunday.open > openingHoursSunday.close) {
      setTimeError('Sunday opening time must be earlier than closing time.');
      return false;
    }
    if (openingHoursOtherday.open > openingHoursOtherday.close) {
      setTimeError('Other days opening time must be earlier than closing time.');
      return false;
    }
    setTimeError('');
    return true;
  };