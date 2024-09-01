'use client'
import signIn from "@/firebase/auth/signIn";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

function Page(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)
  const router = useRouter();
  const emails = ['abhinandsanthosh101@gmail.com', "muhammedfawasus@gmail.com", "test@gmail.com"]


  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true)

    // Attempt to sign in with provided email and password
    const { result, error } = await signIn(email, password);

    if (error) {
      // Display and log any sign-in errors
      console.log(error);
      return;
    }

    // Sign in successful
    console.log(result);
    if (emails.includes(email)) {
      router.push("/admin");

    }
    setLoading(false)

    // Redirect to the admin page
    // Typically you would want to redirect them to a protected page an add a check to see if they are admin or 
    // create a new page for admin
    router.push("/");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center justify-center mb-5">
        <img src="/logo.png" alt="" className='w-3/4' />
      </div>
      <div className="w-full max-w-xs">
        <form onSubmit={handleForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold mb-6 text-black">Sign In</h1>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 flex justify-center items-center"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                'Sign In'
              )}
            </button>
          </div>
          <p className="mt-5 text-center">Don't have an account? <Link className="text-blue-500" href={'/signup'}>Sign Up</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Page;
