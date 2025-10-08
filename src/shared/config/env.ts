export type EnvConfig = {
	API_BASE_URL: string
	API_USERNAME: string,
	API_PASSWORD: string,
}

export const CONFIG: EnvConfig = {
	API_BASE_URL: ENV.API_BASE_URL,
	API_USERNAME: ENV.API_USERNAME,
	API_PASSWORD: ENV.API_PASSWORD,
}