interface AuthErrorsProps {
  error?: string | null;
}

export function AuthErrors({ error }: AuthErrorsProps ) {
  if (!error) return null;
  let errorMessage = error;
  if (error.includes('duplicate key value violates unique constraint')) {
    errorMessage = 'Usuário ou email já cadastrado';
  }
  return <div className="text-red-500 text-md italic py-2">{errorMessage}</div>;
}