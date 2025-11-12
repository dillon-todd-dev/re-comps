import { createFileRoute } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center  px-4'>
      <h1 className='mb-6 text-center text-4xl font-bold'>
        Welcome to RealtyComps
      </h1>
      <p className='mb-8 max-w-2xl text-center text-xl'>
        Your ultimate platform for real estate property evaluation and
        management
      </p>
      <div className='space-x-4'>
        <button className='btn btn-primary'>
          <Link to='/login'>Sign In</Link>
        </button>
        <button className='btn btn-secondary'>
          <Link to='/contact'>Contact Us</Link>
        </button>
      </div>
    </div>
  );
}
