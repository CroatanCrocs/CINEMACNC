"use client";

import Link from "next/link";
import { useActionState } from "react";
import { loginUserAction } from "@/data/actions/auth-actions";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ZodErrors } from "@/components/errors/zod-errors";
import { AuthErrors } from "@/components/errors/auth-errors";
import { SubmitButton } from "@/components/buttons/submit-button";

const INITIAL_STATE = {
  zodErrors: null,
  authErrors: null,
  data: null,
  message: null,
};

export function LoginForm() {
  const [formState, formAction] = useActionState(loginUserAction, INITIAL_STATE);
  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
            <CardDescription>
              Insira os detalhes para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Username ou Email</Label>
              <Input
                id="identifier"
                name="identifier"
                type="text"
                placeholder="username or email"
              />
              <ZodErrors error={formState?.zodErrors?.identifier} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
              <ZodErrors error={formState?.zodErrors?.password} />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <SubmitButton className="w-full" text="Entrar" loadingText="Carregando..." />
            <AuthErrors error={formState?.authErrors} />
          </CardFooter>
        </Card>        <div className="mt-4 text-center text-sm">
          Você não tem uma conta?
          <Link className="auth-link ml-2" href="register">
            Registre-se
          </Link>
        </div>
      </form>
    </div>
  );
}