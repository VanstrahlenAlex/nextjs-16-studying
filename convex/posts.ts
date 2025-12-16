import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

// Create a new task with the given text
export const createPost = mutation({
	args: { 
			title: v.string(),
			body: v.string(),
			imageStorageId: v.id("_storage"),
			createdAt: v.number(),
			updatedAt: v.number(),
			authorId: v.string(), 
		},
	handler: async (ctx, args) => {
		const user = await authComponent.safeGetAuthUser(ctx);

		if(!user){
			throw new ConvexError("Not Authenticated")
		}
		const blogArticle = await ctx.db.insert("posts", {
			body: args.body,
			title: args.title,
			imageStorageId: args.imageStorageId,
			createdAt: args.createdAt,
			updatedAt: args.updatedAt,
			authorId: user._id,
		});

		return blogArticle;
	},
});

export const getPosts = query({
	args: {},
	handler: async (ctx) => {
		const posts = await ctx.db.query("posts").order("desc").collect();
		return await Promise.all(
			posts.map(async (post) => {
				const resolvedImageUrl = post.imageStorageId !== undefined ? await ctx.storage.getUrl(post.imageStorageId) : null;
				return {
					...post,
					imageUrl: resolvedImageUrl,
				}
			})
		)
	},
});


export const generateImageUploadUrl = mutation({
	args: {
		
	}, 
	handler: async (ctx) => {
		const user = await authComponent.safeGetAuthUser(ctx);

		if(!user){
			throw new ConvexError("Not Authenticated")
		}
		
		return await ctx.storage.generateUploadUrl()
	}
});

export const getPostById = query({
	args: {
		postId: v.id("posts"),
	},
	handler: async (ctx, args) => {
		const post = await ctx.db.get(args.postId);
		
		if(!post){
			throw new ConvexError("Not Found")
		}

		const resolvedImageUrl = post?.imageStorageId !== undefined ? await ctx.storage.getUrl(post.imageStorageId) : null;

		return {
			...post,
			imageUrl: resolvedImageUrl,
		}
	}
})