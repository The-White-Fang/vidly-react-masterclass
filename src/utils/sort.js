import { getVal } from './functions';

let sort = (array, path, inc = true) => {
	let returnVal;
	array = [...array];

	array.sort((a, b) => {
		let aVal = getVal(a, path),
			bVal = getVal(b, path);

		if (typeof aVal === 'number') {
			returnVal = aVal - bVal;
		} else {
			returnVal = aVal.localeCompare(bVal);
		}

		return inc ? returnVal : returnVal * -1;
	});

	return array;
}

export default sort;