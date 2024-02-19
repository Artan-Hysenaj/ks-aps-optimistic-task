export const getUsers = async (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params: URLSearchParams,
	options: {
		filtering: boolean;
		searching: boolean;
	}
) => {
	const response = await fetch(
		`${import.meta.env.VITE_API_URL}/users${options.filtering && !options.searching ? '/filter' : ''}${options.searching && !options.filtering ? '/search' : ''}?${params.toString()}`
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
