import { getInvitation } from '@/lib/api';
import { createFileRoute, notFound } from '@tanstack/react-router';

export const Route = createFileRoute('/set-password/$token')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const invitation = await getInvitation(params.token);
    return { invitation };
  },
});

function RouteComponent() {
  const { invitation } = Route.useLoaderData();
  if (invitation.error) {
    return notFound();
  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-md w-full space-y-8 rounded-lg shadow'>
        <div>
          <h2 className='text-center text-3xl font-extrabold'>
            Welcome to RealtyComps
          </h2>
          <p className='mt-2 text-center text-sm'>
            Please set your passwrod to activate your account
          </p>
          <p className='mt-1 text-center text-sm'>{invitation.user?.email}</p>
        </div>
        <form className='mt-8 space-y-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='password' className='block text-sm font-medium'>
                New Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                required
                className='input mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500'
                placeholder='Enter your password'
                min='8'
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
