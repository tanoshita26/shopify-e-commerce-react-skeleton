import React from "react"
import styled from "styled-components"
import Layout from "../../components/layout"
import SEO from "../../components/seo"

const Page = styled.div`
  h1 {
    text-align: center;
  }
  h1,
  h4 {
    font-weight: normal;
    text-transform: uppercase;
  }
  h4 {
    font-size: 1.4em;
  }
  a {
    color: black;
    text-decoration: none;
  }
  table {
    margin-bottom: 30px;
  }
  p,
  li,
  td,
  th,
  span {
    font-family: var(--sub-heading-font);
    color: var(--color-grey-dark);
  }
  thead {
    tr {
      th {
        border-bottom: 1px solid black;
      }
    }
  }
  .subheading {
    text-transform: uppercase;
    color: black;
    margin-bottom: 0;
    margin-top: 16px;
    font-weight: bold;
  }
  strong {
    color: black;
    font-weight: normal;
  }
  .black {
    color: black;
  }
  a {
    color: black;
    &:hover,
    &:active,
    &:focus {
      color: var(--color-grey-dark);
    }
    &:visited {
      color: black;
    }
  }
  h4 {
    margin-bottom: 10px;
    padding-top: 25px;
  }
  ul {
    margin-left: 0;
    li {
      margin-bottom: 0;
      list-style-type: none;
    }
  }
  p {
    margin-bottom: 16px;
  }
  .big-bullet {
    font-size: 1em;
    margin-left: 6px;
    margin-right: 8px;
    vertical-align: baseline;
  }
  article {
    margin-bottom: 0;
  }
  .no-margin {
    margin: 0;
  }
  section {
    p {
      :first-of-type {
        padding-bottom: 5px;
      }
    }
  }
  address {
    margin-bottom: none;
    font-style: normal;
  }
`

