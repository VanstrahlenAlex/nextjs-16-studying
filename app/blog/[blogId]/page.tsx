interface BlogIdPageProps {
	params: Promise<{
		blogId: string;
	}>;
}

export default async function BlogIdPage({ params }: BlogIdPageProps) {

	const {blogId} = await params;
	return (
		<div>
			<h1>Blog Post {blogId}</h1>
		</div>
	);
}

// 33:44