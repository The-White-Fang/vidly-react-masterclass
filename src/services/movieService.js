import http from './httpService';
import config from '../config.json';

const apiEndpoint = `${config.apiUrl}/movies`;

export let getMovies = async () => {
	const { data } = await http.get(apiEndpoint);

	return data;
}

export let getMovie = async (id) => {
	const { data } = await http.get(`${apiEndpoint}/${id}`);

	return data;
}

export let deleteMovie = async (id) => {
	await http.delete(`${apiEndpoint}/${id}`);

	return true;
}

export let saveMovie = async (movie) => {
	let response,
		{_id, ...payload} = movie;
	if (_id){
		response = await http.put(`${apiEndpoint}/${_id}`, payload);
	} else {
		response = await http.post(apiEndpoint, movie);
	}

	return response.data;
}