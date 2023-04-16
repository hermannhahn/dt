export interface ResponseInterface {
	error: Boolean | String
	result: any
}

export class Response implements ResponseInterface {
	error: Boolean | String = false
	result: any = ""
}
