"use client";
import { signUpSchema } from "@/app/schemas/auth";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, ControllerFieldState, ControllerRenderProps, useForm, UseFormStateReturn } from "react-hook-form";

export default function SignUpPage() {

	const form = useForm({
		resolver: zodResolver(signUpSchema),
		defaultValues:{
			email: "",
			password: "",
			name: "",
		}
	})
	return (
		<Card>
			<CardHeader>
				<CardTitle>Sign Up</CardTitle>
				<CardDescription>Create an account to get started</CardDescription>
			</CardHeader>
			<CardContent>
				<form >
					<FieldGroup>
						<Controller name="name" control={form.control} render={({field, fieldState}) => (
							<Field>
								<FieldLabel>Full Name</FieldLabel>
								<Input placeholder="John Doe" {...field} />
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)}/>
						<Controller name="email" control={form.control} render={({ field, fieldState }) => (
							<Field>
								<FieldLabel>Email</FieldLabel>
								<Input placeholder="john.doe@example.com" type="email" {...field} />
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)} />
						<Controller name="password" control={form.control} render={({ field, fieldState }) => (
							<Field>
								<FieldLabel>Password</FieldLabel>
								<Input placeholder="Your password" type="password" {...field} />
								{fieldState.invalid && (
									<FieldError errors={[fieldState.error]} />
								)}
							</Field>
						)} />
					</FieldGroup>
				</form>
			</CardContent>
		</Card>
	)
}