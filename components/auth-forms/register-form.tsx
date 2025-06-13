"use client";

import * as React from "react";
import Link from "next/link";
import { useActionState } from "react";
import { registerUserAction } from "@/data/actions/auth-actions";
import { AuthErrors } from "@/components/errors/auth-errors";

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

const INITIAL_STATE = {
  data: null,
  zodErrors: undefined,
  authErrors: null,
  message: undefined,
};

export function RegisterForm() {
  const [formState, formAction] = useActionState(registerUserAction, INITIAL_STATE);

  React.useEffect(() => {
    // This ensures the form state is properly synced after hydration
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold">Crie uma conta!</CardTitle>
            <CardDescription>
              insira os detalhes para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário<ZodErrors error={formState?.zodErrors?.username} /></Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email<ZodErrors error={formState?.zodErrors?.email} /></Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha<ZodErrors error={formState?.zodErrors?.password} /></Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <button className="w-full">Criar</button>
            <AuthErrors error={formState?.authErrors} />
          </CardFooter>
        </Card>
        <div className="mt-4 text-center text-sm">
          Já tem uma conta?
          <Link className="auth-link ml-2" href="login">
            Entrar
          </Link>
        </div>
      </form>
    </div>
  );
}