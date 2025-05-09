/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import type * as StorefrontTypes from './storefront.types';

export type CartFragmentFragment = (
  Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'createdAt'>
  & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, discountCodes: Array<Pick<StorefrontTypes.CartDiscountCode, 'code' | 'applicable'>>, lines: { edges: Array<{ node: (
        Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
        & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, merchandise: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'sku' | 'title'>
          & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, product: Pick<StorefrontTypes.Product, 'handle' | 'title'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
        ), cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }> }
      ) | (
        Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
        & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, merchandise: (
          Pick<StorefrontTypes.ProductVariant, 'id' | 'sku' | 'title'>
          & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, product: Pick<StorefrontTypes.Product, 'handle' | 'title'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
        ), cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }> }
      ) }> }, cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
);

export type CartAttributesUpdateMutationVariables = StorefrontTypes.Exact<{
  attributes: Array<StorefrontTypes.AttributeInput> | StorefrontTypes.AttributeInput;
  cartId: StorefrontTypes.Scalars['ID']['input'];
}>;


export type CartAttributesUpdateMutation = { cartAttributesUpdate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'createdAt'>
      & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, discountCodes: Array<Pick<StorefrontTypes.CartDiscountCode, 'code' | 'applicable'>>, lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
            & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'sku' | 'title'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, product: Pick<StorefrontTypes.Product, 'handle' | 'title'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
            ), cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }> }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
            & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'sku' | 'title'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, product: Pick<StorefrontTypes.Product, 'handle' | 'title'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
            ), cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }> }
          ) }> }, cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'field' | 'message'>> }> };

export type CartCreateMutationVariables = StorefrontTypes.Exact<{
  input: StorefrontTypes.CartInput;
  country?: StorefrontTypes.InputMaybe<StorefrontTypes.CountryCode>;
  language?: StorefrontTypes.InputMaybe<StorefrontTypes.LanguageCode>;
}>;


export type CartCreateMutation = { cartCreate?: StorefrontTypes.Maybe<{ userErrors: Array<Pick<StorefrontTypes.CartUserError, 'message' | 'code' | 'field'>>, cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'createdAt'>
      & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, discountCodes: Array<Pick<StorefrontTypes.CartDiscountCode, 'code' | 'applicable'>>, lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
            & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'sku' | 'title'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, product: Pick<StorefrontTypes.Product, 'handle' | 'title'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
            ), cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }> }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
            & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'sku' | 'title'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, product: Pick<StorefrontTypes.Product, 'handle' | 'title'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
            ), cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }> }
          ) }> }, cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
    )> }> };

export type CartDiscountCodesUpdateMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  discountCodes?: StorefrontTypes.InputMaybe<Array<StorefrontTypes.Scalars['String']['input']> | StorefrontTypes.Scalars['String']['input']>;
}>;


export type CartDiscountCodesUpdateMutation = { cartDiscountCodesUpdate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'createdAt'>
      & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, discountCodes: Array<Pick<StorefrontTypes.CartDiscountCode, 'code' | 'applicable'>>, lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
            & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'sku' | 'title'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, product: Pick<StorefrontTypes.Product, 'handle' | 'title'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
            ), cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }> }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
            & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'sku' | 'title'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, product: Pick<StorefrontTypes.Product, 'handle' | 'title'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
            ), cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }> }
          ) }> }, cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'field' | 'message'>> }> };

export type CartLinesAddMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  lines: Array<StorefrontTypes.CartLineInput> | StorefrontTypes.CartLineInput;
}>;


export type CartLinesAddMutation = { cartLinesAdd?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'createdAt'>
      & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, discountCodes: Array<Pick<StorefrontTypes.CartDiscountCode, 'code' | 'applicable'>>, lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
            & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'sku' | 'title'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, product: Pick<StorefrontTypes.Product, 'handle' | 'title'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
            ), cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }> }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
            & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'sku' | 'title'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, product: Pick<StorefrontTypes.Product, 'handle' | 'title'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
            ), cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }> }
          ) }> }, cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'field' | 'message'>> }> };

export type CartLinesRemoveMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  lineIds: Array<StorefrontTypes.Scalars['ID']['input']> | StorefrontTypes.Scalars['ID']['input'];
}>;


export type CartLinesRemoveMutation = { cartLinesRemove?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'createdAt'>
      & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, discountCodes: Array<Pick<StorefrontTypes.CartDiscountCode, 'code' | 'applicable'>>, lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
            & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'sku' | 'title'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, product: Pick<StorefrontTypes.Product, 'handle' | 'title'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
            ), cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }> }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
            & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'sku' | 'title'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, product: Pick<StorefrontTypes.Product, 'handle' | 'title'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
            ), cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }> }
          ) }> }, cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'field' | 'message'>> }> };

