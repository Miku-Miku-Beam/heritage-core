import React from 'react';

interface ActionButtonsProps {
  isSubmitting: boolean;
  handleReset: () => void;
  onCancel: () => void;
}

export function ActionButtons({ isSubmitting, handleReset, onCancel }: ActionButtonsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 pt-6">
      <button
        type="submit"
        disabled={isSubmitting}
        className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Creating Program...
          </>
        ) : (
          "Create Program"
        )}
      </button>
      <button
        type="button"
        onClick={handleReset}
        disabled={isSubmitting}
        className="flex-1 sm:flex-none bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
      >
        Reset Form
      </button>
      <button
        type="button"
        onClick={onCancel}
        disabled={isSubmitting}
        className="flex-1 sm:flex-none bg-white text-gray-700 px-6 py-3 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        Cancel
      </button>
    </div>
  );
}