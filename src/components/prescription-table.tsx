import React, { useEffect, useState, useContext } from "react"
import styled from "styled-components"
import Loader from "./loader"
import { ErrorModalContext } from "../contexts/error"

const Component = styled.div`
  margin: 20px 0;
  p {
    font-family: var(--sub-heading-font);
    margin: 0;
    margin-bottom: 8px;
  }
  table {
    border: 1px solid black;
    tbody {
      tr {
        th {
          font-family: var(--heading-font);
          font-weight: normal;
        }
        td {
          font-family: var(--sub-heading-font);
          font-weight: normal;
        }
        th,
        td {
          border: 1px solid black;
          text-align: center;
          vertical-align: middle;
          padding: 10px 0;
        }
      }
    }
  }
  .button-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    input[type="file"] {
      ::file-selector-button {
        font-family: var(--heading-font);
        background-color: #000;
        /* box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.6); */
        color: #fff;
        display: inline-block;
        font-size: 0.8rem;
        padding: 2px 10px;
        text-decoration: none;
        cursor: pointer;
        -webkit-appearance: button-bevel;
        border: none;
        border-radius: 0%;
      }
      overflow: visible;
    }
    .btn {
      text-transform: uppercase;
      font-family: var(--heading-font);
    }
    p {
      font-family: var(--sub-heading-font);
      margin: 0;
      text-align: center;
    }
    .middle {
      p {
        margin: 6px 0;
      }
    }
  }
  .hide {
    display: none;
  }
  .show {
    display: block;
  }
  .confirmed {
    p {
      color: green;
      text-align: center;
    }
  }
  .button-flex-row {
    display: flex;
  }
  .upload-row {
    margin-top: 20px;
    display: flex;
    column-gap: 30px;
    @media screen and (max-width: 480px) {
      flex-direction: column;
      justify-content: center;
      align-items: stretch;
      row-gap: 20px;
    }
  }
  .success-msg {
    color: green;
    text-align: center;
    padding: 10px 0px;
  }
`

interface rxDetails {
  sph: string
  cyl: string
  axis: string
  add: string
  pd: string
}
interface rxType {
  right: rxDetails
  left: rxDetails
}

