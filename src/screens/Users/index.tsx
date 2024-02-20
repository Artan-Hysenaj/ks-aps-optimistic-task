import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useState } from 'react';

import { Input } from 'antd';

import { getUsers } from '@/api/dummyApi';

import ErrorBoundary from '@/components/ErrorBoundary';
import UsersList from '@/components/UsersList';

import { PAGE_SIZE, SELECTED_USER_KEYS } from '@/lib/constants';

import { Pagination } from '@/types/Pagination';
import { TableParams } from '@/types/Table';
import { User } from '@/types/User';

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

	const { data, isLoading, isPlaceholderData, isError, error } = useQuery<Pagination<User[]>>({
		queryKey: ['users', searchValue, params.toString(), hasFilters, hasSearch],
		queryFn: () => getUsers(params.toString(), { filtering: !!hasFilters, searching: hasSearch }),
		placeholderData: keepPreviousData,
	});

	return (
		<div className="my-8">
			<Input.Search
				placeholder="Search for users"
				className="max-w-md mb-2"
				size="large"
				onSearch={(value) => setSearchValue(value)}
				loading={searchValue !== '' && (isLoading || isPlaceholderData)}
			/>
			<ErrorBoundary isError={isError} error={error}>
				<UsersList
					tableParams={tableParams}
					setTableParams={setTableParams}
					data={data}
					isLoading={isLoading}
					isPlaceholderData={isPlaceholderData}
				/>
			</ErrorBoundary>
		</div>
	);
}
