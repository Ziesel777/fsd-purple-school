import ky, { KyInstance } from "ky";

import { CONFIG } from '../config';

class Api {
	base = CONFIG.API_BASE_URL;
	api: KyInstance = null;
	accessToken = '';
	headers = {};

	constructor(){
		this.init();
	}

	init(){
		this.api = ky.create({
			prefixUrl: this.base,
		});
	}

	buildParams(params){
		const searchParams = new URLSearchParams();

		if(params) for(let [key, value] of Object.entries(params)){
			searchParams.append(key, value.toString());
		}

		return searchParams;
	}

	normalizePath(url) {
		return url
			.replace(/\/+/g, '/') // Убирает дублирующиеся слэши
			.replace(/\/\.\//g, '/') // Убирает `/./`
			.replace(/\/[^/]+\/\.\.\//g, '/'); // Убирает `/../`
	}

	getParamsObject(params){
		const paramsObject = {};
		for (const [key, value] of params) {
			if (!paramsObject[key]) {
				paramsObject[key] = value;
			} else {
				if (Array.isArray(paramsObject[key])) {
					paramsObject[key].push(value);
				} else {
					paramsObject[key] = [paramsObject[key], value];
				}
			}
		}

		return paramsObject;
	}

	async getToken(){
		try {
			const res = await this.postData({
				path: 'security/login',
				data: {
					username: CONFIG.API_USERNAME,
					password: CONFIG.API_PASSWORD,
					provider: 'db',
					refresh: true
				},
				notToken: true,
			});
			const { access_token } = res ?? {};

			if(access_token && this.accessToken !== access_token){
				this.accessToken = access_token;
				this.headers = {
					...this.headers,
					Authorization: `Bearer ${access_token}`,
				}
				return access_token;
			}
		} catch (error) {
			console.error(error);
		} finally {
			return;
		}
	}

	async getData({ path, params }: {
		path: string,
		params?: object,
	}): Promise<any> {
		await this.getToken();

		const searchParams = this.buildParams(params);

		const res = await this.api.get(path, {
			searchParams,
			headers: this.headers
		}).json();
		// console.log(res);
		return res;
	}

	async postData({ path, data={}, params, notToken }: {
		path: string,
		data?: object,
		params?: object,
		notToken?: boolean
	}): Promise<any> {
		const searchParams = this.buildParams(params);

		if(!notToken) await this.getToken();

		const res = await this.api.post(path, {
			json: data,
			searchParams,
			headers: this.headers
		}).json();
		// console.log(res);
		return res;
	}
}

export default new Api();
