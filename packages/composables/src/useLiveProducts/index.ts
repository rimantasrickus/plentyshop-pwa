import { LiveProductResponse } from '@vue-storefront/plentymarkets-api';
import { computed, ref } from '@nuxtjs/composition-api';
import { sharedRef, useVSFContext } from '@vue-storefront/core';
import { ComposableBaseResponse } from '../types';

export interface UseLiveProductsResponse extends ComposableBaseResponse<LiveProductResponse> {
  search: () => Promise<void>
}

export const useLiveProducts = (): UseLiveProductsResponse => {

  const context = useVSFContext();

  const result = sharedRef(<any>[], 'key');

  const loading = ref(false);

  const error = ref(null);

  const search = async (): Promise<void> => {
    try {
      loading.value = true;
      const liveProduct = [];
      for (let i = 1; i <= 10; i++) {
        const data = await context.$plentymarkets.api.getLiveProducts(i)

        if(data.length === 0) {
          continue;
        }

        liveProduct.push(data);
      }
      result.value = liveProduct;
      error.value = null;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  return {
    search,
    result: computed(() => result.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value)
  };
};
