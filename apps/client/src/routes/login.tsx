import { login } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState, type FormEvent } from 'react';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      navigate({ to: '/dashboard' });
    },
  });

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div className='mx-auto w-full lg:w-1/2 md:p-10 py-5 md:py-0'>
        <h1 className='text-center text-2xl sm:text-5xl font-semibold mb-2'>
          Welcome Back!
        </h1>
        <p className='text-md text-center'>Login to your account to continue</p>
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            loginMutation.mutate({ email, password });
          }}
          className='w-full mt-5 sm:mt-8'
        >
          <div className='mx-auto w-full sm:max-w-md md:max-w-lg flex flex-col gap-5'>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              placeholder='Enter Your Email'
              className='input input-bordered w-full'
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='Password'
              placeholder='Enter Your Password'
              className='input input-bordered w-full'
            />
            <button
              className='btn btn-active btn-primary btn-block'
              type='submit'
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