export type CartLinesUpdateMutationVariables = StorefrontTypes.Exact<{
  cartId: StorefrontTypes.Scalars['ID']['input'];
  lines: Array<StorefrontTypes.CartLineUpdateInput> | StorefrontTypes.CartLineUpdateInput;
}>;


export type CartLinesUpdateMutation = { cartLinesUpdate?: StorefrontTypes.Maybe<{ cart?: StorefrontTypes.Maybe<(
      Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'createdAt'>
      & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, discountCodes: Array<Pick<StorefrontTypes.CartDiscountCode, 'code' | 'applicable'>>, lines: { edges: Array<{ node: (
            Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
            & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'sku' | 'title'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, product: Pick<StorefrontTypes.Product, 'handle' | 'title'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
            ), cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }> }
          ) | (
            Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
            & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, merchandise: (
              Pick<StorefrontTypes.ProductVariant, 'id' | 'sku' | 'title'>
              & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, product: Pick<StorefrontTypes.Product, 'handle' | 'title'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
            ), cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }> }
          ) }> }, cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
    )>, userErrors: Array<Pick<StorefrontTypes.CartUserError, 'field' | 'message'>> }> };

export type CartQueryVariables = StorefrontTypes.Exact<{
  id: StorefrontTypes.Scalars['ID']['input'];
}>;


export type CartQuery = { cart?: StorefrontTypes.Maybe<(
    Pick<StorefrontTypes.Cart, 'id' | 'checkoutUrl' | 'createdAt'>
    & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }>, discountCodes: Array<Pick<StorefrontTypes.CartDiscountCode, 'code' | 'applicable'>>, lines: { edges: Array<{ node: (
          Pick<StorefrontTypes.CartLine, 'id' | 'quantity'>
          & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'sku' | 'title'>
            & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, product: Pick<StorefrontTypes.Product, 'handle' | 'title'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
          ), cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }> }
        ) | (
          Pick<StorefrontTypes.ComponentizableCartLine, 'id' | 'quantity'>
          & { attributes: Array<Pick<StorefrontTypes.Attribute, 'key' | 'value'>>, merchandise: (
            Pick<StorefrontTypes.ProductVariant, 'id' | 'sku' | 'title'>
            & { price: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtPrice?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, product: Pick<StorefrontTypes.Product, 'handle' | 'title'>, image?: StorefrontTypes.Maybe<Pick<StorefrontTypes.Image, 'url' | 'altText'>> }
          ), cost: { amountPerQuantity: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, compareAtAmountPerQuantity?: StorefrontTypes.Maybe<Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }, discountAllocations: Array<{ discountedAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> }> }
        ) }> }, cost: { subtotalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'>, totalAmount: Pick<StorefrontTypes.MoneyV2, 'amount' | 'currencyCode'> } }
  )> };

interface GeneratedQueryTypes {
  "#graphql\n  #graphql\n  fragment CartFragment on Cart {\n    id\n    checkoutUrl\n    createdAt\n    attributes {\n      key\n      value\n    }\n    discountAllocations {\n      discountedAmount {\n        amount\n        currencyCode\n      }\n    }\n    discountCodes {\n      code\n    }\n    lines(first: 250) {\n      edges {\n        node {\n          id\n          quantity\n          attributes {\n            key\n            value\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              sku\n              title\n              price {\n                amount\n                currencyCode\n              }\n              compareAtPrice {\n                amount\n                currencyCode\n              }\n              product {\n                handle\n                title\n              }\n              image {\n                url\n                altText\n              }\n            }\n          }\n          cost {\n            amountPerQuantity {\n              amount\n              currencyCode\n            }\n            compareAtAmountPerQuantity {\n              amount\n              currencyCode\n            }\n            totalAmount {\n              amount\n              currencyCode\n            }\n            subtotalAmount {\n              amount\n              currencyCode\n            }\n          }\n          discountAllocations {\n            discountedAmount {\n              amount\n              currencyCode\n            }\n          }\n        }\n      }\n    }\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n    }\n    discountCodes {\n      applicable\n      code\n    }\n  }\n\n  query cart($id: ID!) {\n    cart(id: $id) {\n      ...CartFragment\n    }\n  }\n": {return: CartQuery, variables: CartQueryVariables},
}

