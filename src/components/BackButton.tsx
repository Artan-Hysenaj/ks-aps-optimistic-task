import { ArrowLeftOutlined } from '@ant-design/icons';

import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Renders a back button component.
 * @returns The JSX.Element representing the back button.
 */
function BackButton(): JSX.Element {
	const navigate = useNavigate();
	return (
		<Fragment>
			<ArrowLeftOutlined title="Go back" className="hover:cursor-pointer" onClick={() => navigate(-1)} />
		</Fragment>
	);
}

export default BackButton;
