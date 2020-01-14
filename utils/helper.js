export const capitalizefirst = string => {
	const arr = string.split(' ');
	const formatted = arr.map(i => i.charAt(0).toUpperCase() + i.slice(1).toLowerCase());

	return formatted.join(' ');
};
