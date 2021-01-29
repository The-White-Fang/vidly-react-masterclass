import http from './httpService';
import config from '../config.json';

const apiEndpoint = `${config.apiUrl}/genres`;

export let getGenres = async () => {
	const { data } = await http.get(apiEndpoint);

	return data;
}