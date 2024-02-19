import { Fragment, PropsWithChildren } from 'react';

import { Button, Result, Space } from 'antd';

interface ErrorBoundaryProps {
	isError: boolean;
	error: Error | null;
}

/**
 * ErrorBoundary component that wraps around other components to catch and display errors.
 *
 * @component
 * @example
 * ```tsx
 * <ErrorBoundary isError={true} error={new Error('Something went wrong.')}>
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 *
 * @param {object} props - The component props.
 * @param {boolean} props.isError - Indicates whether an error has occurred.
 * @param {Error | null} props.error - The error object.
 * @returns {JSX.Element} The rendered ErrorBoundary component.
 */
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
