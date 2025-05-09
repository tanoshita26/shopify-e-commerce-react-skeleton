<p align="center">
  <a href="https://tresnoir.com">
    <img alt="Gatsby" src="./src/images/tres-noir-text.png" width="300" />
  </a>
</p>

<table align="center">
  <tr>
    <td valign="center">STAGING</td>
    <td valign="center"><img src="https://api.netlify.com/api/v1/badges/9f0468ef-95c3-4672-b4da-25e64b884895/deploy-status" />
    </td>
  </tr>
    <tr>
    <td valign="center">PRODUCTION</td>
    <td valign="center"><img src="https://api.netlify.com/api/v1/badges/f008f229-b184-4e7c-8838-cac8efbedfa0/deploy-status" />
    </td>
  </tr>
</table>

## Setup

### Hiding Variants

Hiding incomplete Shopify variants depends on a variant metafield `tresnoir.hide_online`. In order for this metafield to be available in collection templates, both Shopify and Contentful collections need to be available. Therefore There should be both a Shopify and Contentful collection created.

### Clearance Collection

To enable pricing for clearance items, you need tag the product in Shopify with `Clearance`.

### Clearance Polarized

To enable Polarized buttons on clearance glasses, you need to add the tag `Clearance - Polarized` to the product in Shopify. This will enable the polarized button on the product page.

## Deploying New Releases: Step by Step Guide

### Step 0. Gather Assets

Prior to starting this process, make sure you have the following:

- [Product Release Sheet](https://docs.google.com/spreadsheets/d/1CUcKidzKfBFHbwHC2DCbA6TF_pWRH6q0GdxCrRHXFRA/edit?usp=sharing) with: up to date skus, release dates, links to product images
- Learn More Page AI file, 3 lifestyle images per new product
- Log in access to: Cin7, Tres Noir Shopify Admin, Contentful, Netlify

### Step 1. Sync SKUs from Cin7 to Shopify

Log into Cin7 and navigate to **Integrations > Shopify**

Click into **tres-noir** and click on **Catalogue**

Search for the new release SKU using the **Catalogue** search

Click on the SKU and click `List on Shopify`. Do this for each SKU that is part of the new release.

### Step 2. Update Product on Shopify

Log into the Tres Noir shopify admin and go to **Products**. You should see the SKU(s) you just listed.

Go into each product and add one angled image for each variant.

Then add a `new_release` tag.

If applicable, add a `new_color:Color Name` tag. The tagging convention goes as follows: if the variant color title is `Whiskey Tort - G15 Lens`, the tag should be `new_color:Whiskey Tort`.

These tags are needed to display the `New` and/or `New Color` badges you see on the site.

Make the product active, but _do not include it in any sales channels_. You will do that on the day of the release.

### Step 3. Create Product and/or Variant in Contentful

Log into Contentful and navigate to **Content** in the navigation bar.

#### Adding a Product

If you are adding an entirely new frame, click **Add Entry > Product**. From here on, it is pretty self-explanatory. Fill out all required fields. Use a prior existing product as a guide if needed.

- `Title` and `Handle` must match to the way the product is listed in Shopify
- The assets for `Style Description`, `Frame Details Image`, `Variants Image`, `Fit Diagram`, `Customize Image`, and `Lenses Info Image` will all come from the Learn More Page AI file. You will have to go through that AI file and export each section as an image.
- If you have any questions about the other fields, ask Jill or Holly.

#### Adding a Variant

If you are just adding a new variant to an existing product, find that product using the search bar, click into it, scroll down to **Variants**, and add a new **Product.Variant**.

When adding a variant, fill out all required fields. Each `Image Set` needs an image of the new frames from an angle, front, and side view. These are the images that are going to show up in the image carousel on the site’s product page. If it is a new collaboration, you will also likely need an image for the special edition box set. If the frame is in a completely new color that no other frame on the site has, you will need a new `Color Image` swatch.

The most tedious part is adding the `Variant Customizations`. You’ll need to upload about 22 images here. Try to keep the naming conventions clean (see other variants / variant customizations for examples). Sometimes Contenful will begin to slow down your browser at this point, if it does just restart your browser and resume.

Once you've filled out every field for each product and/or product variant, make sure everything is `Published` and you should be ready to move on to the next step.

### Step 4. Add Product to Collections in Contentful

In order for the product to show up on collection pages - you’ll need to add them manually in Contentful. Add the newly created product to the following collections (certain frame styles belong to either Men’s or Women’s collections, whereas some are unisex):

- New Styles
- All Sunglasses
- Men’s Sunglasses
- Women’s Sunglasses
- All Eyeglasses
- Men’s Eyeglasses
- Women’s Eyeglasses

### Step 5. Create Deploy Preview in Netlify

Once you’ve completed steps 0-4, you should be ready to create a deployment preview. Test locally first and check for the following:

- Product(s) appear in expected collection pages with expected badging
- Product page & Read More page is complete, with no errors
- Polarized buttons and customize buttons work
- Test customization feature: make sure customization images show up as expected
- Test adding to cart works (will need to make product available on sales channels for this to work)

If you find an error, you’ve likely forgotten a step or forgotten to publish an asset / asset change in Contentful.

The day before the release is meant to go live, prepare the production preview and make sure everything above works. On the day of the release, make each new product available on every sales channel in Shopify. After double checking everything, you should be ready to make the new release live.

### Pro Tips:

- When it comes to uploading assets in Contentful, everything that is uploaded or altered needs to be `Published`. Make sure you verify everything has the green `Published` button next to when altering or uploading anything in Contentful.
- Confirm release dates with Holly/Jill at least two weeks prior to the release date stated on the sheet.
- Make sure all the assets / product images are ready prior to starting this process.
- Get a head start on this new release process at least a week before the releases are due to go live on the site, especially if multiple SKUs are going live in one day. The process of updating assets to Contentful is particularly time-consuming, so start early.
- Have the production deployment tested and ready to go the day before the release is meant to go live.
