import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

// Create a new task with the given text
export const createPost = mutation({
	args: { 
			title: v.string(),
			body: v.string(),
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
		return posts;
	},
});
