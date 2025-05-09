import React, { useState } from "react"
import { navigate } from "gatsby"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

import styled from "styled-components"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Spinner from "../../components/spinner"
// import { countries } from "../../data/countries"

const Page = styled.div`
  h3 {
    margin: 10px 0;
  }
  .form-row {
    display: flex;
    direction: row;
    gap: 5px;
    align-items: center;
    margin-top: 10px;
    p {
      display: inline-block;
      margin: 0;
    }
  }
  .form-row-item {
    display: flex;
    gap: 5px;
    align-items: center;
    flex-grow: 1;
    input {
      flex-grow: 1;
    }
  }
  .form-column {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 10px;
    flex-grow: 1;
  }
  .sub-title {
    font-size: 1.2em;
    font-weight: bold;
    margin: 10px 0;
  }
  .brand-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .left-indent {
    margin-left: 20px;
  }
  .form-row-item-full {
    display: flex;
    gap: 5px;
    align-items: center;
    width: 100%;
    input {
      growth: 1;
      width: 100%;
    }
  }
  .error-message {
    p {
      margin: 0;
      color: red;
    }
  }
  .actions {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  .success-message {
    color: green;
  }
  .error-message {
    color: red;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    .spinner {
      color: white;
    }
  }
  @media only screen and (max-width: 468px) {
    .form-row.business-information-row,
    .form-row.address-row-1,
    .form-row.address-row-2 {
      flex-direction: column;
      gap: 5px;
      justify-content: left;
      align-items: flex-start;
      div {
        width: 100%;
      }
    }
  }
`

const Button = styled.button`
  min-height: 42px;
  min-width: 150px;
  border-radius: 0% !important;
  cursor: pointer;
  @media only screen and (max-width: 468px) {
    min-height: 40px;
    min-width: 140px;
  }
`

const ClearButton = styled.button`
  min-height: 42px;
  min-width: 150px;
  border-radius: 0% !important;
  cursor: pointer;
  @media only screen and (max-width: 468px) {
    min-height: 40px;
    min-width: 140px;
  }
`

interface InitialValue {
  storeName: string
  storeTel: string
  email: string
  address: string
  city: string
  stateProvince: string
  postalCode: string
  country: string
  owners: string
  authorizedBuyerContact: string
  businessType: string
  question1: string
  averageRetailPrice: string
  brand1: string
  brand2: string
  brand3: string
  question4: string
  question5: string
  question6: string
}

const initialValue: InitialValue = {
  storeName: "",
  storeTel: "",
  email: "",
  address: "",
  city: "",
  stateProvince: "",
  postalCode: "",
  country: "",
  owners: "",
  authorizedBuyerContact: "",
  businessType: "",
  question1: "",
  averageRetailPrice: "",
  brand1: "",
  brand2: "",
  brand3: "",
  question4: "",
  question5: "",
  question6: "",
}

// uncomment this to use test data
// const initialValue: InitialValue = {
//   storeName: "Demo Store",
//   storeTel: "1234567890",
//   address: "123 Test St",
//   city: "Test City",
//   stateProvince: "Test State",
//   postalCode: "12345",
//   country: "Test Country",
//   owners: "Test Owner",
//   authorizedBuyerContact: "Test Contact",
//   businessType: "Proprietorship",
//   question1: "Test Question 1",
//   averageRetailPrice: "Less than $25",
//   brand1: "Test Brand 1",
//   brand2: "Test Brand 2",
//   brand3: "Test Brand 3",
//   question4: "Test Question 4",
//   question5: "Test Question 5",
//   question6: "Test Question 6",
// }

const todaysDate = new Date()
const formattedDate = `${(todaysDate.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${todaysDate
  .getDate()
  .toString()
  .padStart(2, "0")}-${todaysDate.getFullYear()}`

const phoneRegExp = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/

