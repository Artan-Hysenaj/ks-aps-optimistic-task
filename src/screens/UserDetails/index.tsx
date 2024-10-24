import { HeartOutlined, ReadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';

import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { Avatar, Card, Empty, Skeleton, Spin, Tag, Typography } from 'antd';

import { getUserById, getUserPosts } from '@/api/dummyApi';

import BackButton from '@/components/BackButton';
import ErrorBoundary from '@/components/ErrorBoundary';

import { Pagination } from '@/types/Pagination';
import { Post } from '@/types/Post';
import { User } from '@/types/User';

export const Component = function UserDetails(): JSX.Element {
	const { id: userId } = useParams();

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
				<BackButton />
				<div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-x-4">
					<ErrorBoundary isError={userHasError} error={userError}>
						<Skeleton
							active
							loading={userLoading}
							className="max-w-md"
							avatar={{ className: 'w-20 h-20' }}
							paragraph={{ rows: 1 }}>
							<Avatar className="w-20 h-20" src={userData?.image} alt="User avatar image!" />
							<div className="space-y-1">
								<h3 className="text-center md:text-left text-2xl font-bold">
									{userData?.firstName} {userData?.lastName}
								</h3>
								<p className="text-sm text-gray-500">
									{userData?.age} years old, {userData?.email}, {userData?.phone}
								</p>
							</div>
						</Skeleton>
					</ErrorBoundary>
				</div>
				{postsLoading ? (
					<div className="min-h-40 md:min-h-80 flex justify-center items-center">
						<Spin size="large" />
					</div>
				) : (
					<ErrorBoundary isError={postsHasError} error={postsError}>
						{!postsData?.posts?.length ? (
							<Empty description={`${userData?.firstName} hasn't posted anything yet.`} />
						) : (
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
													<span>{post.reactions.likes}</span>
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
						)}
					</ErrorBoundary>
				)}
			</div>
		</Fragment>
	);
};
