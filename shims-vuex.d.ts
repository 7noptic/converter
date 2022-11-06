// @ts-ignore
import { Store } from '@/store';
import { Api } from '~/api';

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store;
        $API: Api;
    }
}
