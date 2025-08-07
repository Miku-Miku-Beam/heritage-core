"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LogoutButton = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      // Call logout API endpoint
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Redirect to home page after successful logout
        router.push('/');
        router.refresh();
      } else {
        console.error('Logout failed:', await response.text());
        // Fallback: clear cookie manually and redirect
        document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Error logging out:', error);
      // Fallback: clear cookie manually and redirect
      document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      router.push('/');
      router.refresh();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className={`font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm ${
        isLoading 
          ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
          : 'bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 hover:border-red-300'
      }`}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Logging out...
        </div>
      ) : (
        'Logout'
      )}
    </button>
  );
};

export default LogoutButton;
