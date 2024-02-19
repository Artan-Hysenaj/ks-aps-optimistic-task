import { HeartOutlined, MessageOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';

import { Fragment } from 'react';
import { useParams } from 'react-router-dom';

import { Avatar, Card, Tag, Typography } from 'antd';

import { Pagination } from '@/types/Pagination';
import { Post } from '@/types/Post';
import { User } from '@/types/User';


export const Component = function UserDetails(): JSX.Element {
	const { id: userId } = useParams();

	const { data: userData } = useQuery<User>({
		queryKey: ['user', userId],
		queryFn: () => fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/`).then((res) => res.json()),
	});

	const { data: postsData } = useQuery<Pagination<Post[]>>({
		queryKey: ['posts', userId],
		queryFn: () => fetch(`${import.meta.env.VITE_API_URL}/users/${userId}/posts`).then((res) => res.json()),
	});

	return (
		<Fragment>
			<div className="px-4 py-6 max-w-6xl mx-auto space-y-6">
				<div className="flex items-center space-x-4">
					<Avatar className="border w-20 h-20" src={userData?.image} />
					<div className="space-y-1">
						<h1 className="text-2xl font-bold">
							{userData?.firstName} {userData?.lastName}
						</h1>
						<p className="text-sm text-gray-500">
							{userData?.age} years old, {userData?.email}, {userData?.phone}
						</p>
					</div>
				</div>
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
										<MessageOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
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
			</div>
		</Fragment>
	);
};
