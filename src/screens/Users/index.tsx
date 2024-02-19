import { SearchOutlined } from '@ant-design/icons';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Highlighter from 'react-highlight-words';

import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { Button, Input, Space, Table } from 'antd';
import type { GetProp, TableProps } from 'antd';

import { PAGE_SIZE, SELECTED_USER_KEYS } from '@/lib/constants';

import { Pagination } from '@/types/Pagination';
import { User } from '@/types/User';

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
	pagination?: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

export function Users(): JSX.Element {
	const [searchValue, setSearchValue] = useState('');
	const [tableParams, setTableParams] = useState<TableParams>({
		pagination: {
			current: 1,
			pageSize: PAGE_SIZE,
		},
	});

	const limit = Number(tableParams.pagination?.pageSize);
	const skip = (Number(tableParams.pagination?.current) - 1) * limit;
	const hasFilters = tableParams.filters && Object.values(tableParams.filters).every((filter) => filter);
	const hasSearch = searchValue !== '';

	const params = new URLSearchParams(
		...(hasSearch
			? [
					{
						q: searchValue,
					},
				]
			: []),
		...(hasFilters
			? [
					{
						key: Object.keys(tableParams.filters as object).toString(),
						value: Object.values(tableParams.filters as object).toString(),
					},
				]
			: []),
		...(!hasSearch && !hasFilters
			? [
					{
						limit: limit.toString(),
						skip: skip.toString(),
						select: SELECTED_USER_KEYS.toString(),
					},
				]
			: [])
	);

	const { data, isLoading, isPlaceholderData } = useQuery<Pagination<User[]>>({
		queryKey: ['users', params.toString(), searchValue],
		queryFn: () =>
			fetch(
				`${import.meta.env.VITE_API_URL}/users${hasFilters && !hasSearch ? '/filter' : ''}${hasSearch && !hasFilters ? '/search' : ''}?${params.toString()}`
			).then((res) => res.json()),
		placeholderData: keepPreviousData,
	});

	const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
		setTableParams({
			pagination,
			filters,
			...sorter,
		});
	};

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
				render: (_, user) => <Link to={user.id?.toString()}>Details</Link>,
			},
		],
		[tableParams]
	);

	return (
		<div className="my-8">
			<Input.Search
				placeholder="Search for users"
				className="max-w-md mb-2"
				size="large"
				onSearch={(value) => setSearchValue(value)}
				loading={(searchValue !== '' && isLoading) || isPlaceholderData}
			/>
			<Table
				className="overflow-x-auto"
				loading={isLoading || isPlaceholderData}
				columns={columns}
				dataSource={data?.users}
				rowKey={({ id }) => id}
				onChange={handleTableChange}
				pagination={{ ...tableParams.pagination, total: data?.total }}
			/>
		</div>
	);
}
