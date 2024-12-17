const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatToDollars = (bill: number) => {
  return formatter.format(bill);
};

export default formatToDollars;
