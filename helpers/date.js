export const parseTimeStamp = (timeStamp) => {
  if (timeStamp.toString().length > 10) {
    return new Date(timeStamp).toLocaleDateString();
  }
  return new Date(timeStamp * 1000).toLocaleDateString();
};
