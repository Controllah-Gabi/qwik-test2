export const generateProductDescription = (
  name: string,
  colors: string,
): string => {
  const cleanName: string = name
    ?.toLowerCase()
    .trim()
    .replace(/[()]/g, '')
    .replace('&', '')
    .replace(/\s+/g, '-');

  // Replace spaces and slashes with dashes in colors string
  const cleanColors: string = colors
    ?.toLowerCase()
    .trim()
    .replace(/[()]/g, '')
    .replace('&', '')
    .replace(/[ /]/g, '-');

  // Combine the cleaned name and colors into a URL-friendly product description
  const productDescription: string = `${cleanName}-${cleanColors}`;

  return productDescription;
};
