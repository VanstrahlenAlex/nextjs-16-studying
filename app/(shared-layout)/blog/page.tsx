"use client";
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

export default function BlogPage() {

	const data = useQuery(api.posts.getPosts)
	return (
		<div>
			<h1>Blog</h1>
			<p>{data?.[0].title}</p>
		</div>
	)
}