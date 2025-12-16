"use server";

import { api } from "@/convex/_generated/api";
import { postSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { z } from "zod";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";

export async function createBlogAction(values: z.infer<typeof postSchema>){
	

	try {
		const parsed = postSchema.safeParse(values);

		if (!parsed.success) {
			throw new Error("Something went wrong")
		}

		const token = await getToken();

		const imageUrl = await fetchMutation(api.posts.generateImageUploadUrl, {}, { token });
		const uploadResult = await fetch(imageUrl, {
			method: "POST",
			headers: {
				"Content-Type" : parsed.data.image.type,
			},
			body: parsed.data.image,
		})
		if(!uploadResult.ok){
			return {
				error : "Failed to upload image"
			}
		}
		const { storageId } = await uploadResult.json();
		await fetchMutation(api.posts.createPost, {
			body: parsed.data.content,
			title: parsed.data.title,
			imageStorageId: storageId,
			createdAt: Date.now(),
			updatedAt: Date.now(),
			authorId: "",
		}, { token }); 
	} catch (error) {
		return {
			error: "Failed to create post"
		}
	}

	revalidatePath("/blog");
	return redirect("/blog")
}