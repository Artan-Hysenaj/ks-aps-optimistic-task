import { CopyTwoTone, SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import { Fragment, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Button, Input, Space, Table, Tooltip } from 'antd';
import { ColumnsType, TableProps } from 'antd/es/table';

import { Pagination } from '@/types/Pagination';
import { TableParams } from '@/types/Table';
import { User } from '@/types/User';

interface UsersListProps {
	data: Pagination<User[]> | undefined;
	isLoading: boolean;
	isPlaceholderData: boolean;
	tableParams: TableParams;
	setTableParams: React.Dispatch<React.SetStateAction<TableParams>>;
}

/**
 * Renders a table of users with search and filter functionality.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Pagination<User[]> | undefined} props.data - The paginated user data.
 * @param {boolean} props.isLoading - Indicates if the data is currently being loaded.
 * @param {boolean} props.isPlaceholderData - Indicates if the data is a placeholder.
 * @param {TableParams} props.tableParams - The table parameters for filtering and sorting.
 * @param {React.Dispatch<React.SetStateAction<TableParams>>} props.setTableParams - The function to update the table parameters.
 * @returns {JSX.Element} The rendered UsersList component.
 */
function UsersList({ data, isLoading, isPlaceholderData, tableParams, setTableParams }: UsersListProps): JSX.Element {
	const columns: ColumnsType<User> = useMemo(
		() => [
			{
				title: 'ID',
				dataIndex: 'id',
				key: 'id',
				width: '5rem',
			},
			{
				title: 'Name',
				dataIndex: 'firstName',
				key: 'firstName',
				width: '20%',
				sorter: (a, b) => a.firstName.localeCompare(b.firstName),
				filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
					<div className="p-2">
						<Input
							placeholder={`Search name`}
							value={selectedKeys[0]}
							onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
							onPressEnter={() => confirm()}
							style={{ width: 188, marginBottom: 8, display: 'block' }}
						/>
						<Space>
							<Button
								type="primary"
								onClick={() => confirm()}
								icon={<SearchOutlined />}
								size="small"
								className="w-20 bg-[#1890ff]">
								Search
							</Button>
							<Button
								onClick={() => {
									clearFilters?.();
									confirm();
								}}
								size="small"
								className="w-20">
								Reset
							</Button>
						</Space>
					</div>
				),
				filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
				render: (_, user) => {
					const text = `${user.firstName ?? ''} ${user.gender === 'female' ? `(${user.maidenName ?? ''})` : ''} ${user.lastName ?? ''}`;
					return tableParams.filters?.firstName ? (
						<Highlighter
							highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
							searchWords={[tableParams.filters?.firstName?.toString()]}
							autoEscape
							textToHighlight={text.toString()}
						/>
					) : (
						text
					);
				},
			},
			{
				title: 'Age',
				dataIndex: 'age',
				key: 'age',
				width: '20%',
				sorter: (a, b) => a.age - b.age,
			},
			{
				title: 'Gender',
				dataIndex: 'gender',
				key: 'gender',
				width: '20%',
				sorter: (a, b) => a.gender.length - b.gender.length,
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email',
			},

			{
				title: 'Action',
				key: 'action',
				render: (_, user) => (
					<Link to={user.id?.toString()}>
						<Tooltip title="Details">
							<CopyTwoTone rotate={180} className="text-xl hover:cursor-pointer" />
						</Tooltip>
					</Link>
				),
			},
		],
		[tableParams]
	);

	const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
	};

	return (
		<Fragment>
			<Table
				className="overflow-x-auto"
				loading={isLoading || isPlaceholderData}
				columns={columns}
				dataSource={data?.users}
				rowKey={({ id }) => id}
				onChange={handleTableChange}
				pagination={{ ...tableParams.pagination, total: data?.total }}
			/>
		</Fragment>
	);
}

export default UsersList;
