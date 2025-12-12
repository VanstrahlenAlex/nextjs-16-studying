"use client";
import { signUpSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, ControllerFieldState, ControllerRenderProps, useForm, UseFormStateReturn } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export default function SignUpPage() {
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(signUpSchema),
		defaultValues:{
			email: "",
			password: "",
			name: "",
		}
	});

	async function onSubmit(data : z.infer<typeof signUpSchema>) {
		startTransition(async() => {
			await authClient.signUp.email({
				email: data.email,
				password: data.password,
				name: data.name,
				fetchOptions: {
					onSuccess: () => {
						toast.success("Signed up successfully");
						router.push("/");
					},
					onError: (error) => {
						toast.error(error.error.message);
					}
				}
			})
		})
	}
	
	return (
		<Card>
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
				<CardDescription>Create an account to get started</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className="gap-y-4">
						<Controller name="name" control={form.control} render={({field, fieldState}) => (
							<Field>
								<FieldLabel>Full Name</FieldLabel>
								<Input aria-invalid={fieldState.invalid} placeholder="John Doe" {...field} />
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}/>
						<Controller name="email" control={form.control} render={({ field, fieldState }) => (
							<Field>
								<FieldLabel>Email</FieldLabel>
								<Input aria-invalid={fieldState.invalid} placeholder="john.doe@example.com" type="email" {...field} />
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)} />
						<Controller name="password" control={form.control} render={({ field, fieldState }) => (
							<Field>
								<FieldLabel>Password</FieldLabel>
								<Input aria-invalid={fieldState.invalid} placeholder="Your password" type="password" {...field} />
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)} />

						<Button disabled={isPending}>	
							{isPending ? (
								<>
									<Loader2 className="size-4 animate-spin" />
									<span>Loading...</span>
								</>
							) : (
								<span>Sign Up</span>
							)}
						</Button>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	)
}