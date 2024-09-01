import { ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50 p-5">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        {children}
      </div>
    </div>
  );
}
