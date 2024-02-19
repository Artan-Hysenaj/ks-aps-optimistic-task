import { ArrowLeftOutlined, HeartOutlined, ReadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';

import { Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Avatar, Card, Skeleton, Spin, Tag, Typography } from 'antd';

import { getUserById, getUserPosts } from '@/api/dummyApi';

import ErrorBoundary from '@/components/ErrorBoundary';

import { Pagination } from '@/types/Pagination';
import { Post } from '@/types/Post';
import { User } from '@/types/User';

export const Component = function UserDetails(): JSX.Element {
	const { id: userId } = useParams();
	const navigate = useNavigate();

	const {
		data: userData,
		isLoading: userLoading,
		isError: userHasError,
		error: userError,
	} = useQuery<User>({
		queryKey: ['user', userId],
		queryFn: () => getUserById(String(userId)),
	});

	const {
		data: postsData,
		isLoading: postsLoading,
		isError: postsHasError,
		error: postsError,
	} = useQuery<Pagination<Post[]>>({
		queryKey: ['posts', userId],
		queryFn: () => getUserPosts(String(userId)),
	});

	return (
		<Fragment>
			<div className="px-4 py-6 max-w-6xl mx-auto space-y-6">
				<ArrowLeftOutlined
					// size={{ xs: 24, sm: 32, md: 40, lg: 48, xl: 56, xxl: 64 }}
					title="Go back"
					className="hover:cursor-pointer"
					onClick={() => navigate(-1)}
				/>
				<div className="flex items-center space-x-4">
					{userLoading ? (
						<Skeleton
							active
							className="max-w-md"
							avatar={{ className: 'w-20 h-20' }}
							paragraph={{ rows: 1 }}
						/>
					) : (
						<ErrorBoundary isError={userHasError} error={userError}>
							<Avatar className="w-20 h-20" src={userData?.image} />
							<div className="space-y-1">
								<h1 className="text-2xl font-bold">
									{userData?.firstName} {userData?.lastName}
								</h1>
								<p className="text-sm text-gray-500">
									{userData?.age} years old, {userData?.email}, {userData?.phone}
								</p>
							</div>
						</ErrorBoundary>
					)}
				</div>
				{postsLoading ? (
					<div className="min-h-40 md:min-h-80 flex justify-center items-center">
						<Spin tip="Loading" size="large" />
					</div>
				) : (
					<ErrorBoundary isError={postsHasError} error={postsError}>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{postsData?.posts.map((post) => (
								<div key={post.id} className="grid gap-2 md:gap-4">
									<Card
										className="border border-gray-200 dark:border-gray-800 rounded-lg"
										styles={{ body: { padding: '24px' } }}>
										<Typography.Title level={4}>{post.title}</Typography.Title>
										<Typography.Paragraph>{post.body}</Typography.Paragraph>
										<div className="flex items-center justify-between mt-4">
											<div className="flex items-center space-x-2">
												<HeartOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
												<span>{post.reactions}</span>
												<ReadOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
												<span>{post.tags.length}</span>
											</div>
											<div>
												{post.tags.map((tag) => (
													<Tag key={tag} color="blue">
														#{tag}
													</Tag>
												))}
											</div>
										</div>
									</Card>
								</div>
							))}
						</div>
					</ErrorBoundary>
				)}
			</div>
		</Fragment>
	);
};
