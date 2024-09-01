'use client'
import Navbar from '@/Components/Navbar';
import { useAuthContext } from '@/context/AuthContext';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

interface FormData {
  name: string;
  branch: string;
  sem: string;
  complaint: string;
}

export default function Home() {

  const { user } = useAuthContext() as { user: any }; // Use 'as' to assert the type as { user: any }
  const router = useRouter();

  useEffect(() => {
    // Redirect to the home page if the user is not logged in
    if (user == null) {
      router.push("/signin");
    }
    // }, [ user ] );
  }, [user, router]);

  const db = getFirestore()

  const [formData, setFormData] = useState<FormData>({
    name: '',
    branch: 'mechanical',
    sem: 'S1',
    complaint: ''
  });
  const [loading, setLoading] = useState(false); // Loading stat

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission (e.g., send formData to API)
    setLoading(true);
    console.log('Form Data:', formData);
    try {
      // Save form data to the "complaints" collection in Firestore
      const docRef = await addDoc(collection(db, 'complaints'), formData);
      console.log('Document written with ID: ', docRef.id);
      setFormData({ name: '', branch: 'mechanical', sem: 'S1', complaint: '' });
      alert("Complaint registered succesfully!")
      // Optionally, reset the form or provide user feedback
    } catch (error) {
      alert("An error occured. Please try again!")
      console.error('Error adding document: ', error);
    } finally {
      setLoading(false)
    }
  };

  if (!user) return <p>Authenticating...</p>
  return (
    <>
      <Navbar />
      <div className='p-8'>
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
          <div className="flex items-center justify-center mb-5">
            <img src="/logo.png" alt="" className='w-3/4' />
          </div>
          <h2 className="text-2xl font-bold mb-4">Complaint Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Branch</label>
              <select
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="mechanical">Mechanical</option>
                <option value="electronics">Electronics</option>
                <option value="computer">Computer</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Semester</label>
              <select
                name="sem"
                value={formData.sem}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="S1">S1</option>
                <option value="S2">S2</option>
                <option value="S3">S3</option>
                <option value="S4">S4</option>
                <option value="S5">S5</option>
                <option value="S6">S6</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Complaint</label>
              <textarea
                name="complaint"
                value={formData.complaint}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                placeholder="Describe your complaint"
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
          </form>
        </div>
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10 ">
          <p className='font-extrabold text-lg tracking-wider'>For Enquiries:</p>
          <div className='grid grid-cols-3 justify-center'>
            <div className='basis-1/3 p-2 text-center'>
              <img src="/faize.jpg" alt="" className='w-full rounded-full mb-2' />
              <p className='font-bold text-sm'>Faize U S</p>
              <p className='whitespace-nowrap font-bold text-sm'><a href="tel:7025598073">7025598073</a></p>
            </div>
            <div className='basis-1/3 p-2 text-center'>
              <img src="/contact2.jpg" alt="" className='w-full rounded-full mb-2' />
              <p className='font-bold text-sm'>Abhinanth</p>
              <p className='font-bold text-sm'><a href="tel:7558975922">7558975922</a></p>
            </div>
            <div className='basis-1/3 p-2 text-center'>
              <img src="/ismath.jpg" alt="" className='w-full rounded-full mb-2' />
              <p className='font-bold text-sm'>Ismath</p>
              <p className='font-bold text-sm'><a href="tel:9645651562">9645651562</a></p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
