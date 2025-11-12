import { getCurrentUser } from '@/lib/api';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: async ({ location, context }) => {
    try {
      const user = await context.queryClient.fetchQuery({
        queryKey: ['auth', 'me'],
        queryFn: getCurrentUser,
      });

      if (!user) {
        throw redirect({
          to: '/login',
          search: {
            redirect: location.href,
          },
        });
      }

      return { user };
    } catch (err) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  const { user } = Route.useRouteContext();

  return (
    <div className='min-h-screen'>
      <div className='navbar bg-base-100 border-b max-w-7xl mx-auto'>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                {' '}
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
            >
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>Properties</a>
              </li>
              {user.role === 'ROLE_ADMIN' && (
                <>
                  <li>
                    <a>Users</a>
                  </li>
                  <li>
                    <a>Investors</a>
                  </li>
                </>
              )}
            </ul>
          </div>
          <a className='btn btn-ghost text-xl'>RealtyComps</a>
        </div>
        <div className='navbar-center hidden lg:flex'>
          <ul className='menu menu-horizontal px-1'>
            <li>
              <a>Dashboard</a>
            </li>
            <li>
              <a>Properties</a>
            </li>
            {user.role === 'ROLE_ADMIN' && (
              <>
                <li>
                  <a>Users</a>
                </li>
                <li>
                  <a>Investors</a>
                </li>
              </>
            )}
          </ul>
        </div>
        <div className='navbar-end'>
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar avatar-placeholder'
            >
              <div className='text-neutral-content w-12 rounded-full'>
                <span className='text-xl'>DT</span>
              </div>
            </div>
            <ul
              tabIndex={-1}
              className='menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow'
            >
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='max-w-7xl mx-auto'>
        <Outlet />
      </div>
    </div>
  );
}
