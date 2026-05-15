const formatDisplayRange = (value: string | undefined) => {
  if (!value) return '';

  const sepIndex = value.indexOf(' - ');
  if (sepIndex === -1) return '';

  const startStr = value.slice(0, sepIndex);
  const endStr = value.slice(sepIndex + 3);

  const startDate = new Date(startStr);
  const endDate = new Date(endStr);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return '';

  endDate.setDate(endDate.getDate() - 1);

  const format = (date: Date) => date.toLocaleDateString('en-US');
  return `${format(startDate)} - ${format(endDate)}`;
};

export { formatDisplayRange };
