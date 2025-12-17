import { buttonVariants } from "@/components/ui/button";
import { CommentSection } from "@/components/web/CommentSection";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PostIdRouteProps {
	params: Promise<{ postId: Id<"posts"> }>
}

export default async function postIdRoute({ params }: PostIdRouteProps) {
	const { postId } = await params;

	const post = await fetchQuery(api.posts.getPostById, {postId: postId});
	// const comments = await fetchQuery(api.comments.getCommentsByPostId, { postId: postId });
	const preloadedComments = await preloadQuery(api.comments.getCommentsByPostId, { postId: postId });


	if(!post) {
		return (
			<div>
				<h1 className="text-6xl font-extrabold text-red-500 p-20">No post Found</h1>
			</div>
		)
	}
	return (
		<div className="max-w-3xl mx-auto py-8 ppx-4 animate-in fade-in-duration-500 relative">
			<Link className={buttonVariants({ variant: "outline", className: "mb-8" })} href="/blog">
				<ArrowLeft  className="size-4"/>
				Back to blog
			</Link>

			<div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
				<Image 
					src={post.imageUrl ?? "https://assets.basehub.com/abf101479dea7d2c/6f41915a5fe603226920bebbd79f8539/vercel0.webp"}
					alt={post.title}
					fill
					className="object-cover hover:scale-105 transition-all duration-300"
				/>
			</div>
			<div className="space-y-4 flex flex-col">
				<h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-foreground">{post.title}</h1>
				<p className="text-sm text-muted-foreground">Posted on: {new Date(post._creationTime).toLocaleDateString("en-US")}</p>
			</div>
			<Separator className="my-8"/>
			<p className="text-muted-foreground/90 text-lg leading-relaxed whitespace-pre-line">{post.body}</p>

			<Separator className="my-8"/>
			<CommentSection preloadedComments={preloadedComments}/>
		</div>
	)
}