interface GeneratedMutationTypes {
  "#graphql\n  #graphql\n  fragment CartFragment on Cart {\n    id\n    checkoutUrl\n    createdAt\n    attributes {\n      key\n      value\n    }\n    discountAllocations {\n      discountedAmount {\n        amount\n        currencyCode\n      }\n    }\n    discountCodes {\n      code\n    }\n    lines(first: 250) {\n      edges {\n        node {\n          id\n          quantity\n          attributes {\n            key\n            value\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              sku\n              title\n              price {\n                amount\n                currencyCode\n              }\n              compareAtPrice {\n                amount\n                currencyCode\n              }\n              product {\n                handle\n                title\n              }\n              image {\n                url\n                altText\n              }\n            }\n          }\n          cost {\n            amountPerQuantity {\n              amount\n              currencyCode\n            }\n            compareAtAmountPerQuantity {\n              amount\n              currencyCode\n            }\n            totalAmount {\n              amount\n              currencyCode\n            }\n            subtotalAmount {\n              amount\n              currencyCode\n            }\n          }\n          discountAllocations {\n            discountedAmount {\n              amount\n              currencyCode\n            }\n          }\n        }\n      }\n    }\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n    }\n    discountCodes {\n      applicable\n      code\n    }\n  }\n\n  mutation cartAttributesUpdate($attributes: [AttributeInput!]!, $cartId: ID!) {\n    cartAttributesUpdate(attributes: $attributes, cartId: $cartId) {\n      cart {\n        ...CartFragment\n      }\n      userErrors {\n        field\n        message\n      }\n      # warnings {\n      #   # CartWarning fields\n      # }\n    }\n  }\n": {return: CartAttributesUpdateMutation, variables: CartAttributesUpdateMutationVariables},
  "#graphql\n  #graphql\n  fragment CartFragment on Cart {\n    id\n    checkoutUrl\n    createdAt\n    attributes {\n      key\n      value\n    }\n    discountAllocations {\n      discountedAmount {\n        amount\n        currencyCode\n      }\n    }\n    discountCodes {\n      code\n    }\n    lines(first: 250) {\n      edges {\n        node {\n          id\n          quantity\n          attributes {\n            key\n            value\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              sku\n              title\n              price {\n                amount\n                currencyCode\n              }\n              compareAtPrice {\n                amount\n                currencyCode\n              }\n              product {\n                handle\n                title\n              }\n              image {\n                url\n                altText\n              }\n            }\n          }\n          cost {\n            amountPerQuantity {\n              amount\n              currencyCode\n            }\n            compareAtAmountPerQuantity {\n              amount\n              currencyCode\n            }\n            totalAmount {\n              amount\n              currencyCode\n            }\n            subtotalAmount {\n              amount\n              currencyCode\n            }\n          }\n          discountAllocations {\n            discountedAmount {\n              amount\n              currencyCode\n            }\n          }\n        }\n      }\n    }\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n    }\n    discountCodes {\n      applicable\n      code\n    }\n  }\n\n  mutation cartCreate($input: CartInput!, $country: CountryCode, $language: LanguageCode)\n    @inContext(country: $country, language: $language) {\n      cartCreate(input: $input) {\n        userErrors {\n          message\n          code\n          field\n        }\n        cart {\n          ...CartFragment\n        }\n      }\n    }\n  ": {return: CartCreateMutation, variables: CartCreateMutationVariables},
  "#graphql\n  #graphql\n  fragment CartFragment on Cart {\n    id\n    checkoutUrl\n    createdAt\n    attributes {\n      key\n      value\n    }\n    discountAllocations {\n      discountedAmount {\n        amount\n        currencyCode\n      }\n    }\n    discountCodes {\n      code\n    }\n    lines(first: 250) {\n      edges {\n        node {\n          id\n          quantity\n          attributes {\n            key\n            value\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              sku\n              title\n              price {\n                amount\n                currencyCode\n              }\n              compareAtPrice {\n                amount\n                currencyCode\n              }\n              product {\n                handle\n                title\n              }\n              image {\n                url\n                altText\n              }\n            }\n          }\n          cost {\n            amountPerQuantity {\n              amount\n              currencyCode\n            }\n            compareAtAmountPerQuantity {\n              amount\n              currencyCode\n            }\n            totalAmount {\n              amount\n              currencyCode\n            }\n            subtotalAmount {\n              amount\n              currencyCode\n            }\n          }\n          discountAllocations {\n            discountedAmount {\n              amount\n              currencyCode\n            }\n          }\n        }\n      }\n    }\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n    }\n    discountCodes {\n      applicable\n      code\n    }\n  }\n\n  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {\n    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {\n      cart {\n        ...CartFragment\n      }\n      userErrors {\n        field\n        message\n      }\n      # warnings {\n      #   # CartWarning fields\n      # }\n    }\n  }\n": {return: CartDiscountCodesUpdateMutation, variables: CartDiscountCodesUpdateMutationVariables},
  "#graphql\n  #graphql\n  fragment CartFragment on Cart {\n    id\n    checkoutUrl\n    createdAt\n    attributes {\n      key\n      value\n    }\n    discountAllocations {\n      discountedAmount {\n        amount\n        currencyCode\n      }\n    }\n    discountCodes {\n      code\n    }\n    lines(first: 250) {\n      edges {\n        node {\n          id\n          quantity\n          attributes {\n            key\n            value\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              sku\n              title\n              price {\n                amount\n                currencyCode\n              }\n              compareAtPrice {\n                amount\n                currencyCode\n              }\n              product {\n                handle\n                title\n              }\n              image {\n                url\n                altText\n              }\n            }\n          }\n          cost {\n            amountPerQuantity {\n              amount\n              currencyCode\n            }\n            compareAtAmountPerQuantity {\n              amount\n              currencyCode\n            }\n            totalAmount {\n              amount\n              currencyCode\n            }\n            subtotalAmount {\n              amount\n              currencyCode\n            }\n          }\n          discountAllocations {\n            discountedAmount {\n              amount\n              currencyCode\n            }\n          }\n        }\n      }\n    }\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n    }\n    discountCodes {\n      applicable\n      code\n    }\n  }\n\n  mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {\n    cartLinesAdd(cartId: $cartId, lines: $lines) {\n      cart {\n        # Cart fields\n        ...CartFragment\n      }\n      userErrors {\n        field\n        message\n      }\n      # warnings {\n      #   # CartWarning fields\n      # }\n    }\n  }\n": {return: CartLinesAddMutation, variables: CartLinesAddMutationVariables},
  "#graphql\n  #graphql\n  fragment CartFragment on Cart {\n    id\n    checkoutUrl\n    createdAt\n    attributes {\n      key\n      value\n    }\n    discountAllocations {\n      discountedAmount {\n        amount\n        currencyCode\n      }\n    }\n    discountCodes {\n      code\n    }\n    lines(first: 250) {\n      edges {\n        node {\n          id\n          quantity\n          attributes {\n            key\n            value\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              sku\n              title\n              price {\n                amount\n                currencyCode\n              }\n              compareAtPrice {\n                amount\n                currencyCode\n              }\n              product {\n                handle\n                title\n              }\n              image {\n                url\n                altText\n              }\n            }\n          }\n          cost {\n            amountPerQuantity {\n              amount\n              currencyCode\n            }\n            compareAtAmountPerQuantity {\n              amount\n              currencyCode\n            }\n            totalAmount {\n              amount\n              currencyCode\n            }\n            subtotalAmount {\n              amount\n              currencyCode\n            }\n          }\n          discountAllocations {\n            discountedAmount {\n              amount\n              currencyCode\n            }\n          }\n        }\n      }\n    }\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n    }\n    discountCodes {\n      applicable\n      code\n    }\n  }\n\n  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {\n    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {\n      cart {\n        # Cart fields\n        ...CartFragment\n      }\n      userErrors {\n        field\n        message\n      }\n      # warnings {\n      #   # CartWarning fields\n      # }\n    }\n  }\n": {return: CartLinesRemoveMutation, variables: CartLinesRemoveMutationVariables},
  "#graphql\n  #graphql\n  fragment CartFragment on Cart {\n    id\n    checkoutUrl\n    createdAt\n    attributes {\n      key\n      value\n    }\n    discountAllocations {\n      discountedAmount {\n        amount\n        currencyCode\n      }\n    }\n    discountCodes {\n      code\n    }\n    lines(first: 250) {\n      edges {\n        node {\n          id\n          quantity\n          attributes {\n            key\n            value\n          }\n          merchandise {\n            ... on ProductVariant {\n              id\n              sku\n              title\n              price {\n                amount\n                currencyCode\n              }\n              compareAtPrice {\n                amount\n                currencyCode\n              }\n              product {\n                handle\n                title\n              }\n              image {\n                url\n                altText\n              }\n            }\n          }\n          cost {\n            amountPerQuantity {\n              amount\n              currencyCode\n            }\n            compareAtAmountPerQuantity {\n              amount\n              currencyCode\n            }\n            totalAmount {\n              amount\n              currencyCode\n            }\n            subtotalAmount {\n              amount\n              currencyCode\n            }\n          }\n          discountAllocations {\n            discountedAmount {\n              amount\n              currencyCode\n            }\n          }\n        }\n      }\n    }\n    cost {\n      subtotalAmount {\n        amount\n        currencyCode\n      }\n      totalAmount {\n        amount\n        currencyCode\n      }\n    }\n    discountCodes {\n      applicable\n      code\n    }\n  }\n\n  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {\n    cartLinesUpdate(cartId: $cartId, lines: $lines) {\n      cart {\n        # Cart fields\n        ...CartFragment\n      }\n      userErrors {\n        field\n        message\n      }\n      # warnings {\n      #   # CartWarning fields\n      # }\n    }\n  }\n": {return: CartLinesUpdateMutation, variables: CartLinesUpdateMutationVariables},
}
declare module '@shopify/storefront-api-client' {
  type InputMaybe<T> = StorefrontTypes.InputMaybe<T>;
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
