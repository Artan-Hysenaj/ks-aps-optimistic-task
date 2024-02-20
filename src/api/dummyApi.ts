export const getUsers = async (
	params: string,
	options: {
		filtering: boolean;
		searching: boolean;
	}
) => {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/users${options.filtering && !options.searching ? '/filter' : ''}${options.searching && !options.filtering ? '/search' : ''}?${params}`
	);
	return response.json();
};

export const getUserPosts = async (userId: string) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/posts`);
	return response.json();
};

export const getUserById = async (userId: string) => {
	const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/`);
	return response.json();
};
