import { getAuth, signOut } from 'firebase/auth'; // Adjust import if needed
import firebase_app from '@/firebase/config';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const auth = getAuth(firebase_app)
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login'); // Redirect to login page or home page
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <nav className="sticky top-0 left-0 right-0 bg-white text-white shadow-lg p-4 flex justify-between items-center z-50">
      <div className="text-2xl font-bold text-blue-500">
        {/* Logo or Title */}
        KSU Portal
      </div>
      <button
        onClick={handleLogout}
        className="bg-blue-500 hover:scale-105 text-white font-bold py-2 px-4 rounded-full"
      >
        Logout
      </button>
    </nav>
  );
}
