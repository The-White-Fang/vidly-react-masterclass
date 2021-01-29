import axios from 'axios';

let http = {
	get: axios.get,
	post: axios.post,
	put: axios.put,
	delete: axios.delete,
}

export default http;