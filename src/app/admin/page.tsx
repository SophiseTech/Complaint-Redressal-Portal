'use client'
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import firebase_app from "@/firebase/config";
import Modal from "./Modal";

interface Complaint {
  id: string;
  name: string;
  branch: string;
  sem: string;
  complaint: string;
}

export default function AdminPage() {

  const { user } = useAuthContext() as { user: any }; // Use 'as' to assert the type as { user: any }
  const router = useRouter();
  const emails = ['abhinandsanthosh101@gmail.com', "muhammedfawasus@gmail.com", "test@gmail.com"]

  useEffect(() => {
    // Redirect to the home page if the user is not logged in
    if (user == null || !emails.includes(user.email)) {
      router.push("/signin");
    }
    // }, [ user ] );
  }, [user, router]);

  const db = getFirestore(firebase_app)
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'complaints'));
        const complaintList: Complaint[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Complaint[];
        setComplaints(complaintList);
      } catch (error) {
        console.error('Error fetching complaints: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const handleViewMore = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
  };

  if (!user) {
    return <p>Authenticating...</p>
  }
  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6 text-white pt-5">Admin - Complaints</h1>
      {loading ? (
        <p>Loading complaints...</p>
      ) : complaints.length > 0 ? (
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Name</th>
              <th className="py-2 px-4 border">Branch</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td className="py-2 px-4 border">{complaint.name}</td>
                <td className="py-2 px-4 border">{complaint.branch}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleViewMore(complaint)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No complaints found.</p>
      )}

      {/* Modal for showing complaint details */}
      {selectedComplaint && (
        <Modal onClose={closeModal}>
          <h2 className="text-xl font-bold mb-4">Complaint Details</h2>
          <p><strong>Name:</strong> {selectedComplaint.name}</p>
          <p><strong>Branch:</strong> {selectedComplaint.branch}</p>
          <p><strong>Semester:</strong> {selectedComplaint.sem}</p>
          <p><strong>Complaint:</strong> {selectedComplaint.complaint}</p>
          <button
            onClick={closeModal}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}

