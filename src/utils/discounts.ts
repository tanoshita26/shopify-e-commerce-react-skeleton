export const fetchCollectionDiscount = async (
  offer: string,
  handle: string,
  prices: any
) => {
  try {
    const abortController = new AbortController()
    const res = await fetch("/api/getCollectionDiscountedPricing", {
      method: "POST",
      body: JSON.stringify({ offer, handle, prices }),
      signal: abortController.signal,
    })
    const json = await res.json()

    if (res.ok) {
      console.log("Collection discount", json)
    }
  } catch (err: any) {
    console.log("Error fetching collection discount", err)
  }
}
