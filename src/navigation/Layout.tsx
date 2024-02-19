import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Layout } from 'antd';

/**
 * The main application layout.
 */ 
export function MainLayout(): JSX.Element {
	return (
		<Layout>
			<Layout.Header className="text-white">Header</Layout.Header>
			<Layout.Content className="container min-h-[calc(100vh-133px)]">
				<Suspense>
					<Outlet />
				</Suspense>
			</Layout.Content>
			<Layout.Footer>Ant Design ©{new Date().getFullYear()} Created by Artan Hysenaj</Layout.Footer>
		</Layout>
	);
}