const PrescriptionTable = ({ lineItem, index, orderId, orderDetails }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showSuccess, setShowSuccess] = useState<boolean>(false)
  const [showLoader, setShowLoader] = useState<boolean>(false)

  const { renderErrorModal } = useContext(ErrorModalContext)

  const customAttr = lineItem.node.customAttributes.filter(
    el => el.key === "Prescription"
  )
  const foundFrameKey = lineItem.node.customAttributes.find(
    el => el.key === "_frameName"
  )
  const customId = lineItem.node.customAttributes.filter(
    el => el.key === "customizationId"
  )[0].value

  const frameName = foundFrameKey ? foundFrameKey.value : "Frame"
  const frameIdentifier = `${frameName}- (${customId}): `

  const prescription = JSON.parse(customAttr[0].value) as rxType

  const orderNote = orderDetails.note

  const hasUploadedImage = async () => {
    if (!orderNote) return
    const orderNoteArr = orderNote.split(/\r?\n/)
    orderNoteArr.forEach(str => {
      if (str.includes(frameIdentifier)) {
        setShowSuccess(true)
      }
    })
  }

  useEffect(() => {
    hasUploadedImage()
  }, [])

  // returnd data ur given a file
  const getBase64Image = async file => {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        const base64data = reader.result
        resolve(base64data)
      }
    })
  }

  // fetches order note in realtime so multiple frames dont overlap each other when it comes to adding order note
  const fetchMostCurrentOrderNote = async () => {
    try {
      const endpoint = "/api/getCurrentOrderNote"
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          id: orderId,
        }),
      })
      const resJson = await res.json()
      return resJson.order.note
    } catch (error) {
      console.error("Error while fetching most current order note", error)
      renderErrorModal()
    }
  }

  const markMetafieldAsTrue = async () => {
    try {
      const endpoint = "/api/updateReminderMetafield"
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          id: orderId,
        }),
      })
      const resJson = await res.json()
      return resJson
    } catch (error) {
      console.error("Error while fetching most current order note", error)
      renderErrorModal()
    }
  }

  const uploadPrescriptionImage = async () => {
    try {
      if (!selectedFile) {
        return
      }
      setShowLoader(true)
      const endpoint = "/api/uploadPrescription"
      const results = await getBase64Image(selectedFile)
      const formData = new FormData()
      //@ts-ignore results holds the base64 encoded file
      formData.append("file", results)
      formData.append("name", `${frameName}-${index}-${orderId}`)

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      })
      if (res.ok) {
        const resJson = await res.json()
        const url = resJson.url
        const r = await updateOrderNote(url)
        const x = await markMetafieldAsTrue()
      }
      setShowLoader(false)
    } catch (error) {
      console.error("Error while calling uploadPrescriptionImage", error)
      renderErrorModal()
    }
  }

  const handleUpload = async () => {
    const res = await uploadPrescriptionImage()
  }

  const formatMeasurement = (msmt: string) => {
    if (msmt === "0.00" || msmt === "00.00" || msmt === "0") {
      return ""
    }
    return msmt
  }
  const confirmClicked = () => {
    setShowSuccess(true)
    updateOrderNote("")
    markMetafieldAsTrue()
    // add frame to order note and mark as confirmed
  }

  const updateOrderNote = async (url: string) => {
    let newNote: string = ""
    const currentNote = await fetchMostCurrentOrderNote()
    if (currentNote === "" || !currentNote) {
      newNote = ""
    } else if (!currentNote.endsWith("\n")) {
      newNote = currentNote + "\n"
    } else {
      newNote = currentNote
    }
    if (url !== "") {
      newNote += frameIdentifier + url + "\n"
    } else {
      newNote += frameIdentifier + "confirmed" + "\n"
    }
    try {
      const endpoint = "/api/addOrderNote"
      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify({
          note: newNote,
          id: orderId,
        }),
      })
      if (res.ok) {
        setShowSuccess(true)
      } else {
        // must've been an error
        renderErrorModal()
      }
    } catch (error) {
      console.error("Error while calling uploadOrderNote", error)
      renderErrorModal()
    }
  }

  return (
    <Component>
      <>
        <p>
          {index}. {frameName}
        </p>
        <div>
          <table>
            <tbody>
              <tr>
                <td></td>
                <th>SPH</th>
                <th>CYL</th>
                <th>AXIS</th>
                <th>ADD</th>
                <th>PD</th>
              </tr>
              <tr>
                <th>OD</th>
                <td>{formatMeasurement(prescription.right.sph)}</td>
                <td>{formatMeasurement(prescription.right.cyl)}</td>
                <td>{formatMeasurement(prescription.right.axis)}</td>
                <td>{formatMeasurement(prescription.right.add)}</td>
                <td>{formatMeasurement(prescription.right.pd)}</td>
              </tr>
              <tr>
                <th>OS</th>
                <td>{formatMeasurement(prescription.left.sph)}</td>
                <td>{formatMeasurement(prescription.left.cyl)}</td>
                <td>{formatMeasurement(prescription.left.axis)}</td>
                <td>{formatMeasurement(prescription.left.add)}</td>
                <td>{formatMeasurement(prescription.left.pd)}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {!showSuccess && !showLoader ? (
          <div>
            <div className="confirmed hide">
              <p>This prescription has been confirmed.</p>
            </div>
            <div className="button-flex">
              <button className="btn" onClick={evt => confirmClicked()}>
                Confirm
              </button>
              <div className="middle">
                <p>- OR -</p>
                <p>Let us confirm for you</p>
              </div>
              <div className="upload-row">
                <input
                  type="file"
                  name="prescriptionImage"
                  id="prescriptionImage"
                  accept="image/*,application/pdf"
                  onChange={
                    /* @ts-ignore */
                    evt => setSelectedFile(evt.target.files[0])
                  }
                />
                <button className="btn" onClick={evt => handleUpload()}>
                  Upload
                </button>
              </div>
            </div>
          </div>
        ) : !showSuccess && showLoader ? (
          <Loader />
        ) : (
          <>
            <SuccessMessage frameName={frameName} />
          </>
        )}
      </>
    </Component>
  )
}

const SuccessMessage = ({ frameName }) => {
  return (
    <div className="success-msg">
      <p>Your prescription for {frameName} has been confirmed.</p>
    </div>
  )
}

export default PrescriptionTable
