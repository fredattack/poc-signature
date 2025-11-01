// Date and text formatting utilities

// Helper to ensure we have a Date object
const toDate = (date: Date | string): Date => {
  return typeof date === 'string' ? new Date(date) : date;
};

export const formatDate = (date: Date | string): string => {
  const dateObj = toDate(date);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
};

export const formatTime = (date: Date | string): string => {
  const dateObj = toDate(date);
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(dateObj);
};

export const formatDateTime = (date: Date | string): string => {
  return `${formatDate(date)} at ${formatTime(date)}`;
};

export const formatRelativeTime = (date: Date | string): string => {
  const dateObj = toDate(date);
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) {
    return 'Just now';
  }
  if (diffMins < 60) {
    return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
  }
  if (diffHours < 24) {
    return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
  }
  if (diffDays < 7) {
    return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
  }
  return formatDate(dateObj);
};

export const formatLocation = (city?: string, country?: string): string => {
  if (!city && !country) {
    return 'Unknown location';
  }
  if (city && country) {
    return `${city}, ${country}`;
  }
  return city ?? country ?? 'Unknown location';
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.substring(0, maxLength - 3)}...`;
};

export const capitalizeFirstLetter = (text: string): string => {
  if (!text) {
    return '';
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1048576) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }
  return `${(bytes / 1048576).toFixed(2)} MB`;
};

export const formatPrice = (
  amount: number,
  currency: string = 'USD'
): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};
