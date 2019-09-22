import Vue from 'vue';
import {Orders} from '@/contracts';

declare module 'vue/types/vue' {
    interface Vue {
        navigate(path: string): void;
        orderSvc: Orders;
        createSlug(text: string): string;
    }
}
