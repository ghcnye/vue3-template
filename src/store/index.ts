import { createPinia } from 'pinia';
import {userstore} from './modules/user';

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export { userstore };
export default pinia;