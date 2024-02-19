import { Fragment, PropsWithChildren } from 'react';

import { Button, Result, Space } from 'antd';

interface ErrorBoundaryProps {
	isError: boolean;
	error: Error | null;
}

function ErrorBoundary({ isError, error, children }: PropsWithChildren<ErrorBoundaryProps>): JSX.Element {
	return (
		<Fragment>
			{isError ? (
				<Result
					status="error"
					title={error?.name}
					subTitle={error?.message ?? 'Sorry, something went wrong.'}
					extra={
						<Space>
							<span>Please try again!</span>
							<Button onClick={() => window.location.reload()}>Reload</Button>
						</Space>
					}
				/>
			) : (
				children
			)}
		</Fragment>
	);
}

export default ErrorBoundary;
