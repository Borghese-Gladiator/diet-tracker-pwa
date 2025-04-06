export function formatTimestamp(timestampStr) {
  const options = {
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  return new Date(timestampStr).toLocaleString('en-US', options).replace(',', '');
}