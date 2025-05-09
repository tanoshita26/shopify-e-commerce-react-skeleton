import React, { useEffect, useState, useContext } from "react"
import styled from "styled-components"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import PrescriptionTable from "../../components/prescription-table"
import Loader from "../../components/loader"
import { ErrorModalContext } from "../../contexts/error"

const Page = styled.div`
  h1 {
    text-align: center;
    text-transform: uppercase;
    font-weight: normal;
  }
  .page-desc {
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
    text-align: center;
    font-family: var(--sub-heading-font);
    color: var(--color-grey-dark);
  }
`

const ConfirmPrescription = () => {
  // get URL PARAMS and call hook

  const { renderErrorModal } = useContext(ErrorModalContext)
  const [orderId, setOrderId] = useState("")
  const [orderDetails, setOrderDetails] = useState<any>({})
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const isBrowser = typeof window !== "undefined"
    if (isBrowser) {
      const params = new URLSearchParams(location.search)
      const parsedId = params.get("id")
      if (parsedId) {
        const getOrderDetails = async (orderId: string) => {
          try {
            const url = "/api/getOrderDetails"
            const params: RequestInit = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                id: `gid://shopify/Order/${orderId}`,
              }),
            }
            const response = await fetch(url, params)
            const data = await response.json()
            let parsedPrescriptions = {}
            if (data.data.order) {
              const orderInfo = data.data.order
              const orderName = orderInfo.name
              const orderNote = orderInfo.note
              const filtered = orderInfo.lineItems.edges.filter(el => {
                const lineItem = el.node
                // find Prescription and frame Name custom Attr
                const prescriptionCustomAttr = lineItem.customAttributes.filter(
                  el =>
                    el.key === "Prescription" && el.value != "Non-Prescription"
                )
                // add to filtered array if prescription exists
                if (prescriptionCustomAttr.length !== 0) {
                  return lineItem
                }
              })
              parsedPrescriptions = {
                prescriptions: filtered,
                note: orderNote,
                name: orderName,
              }
              setOrderDetails(parsedPrescriptions)
              setOrderId(orderId)
              setShowContent(true)
            }
          } catch (err: any) {
            console.log("Error while fetching order details", err)
            renderErrorModal()
          }
        }
        getOrderDetails(parsedId)
      }
    }
  }, [])

  return (
    <Layout>
      <Page>
        <SEO title="Prescription Confirmation" />
        {!showContent ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <div className="wrapper">
              <h1>Thank you</h1>
              <p className="page-desc">
                Thank you for your purchase! Please confirm your prescription.
                Once you confirm your prescription, your purchase cannot be
                refunded.
              </p>
              <div>
                {orderDetails &&
                  orderDetails.prescriptions &&
                  orderDetails.prescriptions.length > 0 &&
                  orderDetails.prescriptions.map((el, index) => (
                    <PrescriptionTable
                      index={index + 1}
                      lineItem={el}
                      key={`pt-${index}`}
                      orderId={orderId}
                      orderDetails={orderDetails}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </Page>
    </Layout>
  )
}

export default ConfirmPrescription
