import InvalidRequest from "./InvalidRequest.js";

class ValidationError extends InvalidRequest {
	constructor(error){
		const errorMsgs = Object.values(error.errors)
			.map(error => error.message)
			.join("; ");

		super(`The following errors where found: ${errorMsgs}`, 400);
	}
}

export default ValidationError;