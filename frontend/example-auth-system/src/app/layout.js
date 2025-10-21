import { AuthProvider } from '../context/AuthContext';
import './globals.css';

export const metadata = {
  title: 'Auth System',
  description: 'Simple Auth System Example',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}