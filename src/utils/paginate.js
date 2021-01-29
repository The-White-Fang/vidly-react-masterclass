export default function paginate(items, pageSize, currentPage) {
	let start = (currentPage - 1) * pageSize;
	return items.slice(start, start + pageSize);
}