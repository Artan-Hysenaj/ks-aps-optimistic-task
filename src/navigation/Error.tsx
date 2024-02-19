import { useNavigate, useRouteError } from 'react-router-dom';

import { Button, Result } from 'antd';
import { ResultStatusType } from 'antd/es/result';

/**
 * Renders the root error component.
 *
 * @returns The JSX element representing the root error component.
 */
export function RootError(): JSX.Element {
	const err = useRouteError() as RouteError;
	const navigate = useNavigate();

	return (
		<Result
			status={(err.status ?? 500) as ResultStatusType}
			title={err.status ?? 500}
			subTitle={err.statusText ?? err.message ?? 'Sorry, something went wrong.'}
			extra={<Button onClick={() => navigate('/')}>Back Home</Button>}
		/>
	);
}

type RouteError = Error & { status?: number; statusText?: string };
