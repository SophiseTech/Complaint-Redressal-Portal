'use client'
import signUp from "@/firebase/auth/signup";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

function Page(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false)

  // Handle form submission
  const handleForm = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoading(true)

    // Attempt to sign up with provided email and password
    const { result, error } = await signUp(email, password);

    if (error) {
      // Display and log any sign-up errors
      console.log(error);
      return;
    }

    // Sign up successful
    setLoading(false)

    // Redirect to the admin page
    router.push("/admin");
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen text-black p-8">
      <div className="flex items-center justify-center mb-5">
        <img src="/logo.png" alt="" className='w-3/4' />
      </div>
      <div className="w-full bg-white rounded shadow p-6">
        <h1 className="text-3xl font-bold mb-6">Registration</h1>
        <form onSubmit={handleForm} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              name="email"
              id="email"
              placeholder="example@mail.com"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              name="password"
              id="password"
              placeholder="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
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
              'Submit'
            )}
          </button>
          <p className="mt-5 text-center">Already a member? <Link className="text-blue-500" href={'/signin'}>Log In</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Page;
