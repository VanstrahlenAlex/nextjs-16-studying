// "use client";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api"
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

// Force dynamic rendering to avoid build-time Convex queries
export const dynamic = "force-dynamic";
export const revalidate = 0;


export const metadata: Metadata = {
	title: "Blog | Neextjs 16 - Convex",
	description: "Read our lastest articles and insights",
	category: "Web development",
	authors: [{ name: "Alexander Van strahlen" }],
	keywords: ["Nextjs", "Convex", "Web development", "Blog", "Alexander Van strahlen"],
}

export default function BlogPage() {

	// const data = useQuery(api.posts.getPosts)

	return (

		<div className="py-12 ">
			<div className="text-center pb-12">
				<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Our Blog</h1>
				<p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">Insights, thoughts, and trends from our team</p>
			</div>
			{/* <Suspense fallback={
				<SkeletonLoadingUi />
			}> */}
			<LoadBlogList />
			{/* </Suspense> */}
		</div>
	)
}

async function LoadBlogList() {
	const data = await fetchQuery(api.posts.getPosts);

	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{data?.map((post) => (
				<Card key={post._id} className="pt-0">
					<div className="relative h-48 w-full overflow-hidden">
						<Image
							src={post.imageUrl ?? "https://assets.basehub.com/abf101479dea7d2c/6f41915a5fe603226920bebbd79f8539/vercel0.webp"}
							alt={post.title}
							fill
							className="rounded-t-lg object-cover"
						/>
					</div>
					<CardContent>
						<Link href={`/blog/${post._id}`}>
							<h1 className="text-2xl font-bold hover:text-primary">{post.title}</h1>
						</Link>
						<p className="text-uted-foreground line-clamp-3 ">{post.body}</p>
					</CardContent>
					<CardFooter>
						<Link className={buttonVariants({
							className: "w-full"
						})} href={`/blog/${post._id}`}>Read More</Link>
					</CardFooter>
				</Card>
			))}

		</div>
	);
}


function SkeletonLoadingUi() {
	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{[...Array(3)].map((_, i) => <div className="flex flex-col space-y-3" key={i}>
				<Skeleton className="h-48 w-full rounded-xl" />
				<div className="space-y-2 flex flex-col">
					<Skeleton className="h-6 w-3/4" />
					<Skeleton className="h-4 w-ful" />
					<Skeleton className="h-4 w-2/3" />

				</div>
			</div>)}
		</div>
	)
}