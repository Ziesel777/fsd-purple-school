import { defineComponent } from 'vue';

import DefaultLayout from '../layouts/default-layout/DefaultLayout.vue';

export default defineComponent({
	name: 'App',
	components: {
		DefaultLayout,
	},
	computed: {
		layout(){
			return this.$route?.meta?.layout || 'default-layout';
		}
	},
});