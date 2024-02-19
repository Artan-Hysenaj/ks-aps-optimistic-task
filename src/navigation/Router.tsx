/* eslint-disable react-refresh/only-export-components */
import { RootError } from '@/navigation/Error';
import { MainLayout } from '@/navigation/Layout';

import { createElement } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

export const router = createBrowserRouter([
	{
		path: '',
		element: <MainLayout />,
		errorElement: <RootError />,
		children: [
			{
				path: '/',
				element: <Navigate to="/users" />,
			},
			{
				path: '/users',
				lazy: () => import('@/screens/Users'),
			},
			{
				path: 'users/:id',
				lazy: () => import('@/screens/UserDetails'),
			},
		],
	},
]);

function Router(): JSX.Element {
	return createElement(RouterProvider, { router });
}

export default Router;

// Clean up on module reload (HMR)
// https://vitejs.dev/guide/api-hmr
if (import.meta.hot) {
	import.meta.hot.dispose(() => router.dispose());
}
