import BaseError from "./BaseError.js";

class InvalidRequest extends BaseError{
	constructor(message = "One or more informed parameters where incorrect"){
		super(message, 400);
	}
}

export default InvalidRequest;