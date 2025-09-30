import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'main',
		component: () => import('@/app/pages/main-page'),
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: to => {
			return { name: '404', query: { originalPath: to.fullPath } }
		}
	},
	{
		path: '/404',
		name: '404',
		component: {
			render(){
				return '404 - Страница не найдена';
			}
		}
	}
];