"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { postSchema } from "@/app/schemas/blog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function CreateRoute() {

	const mutation = useMutation(api.posts.createPost)
	const form = useForm({
			resolver: zodResolver(postSchema),
			defaultValues:{
				title: "",
				content: "",
			}
		});

		function onSubmit(values: z.infer<typeof postSchema>) {
			mutation({
				body: values.content,
				title: values.title,
				createdAt: Date.now(),
				updatedAt: Date.now(),
				authorId: "",
			});
		}
		
	return (
		<div className="py-12">
			<div className="text-center mb-12">
				<h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">Create Post</h1>
				<p className="text-xl text-muted-foreground mt-4">Share your thoughts with Big the world...</p>
			</div>

			<Card className="w-full max-w-xl mx-auto">
				<CardHeader>
					<CardTitle>Create Post</CardTitle>
					<CardDescription>
						Create a new blog article...
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form 
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<FieldGroup className="gap-y-4">
							<Controller name="title" control={form.control} render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>Title</FieldLabel>
									<Input aria-invalid={fieldState.invalid} placeholder="Super cool title" {...field} />
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)} />
							<Controller name="content" control={form.control} render={({ field, fieldState }) => (
								<Field>
									<FieldLabel>Content</FieldLabel>
									<Textarea aria-invalid={fieldState.invalid} placeholder="Super cool content" {...field} />
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)} />	
							<Button type="submit">Create Post</Button>
						</FieldGroup>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}