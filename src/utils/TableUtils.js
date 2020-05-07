export const sortTable = (arr, property, isSorted, setIsSorted) => {
  if (!isSorted) {
    setIsSorted(true);
    arr.sort((a, b) => (a[property] < b[property] ? -1 : 1));
  } else {
    setIsSorted(false);
    arr.sort((a, b) => (a[property] > b[property] ? -1 : 1));
  }
  return arr;
};
