import { ArrowLeftOutlined } from '@ant-design/icons';

import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

function BackButton(): JSX.Element {
	const navigate = useNavigate();
	return (
		<Fragment>
			<ArrowLeftOutlined title="Go back" className="hover:cursor-pointer" onClick={() => navigate(-1)} />
		</Fragment>
	);
}

export default BackButton;
