import React from 'react';

interface FormData {
  startDate: string;
  endDate: string;
}

interface ScheduleSectionProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string | boolean) => void;
  errors: Record<string, string>;
}

export function ScheduleSection({ formData, handleInputChange, errors }: ScheduleSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Program Schedule</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
            Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="startDate"
            value={formData.startDate}
            onChange={(e) => handleInputChange("startDate", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.startDate ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.startDate && <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>}
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
            End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="endDate"
            value={formData.endDate}
            onChange={(e) => handleInputChange("endDate", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.endDate ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.endDate && <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>}
        </div>
      </div>
    </div>
  );
}