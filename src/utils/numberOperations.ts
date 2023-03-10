export const formatNumberToString = (num: number): string => {
  const parts = num.toString().split(".");
  return (
    parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
    (parts[1] ? "," + parts[1] : "")
  );
};
