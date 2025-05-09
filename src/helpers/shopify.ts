// determines whether a product is discounted for on sale
export function isDiscounted(
  price: number | string,
  compareAtPrice: number | string |  null
) {
  if (compareAtPrice === null) return false;
  if (typeof price === "string") price = parseFloat(price)
  if (typeof compareAtPrice === "string")
    compareAtPrice = parseFloat(compareAtPrice)
  if (price === 0 || compareAtPrice === 0) return false
  if (compareAtPrice > price) {
    return true
  }
  return false
}

export function formatPrice(price: number) {
  if ( Math.round(price * 100) / 100 === Math.floor(price)) return price.toFixed(0)
  return price.toFixed(2)
}