const Contact = () => {
  const resolver = yup.object({
    storeName: yup.string().required("Store name is required"),
    // storeTel: yup.string().required("Store telephone is required"),
    storeTel: yup
      .string()
      .required("Store telephone is required")
      .matches(phoneRegExp, "Phone number is not valid"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    stateProvince: yup.string().required("State / Province is required"),
    postalCode: yup.string().required("Postal Code is required"),
    country: yup.string().required("Country is required"),
    owners: yup.string().required("Owner(s) is required"),
    authorizedBuyerContact: yup
      .string()
      .required("Authorized Buyer / Contact is required"),
    businessType: yup.string().required("Business Type is required"),
    question1: yup.string().required("Question 1 is required"),
    averageRetailPrice: yup
      .string()
      .required("Average retail price is required"),
    brand1: yup.string().required("Brand 1 is required"),
    brand2: yup.string().required("Brand 2 is required"),
    brand3: yup.string().required("Brand 3 is required"),
    question4: yup.string().required("Question 4 is required"),
    question5: yup.string().required("Question 5 is required"),
    question6: yup.string().required("Question 6 is required"),
  })

  const form = useForm({
    defaultValues: initialValue,
    resolver: yupResolver(resolver),
  })

  // state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  const resetState = () => {
    setIsError(false)
    setIsSuccess(false)
  }

  const onSubmit = async (data: typeof initialValue) => {
    try {
      resetState()
      setIsSubmitting(true)
      console.log("Form submitted with data:", data)
      const response = await fetch("/api/newDealerApplication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...data,
          date: formattedDate,
        }),
      })
      const json = await response.json()
      if (response.status !== 200) {
        throw Error(JSON.stringify(response.status))
      }
      console.log("Form submission response:", json)
      setIsSubmitting(false)
      setIsSuccess(true)
      form.reset()
      setTimeout(() => {
        resetState()
      }, 3000)
      navigate("/pages/thank-you")
    } catch (error) {
      setIsSubmitting(false)
      setIsError(true)
      console.error("Error submitting form:", error)
    }
  }

  return (
    <Layout>
      <Page className="wrapper">
        <SEO title="New Dealer Application" />
        <h1>New Dealer Application</h1>
        <div className="container">
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            method="post"
            className="grid-form"
            name="dealer-application"
          >
            <input type="hidden" name="bot-field" />
            <input type="hidden" name="form-name" value="contact" />
            <section className="information">
              <h3>Information</h3>
              <div className="form-row">
                <div className="form-column">
                  <div className="form-row-item">
                    <label htmlFor="store-name">Store Name</label>
                    <input {...form.register("storeName")} id="store-name" />
                  </div>
                  <div className="error-message">
                    {form.formState.errors.storeName?.message && (
                      <p>{form.formState.errors.storeName?.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-row business-information-row">
                <div className="form-column">
                  <div className="form-row-item">
                    <label htmlFor="email">Email</label>
                    <input {...form.register("email")} id="email" required />
                  </div>
                  <div className="error-message">
                    {form.formState.errors.email?.message && (
                      <p>{form.formState.errors.email?.message}</p>
                    )}
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-row-item">
                    <label htmlFor="store-tel">Tel</label>
                    <input
                      {...form.register("storeTel")}
                      id="store-tel"
                      required
                    />
                  </div>
                  <div className="error-message">
                    {form.formState.errors.storeTel?.message && (
                      <p>{form.formState.errors.storeTel?.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className="store-address">
              <h3>Store Address</h3>
              <div className="form-row address-row-1">
                <div className="form-column">
                  <div className="form-row-item">
                    <label htmlFor="address">Address</label>
                    <input
                      {...form.register("address")}
                      id="address"
                      required
                    />
                  </div>
                  <div className="error-message">
                    {form.formState.errors.address?.message && (
                      <p>{form.formState.errors.address?.message}</p>
                    )}
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-row-item">
                    <label htmlFor="city">City</label>
                    <input {...form.register("city")} id="city" required />
                  </div>
                  <div className="error-message">
                    {form.formState.errors.city?.message && (
                      <p>{form.formState.errors.city?.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-row address-row-2">
                <div className="form-column">
                  <div className="form-row-item">
                    <label htmlFor="state-province">State / Province</label>
                    <input
                      {...form.register("stateProvince")}
                      id="state-province"
                      required
                    />
                  </div>
                  <div className="error-message">
                    {form.formState.errors.stateProvince?.message && (
                      <p>{form.formState.errors.stateProvince?.message}</p>
                    )}
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-row-item">
                    <label htmlFor="postal-code">Postal Code</label>
                    <input
                      {...form.register("postalCode")}
                      id="postal-code"
                      required
                    />
                  </div>
                  <div className="error-message">
                    {form.formState.errors.postalCode?.message && (
                      <p>{form.formState.errors.postalCode?.message}</p>
                    )}
                  </div>
                </div>
                <div className="form-column">
                  <div className="form-row-item">
                    <label htmlFor="country">Country</label>
                    <input
                      {...form.register("country")}
                      id="country"
                      required
                    />
                    {/* <select
                      {...form.register("country")}
                      id="country"
                      required
                      defaultValue="US"
                    >
                      {countries.map(country => (
                        <option
                          key={country.code}
                          value={country.code}
                          selected={country.code === "US"}
                        >
                          {country.name}
                        </option>
                      ))}
                    </select> */}
                  </div>
                  <div className="error-message">
                    {form.formState.errors.country?.message && (
                      <p>{form.formState.errors.country?.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className="business-information">
              <div className="form-column">
                <h3>Business Information</h3>
                <div className="form-row">
                  <p>Type of Business:</p>
                  <input
                    {...form.register("businessType")}
                    type="radio"
                    id="proprietorship"
                    value="Proprietorship"
                  />
                  <label htmlFor="proprietorship">Proprietorship</label>
                  <input
                    {...form.register("businessType")}
                    type="radio"
                    id="partnership"
                    value="Partnership"
                  />
                  <label htmlFor="partnership">Partnership</label>
                  <input
                    {...form.register("businessType")}
                    type="radio"
                    id="corporation"
                    value="Corporation"
                  />
                  <label htmlFor="corporation">Corporation</label>
                </div>
                <div className="error-message">
                  {form.formState.errors.businessType?.message && (
                    <p>{form.formState.errors.businessType?.message}</p>
                  )}
                </div>
              </div>
              <div className="form-row">
                <div className="form-column">
                  <div className="form-row-item">
                    <label htmlFor="owners">Owner(s)</label>
                    <input {...form.register("owners")} id="owners" required />
                  </div>
                  <div className="error-message">
                    {form.formState.errors.owners?.message && (
                      <p>{form.formState.errors.owners?.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-row">
                <div className="form-column">
                  <div className="form-row-item">
                    <label htmlFor="authorized-buyer-contact">
                      Authorized Buyer / Contact
                    </label>
                    <input
                      {...form.register("authorizedBuyerContact")}
                      id="authorized-buyer-contact"
                      required
                    />
                  </div>
                  <div className="error-message">
                    {form.formState.errors.authorizedBuyerContact?.message && (
                      <p>
                        {form.formState.errors.authorizedBuyerContact?.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
            <section className="more-information">
              <p className="sub-title">Please Complete the following:</p>
              <div className="form-column">
                <label htmlFor="question-1">
                  1. Do you currently carry other sunglass brands? If so, what
                  brands?
                </label>
                <textarea
                  {...form.register("question1")}
                  id="question-1"
                  required
                />
                <div className="error-message">
                  {form.formState.errors.question1?.message && (
                    <p>{form.formState.errors.question1?.message}</p>
                  )}
                </div>
              </div>
              <div className="form-column">
                <div className="form-row">
                  <label htmlFor="average-retail-price">
                    2. What is the average retail price of accessories / watches
                    / handbags sold in your store?
                  </label>
                  <select
                    {...form.register("averageRetailPrice")}
                    id="average-retail-price"
                  >
                    <option value="Less than $25">Less than $25</option>
                    <option value="$25 - $50">$25 - $50</option>
                    <option value="$50 - $75">$50 - $75</option>
                    <option value="$75 - $150">$75 - $150</option>
                    <option value="$150 - $300">$150 - $300</option>
                    <option value="$300+">$300+</option>
                  </select>
                </div>
                <div className="error-message">
                  {form.formState.errors.averageRetailPrice?.message && (
                    <p>{form.formState.errors.averageRetailPrice?.message}</p>
                  )}
                </div>
              </div>
              <div className="form-column">
                <label>3. List 3 of your current top selling brands:</label>
                <div className="brand-list left-indent">
                  <div className="form-column">
                    <div className="form-row-item-full">
                      <label htmlFor="brand-1">1.</label>
                      <input
                        {...form.register("brand1")}
                        id="brand-1"
                        required
                      />
                    </div>
                    <div className="error-message">
                      {form.formState.errors.brand1?.message && (
                        <p>{form.formState.errors.brand1?.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-column">
                    <div className="form-row-item-full">
                      <label htmlFor="brand-2">2.</label>
                      <input
                        {...form.register("brand2")}
                        id="brand-2"
                        required
                      />
                    </div>
                    <div className="error-message">
                      {form.formState.errors.brand2?.message && (
                        <p>{form.formState.errors.brand2?.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="form-column">
                    <div className="form-row-item-full">
                      <label htmlFor="brand-3">3.</label>
                      <input
                        {...form.register("brand3")}
                        id="brand-3"
                        required
                      />
                    </div>
                    <div className="error-message">
                      {form.formState.errors.brand3?.message && (
                        <p>{form.formState.errors.brand3?.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-column">
                <label htmlFor="question-4">
                  4. How would you describe the demographic of your customer?
                </label>
                <textarea
                  {...form.register("question4")}
                  id="question-4"
                  required
                />
                <div className="error-message">
                  {form.formState.errors.question4?.message && (
                    <p>{form.formState.errors.question4?.message}</p>
                  )}
                </div>
              </div>
              <div className="form-column">
                <label htmlFor="question-5">
                  5. Briefly describe the look and feel of your store.
                </label>
                <textarea
                  {...form.register("question5")}
                  id="question-5"
                  required
                />
                <div className="error-message">
                  {form.formState.errors.question5?.message && (
                    <p>{form.formState.errors.question5?.message}</p>
                  )}
                </div>
              </div>
              <div className="form-column">
                <label htmlFor="question-6">
                  6. List of Business Social Media Accounts (Instagram,
                  Facebook, etc.)
                </label>
                <textarea
                  {...form.register("question6")}
                  id="question-6"
                  required
                />
                <div className="error-message">
                  {form.formState.errors.question6?.message && (
                    <p>{form.formState.errors.question6?.message}</p>
                  )}
                </div>
              </div>
            </section>
            <section className="submission-information">
              <p>Date: {formattedDate}</p>
              <div className="actions">
                <Button type="submit" className="btn" disabled={isSubmitting}>
                  {isSubmitting ? <Spinner /> : `Submit`}
                </Button>
                <Button
                  type="button"
                  onClick={() => form.reset()}
                  disabled={isSubmitting}
                >
                  Clear
                </Button>
              </div>
            </section>
          </form>
          {isSuccess && (
            <p className="success-message">Submitted Successfully</p>
          )}
          {isError && (
            <p className="error-message">
              There was an error submitting the form. Please try again.
            </p>
          )}
        </div>
        {isSubmitting && (
          <div className="overlay">
            <div className="spinner">
              SUBMITTING, THIS MIGHT TAKE A MIN... <Spinner />
            </div>
          </div>
        )}
      </Page>
    </Layout>
  )
}

export default Contact
