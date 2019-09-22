import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import vuetify from './plugins/vuetify';
import {createAccount, NetworkType} from 'orbs-client-sdk';
import CoOps from '@/contracts/CoOps';
import {OrbsContractOpts} from '@/contracts';
import Crops from '@/contracts/Crops';
import Orders from '@/contracts/Orders';

const account = createAccount();

const opts = new OrbsContractOpts({
  virtualChainId: 42,
  serviceUrl: 'http://localhost:8888',
  networkType: NetworkType.NETWORK_TYPE_TEST_NET,
  publicKey: account.publicKey,
  privateKey: account.privateKey,
  contractName: 'CoOps'
});

const coopSvc = new CoOps(opts);

opts.contractName = 'Crops';
const cropsSvc = new Crops(opts);

opts.contractName = 'Orders';
const orderSvc = new Orders(opts);

Vue.config.productionTip = false;
Vue.mixin({
  data: () => ({
    userId: 'MYUSERID',
    commlist: ['Apples', 'Bananas', 'Pineapples', 'Honey', 'Peaches', 'Coffee', 'Cocoa', 'Wheat', 'Sugar Cane',
      'Butter Beans']
  }),
  methods: {
    navigate(path: string) {
      this.$router.push(path);
    },
    formatPrice(value) {
      const val = (value / 1).toFixed(2); // .replace('.', ',');
      return '$' +  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    createSlug(input: string): string {
      if (!input) {
        return '';
      }
      const regEx = /[^A-Za-z0-9.]+/g;
      input = input.toLowerCase();
      return input.replace(regEx, '-');
    }

  },
  computed: {
    coopSvc() {
      return coopSvc;
    },
    cropsSvc() {
      return cropsSvc;
    },
    orderSvc() {
      return orderSvc;
    }
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
