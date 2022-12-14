import {
  Context,
  useUserShippingFactory,
  UseUserShippingFactoryParams
} from '@vue-storefront/core';
import {
  AddressData,
  AddressType,
  UserShippingAddress as Address,
  UserShippingAddressItem as AddressItem
} from '@vue-storefront/plentymarkets-api';

const params: UseUserShippingFactoryParams<Address, AddressItem> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addAddress: async (context: Context, shippingDetails) => {
    if (!shippingDetails.address) {
      return await context.$plentymarkets.api.saveBillingIsShipping();
    } else {
      await context.$plentymarkets.api.saveAddress(AddressType.Shipping, shippingDetails.address);
    }

    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Shipping);
    return data ?? null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteAddress: async (context: Context, shippingDetails: any) => {
    await context.$plentymarkets.api.deleteAddress(shippingDetails.address.id, AddressType.Shipping);
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Shipping);
    return data ?? null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAddress: async (context: Context, params) => {
    console.log('Mocked: useUserShipping.updateAddress');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params): Promise<AddressData[]> => {
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Shipping);
    return data ?? null;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDefaultAddress: async (context: Context, shippingDetails: any) => {
    await context.$plentymarkets.api.setAddressAsDefault(shippingDetails.address.id, AddressType.Shipping);
    const data = await context.$plentymarkets.api.loadAddresses(AddressType.Shipping);
    return data ?? null;
  }
};

export const useUserShipping = useUserShippingFactory<Address, AddressItem>(params);
