"use client";

import { loginSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

export default function LoginPage() {


	const form = useForm({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		}
	});

	async function onSubmit(data : z.infer<typeof loginSchema>) {
			await authClient.signIn.email({
				email: data.email,
				password: data.password	,
			})
		}
	
	return (
		<Card>
			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>Login to get started right away</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className="gap-y-4">

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

						<Button type="submit">
							Login
						</Button>
					</FieldGroup>
				</form>
			</CardContent>
		</Card>	
	)
}