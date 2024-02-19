export interface Pagination<T> {
	users: T;
	posts: T;
	limit: number;
	skip: number;
	total: number;
}
