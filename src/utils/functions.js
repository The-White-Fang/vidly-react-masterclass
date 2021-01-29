export let getVal = (obj, path) => {
	if (typeof path == "string") {
		path = path.split('.');
	}
	if (path.length === 1) {
		return obj[path[0]];
	}
	return getVal(obj[path[0]], path.slice(1));
}