const PrivacyPolicy = () => (
  <Layout>
    <SEO title="Privacy Policy" />
    <Page className="wrapper">
      <h1>Privacy Policy</h1>
      <section>
        <p>
          This Privacy Policy describes how www.tresnoir.com (the “Site” or
          “we”) collects, uses, and discloses your Personal Information when you
          visit or make a purchase from the Site.
        </p>

        <article>
          <h4>Collecting Personal Information</h4>
          <p>
            When you visit the Site, we collect certain information about your
            device, your interaction with the Site, and information necessary to
            process your purchases. We may also collect additional information
            if you contact us for customer support. In this Privacy Policy, we
            refer to any information that can uniquely identify an individual
            (including the information below) as “Personal Information”. See the
            list below for more information about what Personal Information we
            collect and why.
          </p>
          <p className="subheading">Device Information</p>
          <ul>
            <li>
              <span className="big-bullet">&#8226;</span>
              <strong>Examples of Personal Information collected:</strong>{" "}
              version of web browser, IP address, time zone, cookie information,
              what sites or products you view, search terms, and how you
              interact with the Site
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>
              <strong>Purpose of collection:</strong> to load the Site
              accurately for you, and to perform analytics on Site usage to
              optimize our Site.
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>
              <strong>Source of collection: </strong>Collected automatically
              when you access our Site using cookies, log files, web beacons,
              tags, or pixels.
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>
              <strong>Disclosure for a business purpose: </strong>shared with
              our processor Shopify.
            </li>
          </ul>

          <p className="subheading">Order Information</p>

          <ul>
            <li>
              <span className="big-bullet">&#8226;</span>
              <strong>Examples of Personal Information collected: </strong>name,
              billing address, shipping address, payment information (including
              credit card numbers), email address, and phone number.
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>
              <strong>Purpose of collection: </strong>to provide products or
              services to you to fulfill our contract, to process your payment
              information, arrange for shipping, and provide you with invoices
              and/or order confirmations, communicate with you, screen our
              orders for potential risk or fraud, and when in line with the
              preferences you have shared with us, provide you with information
              or advertising relating to our products or services.
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>
              <strong>Source of collection: </strong>collected from you.
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>
              <strong>Disclosure for a business purpose: </strong>shared with
              our processor Shopify.
            </li>
          </ul>

          <p className="subheading">Customer Support Information</p>
          <ul>
            <li>
              <span className="big-bullet">&#8226;</span>
              <strong>Examples of Personal Information collected:</strong> Name,
              email address, phone number
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>
              <strong>Purpose of collection: </strong>to provide customer
              support.
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>
              <strong>Source of collection: </strong>
              collected from you.
            </li>
          </ul>

          <p className="subheading">Sharing Personal Informtion</p>
          <p>
            We share your Personal Information with service providers to help us
            provide our services and fulfill our contracts with you, as
            described above.
          </p>
          <span className="black">For example:</span>
          <ul>
            <li>
              <span className="big-bullet">&#8226;</span>
              We use Shopify to power our online store. You can read more about
              how Shopify uses your Personal Information{" "}
              <a
                href=" https://www.shopify.com/legal/privacy"
                rel="noreferrer"
                target="_blank"
              >
                here
              </a>
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>
              We may share your Personal Information to comply with applicable
              laws and regulations, to respond to a subpoena, search warrant or
              other lawful request for information we receive, or to otherwise
              protect our rights.
            </li>
          </ul>
        </article>

        <article>
          <h4>Behavioral Advertising</h4>
          <p>
            As described above, we use your Personal Information to provide you
            with targeted advertisements or marketing communications we believe
            may be of interest to you.
          </p>
          <span className="black">For example:</span>
          <ul>
            <li>
              <span className="big-bullet">&#8226;</span>
              We use Google Analytics to help us understand how our customers
              use the Site. You can read more about how Google uses your
              Personal Information{" "}
              <a
                href=" https://policies.google.com/privacy?hl=en"
                rel="noreferrer"
                target="_blank"
              >
                here
              </a>
              . You can also opt-out of Google Analytics{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                rel="noreferrer"
                target="_blank"
              >
                here.
              </a>
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>
              We share information about your use of the Site, your purchases,
              and your interaction with our ads on other websites with our
              advertising partners. We collect and share some of this
              information directly with our advertising partners, and in some
              cases through the use of cookies or other similar technologies
              (which you may consent to, depending on your location).
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>
              Other advertising services that we use include Facebook and
              Instagram.
            </li>
          </ul>
          <p>
            For more information about how targeted advertising works, you can
            visit the{" "}
            <a
              href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work"
              rel="noreferrer"
              target="_blank"
            >
              Network Advertising Initiative's (“NAI”) educational page
            </a>
            .
          </p>
          <p>You can opt out of targeted advertising by:</p>
          <ul>
            <li>
              <span className="big-bullet">&#8226;</span>
              <a
                href="https://www.facebook.com/settings/?tab=ads"
                rel="noreferrer"
                target="_blank"
              >
                FACEBOOK and INSTAGRAM
              </a>
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>
              <a
                href="https://www.google.com/settings/ads/anonymous"
                rel="noreferrer"
                target="_blank"
              >
                GOOGLE
              </a>
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>
              <a
                href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads"
                rel="noreferrer"
                target="_blank"
              >
                BING
              </a>
            </li>
          </ul>
          <p>
            Additionally, you can opt out of some of these services by visiting
            the{" "}
            <a
              href=" http://optout.aboutads.info/"
              rel="noreferrer"
              target="_blank"
            >
              Digital Advertising Alliance's opt-out portal
            </a>
            .
          </p>
        </article>

        <article>
          <h4>Using Personal Information</h4>
          <p>
            We use your personal Information to provide our services to you,
            which includes: offering products for sale, processing payments,
            shipping and fulfillment of your order, and keeping you up to date
            on new products, services, and offers.
          </p>
          <p className="subheading">Lawful Basis</p>
          <p className="no-margin">
            Pursuant to the General Data Protection Regulation (“GDPR”), if you
            are a resident of the European Economic Area (“EEA”), we process
            your personal information under the following lawful bases:
          </p>
          <ul>
            <li>
              <span className="big-bullet">&#8226;</span>Your Consent
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>The performance of the
              contract between you and the Site;
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>Compliance with our
              legal obligations;
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>To protect your vital
              interests;
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>To perform a task
              carried out in the public interest;
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>
              For our legitimate interests, which do not override your
              fundamental rights and freedoms.
            </li>
          </ul>
          <p className="subheading">Retention</p>
          <p>
            When you place an order through the Site, we will retain your
            Personal Information for our records unless and until you ask us to
            erase this information. For more information on your right of
            erasure, please see the 'Your rights' section below.
          </p>
          <p className="subheading">Automatic Decision-Making</p>
          <p>
            If you are a resident of the EEA, you have the right to object to
            processing based solely on automated decision-making (which includes
            profiling), when that decision-making has a legal effect on you or
            otherwise significantly affects you.
          </p>
          <p>
            We DO NOT engage in fully automated decision-making that has a legal
            or otherwise significant effect using customer data.
          </p>
          <p>
            Our processor Shopify uses limited automated decision-making to
            prevent fraud that does not have a legal or otherwise significant
            effect on you.
          </p>
          <p className="no-margin">
            Services that include elements of automated decision-making include:
          </p>
          <ul>
            <li>
              <span className="big-bullet">&#8226;</span>
              Temporary denylist of IP addresses associated with repeated failed
              transactions. This denylist persists for a small number of hours.
            </li>
            <li>
              <span className="big-bullet">&#8226;</span>
              Temporary denylist of credit cards associated with denylisted IP
              addresses. This denylist persists for a small number of days.
            </li>
          </ul>
          <h4>Selling Personal Information</h4>
          <p>
            Our Site does not sell Personal Information, as defined by the
            California Consumer Privacy Act of 2018 (“CCPA”).
          </p>
          <h4>Your Rights</h4>
          <p className="subheading">GDPR</p>
          <p>
            If you are a resident of the EEA, you have the right to access the
            Personal Information we hold about you, to port it to a new service,
            and to ask that your Personal Information be corrected, updated, or
            erased. If you would like to exercise these rights, please contact
            us through the contact information below.
          </p>
          <p>
            Your Personal Information will be initially processed in Ireland and
            then will be transferred outside of Europe for storage and further
            processing, including to Canada and the United States. For more
            information on how data transfers comply with the GDPR, see
            Shopify's{" "}
            <a
              href="https://help.shopify.com/en/manual/your-account/privacy/GDPR"
              rel="noreferrer"
              target="_blank"
            >
              GDPR Whitepaper
            </a>
            .
          </p>
          <p className="subheading">CCPA</p>
          <p>
            If you are a resident of California, you have the right to access
            the Personal Information we hold about you (also known as the 'Right
            to Know'), to port it to a new service, and to ask that your
            Personal Information be corrected, updated, or erased. If you would
            like to exercise these rights, please contact us through the contact
            information below.
          </p>
          <p>
            If you would like to designate an authorized agent to submit these
            requests on your behalf, please contact us at the address below.
          </p>
        </article>

        <article>
          <h4>Cookies</h4>
          <p>
            A cookie is a small amount of information that's downloaded to your
            computer or device when you visit our Site. We use a number of
            different cookies, including functional, performance, advertising,
            and social media or content cookies. Cookies make your browsing
            experience better by allowing the website to remember your actions
            and preferences (such as login and region selection). This means you
            don't have to re-enter this information each time you return to the
            site or browse from one page to another. Cookies also provide
            information on how people use the website, for instance whether it's
            their first time visiting or if they are a frequent visitor.
          </p>
          <p>
            We use the following cookies to optimize your experience on our Site
            and to provide our services.
          </p>
          <h4>Cookies Necessary for the Functioning of the Store</h4>
          <table>
            <thead>
              <tr>
                <th>
                  <strong>NAME</strong>
                </th>
                <th>
                  <strong>Function</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <i>_ab</i>
                </td>
                <td>Used in connection with access to admin.</td>
              </tr>
              <tr>
                <td>
                  <i>_secure_session_id </i>
                </td>
                <td>
                  Used in connection with navigation through a storefront.
                </td>
              </tr>
              <tr>
                <td>
                  <i>cart</i>
                </td>
                <td>Used in connection with shopping cart.</td>
              </tr>
              <tr>
                <td>
                  <i>cart_sig </i>
                </td>
                <td>Used in connection with checkout.</td>
              </tr>
              <tr>
                <td>
                  <i>cart_ts </i>
                </td>
                <td>Used in connection with checkout.</td>
              </tr>
              <tr>
                <td>
                  <i>checkout_token </i>
                </td>
                <td>Used in connection with checkout.</td>
              </tr>
              <tr>
                <td>
                  <i>secret </i>
                </td>
                <td>Used in connection with checkout.</td>
              </tr>
              <tr>
                <td>
                  <i>secure_customer_sig </i>
                </td>
                <td>Used in connection with customer login.</td>
              </tr>
              <tr>
                <td>
                  <i>storefront_digest </i>
                </td>
                <td>Used in connection with customer login.</td>
              </tr>
              <tr>
                <td>
                  <i>_shopify_u </i>
                </td>
                <td>
                  Used to facilitate updating customer account information.
                </td>
              </tr>
            </tbody>
          </table>
          <h4>Reporting and Analytics</h4>
          <table>
            <thead>
              <tr>
                <th>
                  <strong>NAME</strong>
                </th>
                <th>
                  <strong>Function</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <i>_tracking_consent </i>
                </td>
                <td>Tracking preferences.</td>
              </tr>
              <tr>
                <td>
                  <i>_landing_page </i>
                </td>
                <td>Track landing pages</td>
              </tr>
              <tr>
                <td>
                  <i>_orig_referrer</i>
                </td>
                <td>Track landing pages</td>
              </tr>
              <tr>
                <td>
                  <i>_s </i>
                </td>
                <td>Shopify analytics.</td>
              </tr>
              <tr>
                <td>
                  <i>_shopify_fs </i>
                </td>
                <td>Shopify analytics.</td>
              </tr>
              <tr>
                <td>
                  <i>_shopify_s </i>
                </td>
                <td>Shopify analytics.</td>
              </tr>
              <tr>
                <td>
                  <i>_shopify_sa_p </i>
                </td>
                <td>Shopify analytics relating to marketing & referrals.</td>
              </tr>
              <tr>
                <td>
                  <i>_shopify_sa_t </i>
                </td>
                <td>Shopify analytics relating to marketing & referrals.</td>
              </tr>
              <tr>
                <td>
                  <i>_shopify_y </i>
                </td>
                <td>Shopify analytics.</td>
              </tr>
              <tr>
                <td>
                  <i>_y </i>
                </td>
                <td>Shopify analytics.</td>
              </tr>
            </tbody>
          </table>
          <p>
            The length of time that a cookie remains on your computer or mobile
            device depends on whether it is a “persistent” or “session” cookie.
            Session cookies last until you stop browsing and persistent cookies
            last until they expire or are deleted. Most of the cookies we use
            are persistent and will expire between 30 minutes and two years from
            the date they are downloaded to your device.
          </p>
          <p>
            You can control and manage cookies in various ways. Please keep in
            mind that removing or blocking cookies can negatively impact your
            user experience and parts of our website may no longer be fully
            accessible.
          </p>
          <p>
            Most browsers automatically accept cookies, but you can choose
            whether or not to accept cookies through your browser controls,
            often found in your browser's “Tools” or “Preferences” menu. For
            more information on how to modify your browser settings or how to
            block, manage or filter cookies can be found in your browser's help
            file or through such sites as{" "}
            <a href="www.allaboutcookies.org" rel="noreferrer" target="_blank">
              www.allaboutcookies.org
            </a>
            .
          </p>
          <p>
            Additionally, please note that blocking cookies may not completely
            prevent how we share information with third parties such as our
            advertising partners. To exercise your rights or opt-out of certain
            uses of your information by these parties, please follow the
            instructions in the “Behavioural Advertising” section above.
          </p>
          <p className="subheading">Do Not Track</p>
          <p>
            Please note that because there is no consistent industry
            understanding of how to respond to “Do Not Track” signals, we do not
            alter our data collection and usage practices when we detect such a
            signal from your browser.
          </p>
        </article>
        <article>
          <h4>Changes</h4>
          <p>
            We may update this Privacy Policy from time to time in order to
            reflect, for example, changes to our practices or for other
            operational, legal, or regulatory reasons.
          </p>
        </article>
        <article>
          <h4>Contact</h4>
          <p>
            For more information about our privacy practices, if you have
            questions, or if you would like to make a complaint, please contact
            us by e-mail at{" "}
            <a
              href="mailto:info@tresnoir.com"
              aria-describedby="a11y-external-message"
            >
              info@tresnoir.com
            </a>{" "}
            or by mail using the details provided below:
          </p>
          <p>
            Acme Acetate Company,{" "}
            <address>2831 W 1st St, Santa Ana CA 92703, United States</address>
          </p>
          <p>
            Last Updated: <i>01-11-2022</i>
          </p>
          <p>
            If you are not satisfied with our response to your complaint, you
            have the right to lodge your complaint with the relevant data
            protection authority. You can contact your local data protection
            authority, or our supervisory authority here:{" "}
            <a
              href="https://oag.ca.gov/privacy"
              rel="noreferrer"
              target="_blank"
            >
              https://oag.ca.gov/privacy.
            </a>
          </p>
        </article>
      </section>
    </Page>
  </Layout>
)

export default PrivacyPolicy
