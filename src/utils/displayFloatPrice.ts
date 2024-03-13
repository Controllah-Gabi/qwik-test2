export const displayFloatPrice = (price: number) => {
  const formattedPrice: string = parseFloat(`${price}`).toFixed(2);

  const decimalPart: string =
    //@ts-ignore
    formattedPrice % 1 !== 0 ? formattedPrice.slice(-2) : '';

  const displayPrice: string =
    decimalPart !== ''
      ? `${formattedPrice}`
      : `${parseInt(formattedPrice, 10)}`;

  return displayPrice;
};
