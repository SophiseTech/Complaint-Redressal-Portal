import { AuthContextProvider } from '@/context/AuthContext';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/Components/Navbar';

// Load the Inter font with 'latin' subset
const inter = Inter( { subsets: [ 'latin' ] } );

// Metadata for the application
export const metadata = {
  title: 'KSU Poly Unit | Complaint Portal',
  description: 'Register your complaints with KSU Poly Unit Perumbavoor',
};

// Root layout component for the application
export default function RootLayout( { children }: { children: React.ReactNode } ): JSX.Element {
  return (
    <html lang="en">
      {/*
        The <head /> component will contain the components returned by the nearest parent
        head.js. It can be used to define the document head for SEO, metadata, and other purposes.
        Learn more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        {/* Wrap the children with the AuthContextProvider to provide authentication context */}
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
