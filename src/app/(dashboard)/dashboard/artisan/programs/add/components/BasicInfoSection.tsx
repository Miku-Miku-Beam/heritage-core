import { UploadButton } from "@/lib/utils";
import React from 'react';
import { AiAssistantPanel } from "./AiAssistantPanel";

interface FormData {
  title: string;
  description: string;
  duration: string;
  location: string;
  criteria: string;
  categoryId: string;
  programImageUrl: string;
}

interface Category {
  id: string;
  name: string;
}

interface BasicInfoSectionProps {
  formData: FormData;
  handleInputChange: (field: keyof FormData, value: string | boolean) => void;
  errors: Record<string, string>;
  categories: Category[];
  imageUrl: string;
  setImageUrl: (url: string) => void;
  isImageUploading: boolean;
  setIsImageUploading: (isUploading: boolean) => void;
  showAiAssistant: boolean;
  setShowAiAssistant: (show: boolean) => void;
  aiPrompt: string;
  setAiPrompt: (prompt: string) => void;
  isAiAssisting: boolean;
  handleAiAssist: () => Promise<void>;
}

export function BasicInfoSection({
  formData,
  handleInputChange,
  errors,
  categories,
  imageUrl,
  setImageUrl,
  isImageUploading,
  setIsImageUploading,
  showAiAssistant,
  setShowAiAssistant,
  aiPrompt,
  setAiPrompt,
  isAiAssisting,
  handleAiAssist,
}: BasicInfoSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
      <div className="space-y-6">
        {/* Program Image Upload */}
        <div>
          <label htmlFor="programImageFile" className="block text-sm font-medium text-gray-700 mb-2">
            Program Image <span className="text-red-500">*</span>
          </label>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setIsImageUploading(false);
              if (res && res[0]?.ufsUrl) {
                setImageUrl(res[0].ufsUrl);
                handleInputChange("programImageUrl", res[0].ufsUrl);
              }
            }}
            onUploadError={(error: Error) => {
              setIsImageUploading(false);
              alert(`ERROR! ${error.message}`);
            }}
            className="bg-amber-500 text-white px-3 py-1 rounded shadow hover:bg-amber-600 transition font-semibold text-sm max-w-fit"
          />
          {isImageUploading && (
            <div className="mt-2 flex items-center gap-2 text-blue-600">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span>Uploading image...</span>
            </div>
          )}
          {(imageUrl || formData.programImageUrl) && (
            <div className="mt-2">
              <img src={imageUrl || formData.programImageUrl} alt="Program" className="max-h-40 rounded shadow" />
            </div>
          )}
          {errors.programImageUrl && (
            <p className="text-sm text-red-500 mt-1">{errors.programImageUrl}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Program Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter program title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Program Description <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={() => setShowAiAssistant(!showAiAssistant)}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Writing Assistant
            </button>
          </div>
          <AiAssistantPanel
            showAiAssistant={showAiAssistant}
            aiPrompt={aiPrompt}
            setAiPrompt={setAiPrompt}
            isAiAssisting={isAiAssisting}
            handleAiAssist={handleAiAssist}
            setShowAiAssistant={setShowAiAssistant}
          />
          <textarea
            id="description"
            placeholder="Describe your program in detail"
            rows={4}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            id="categoryId"
            value={formData.categoryId}
            onChange={(e) => handleInputChange("categoryId", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.categoryId ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select program category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className="text-sm text-red-500 mt-1">{errors.categoryId}</p>}
        </div>

        {/* Duration and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
              Duration <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="duration"
              placeholder="Example: 3 months, 12 weeks"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.duration ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.duration && <p className="text-sm text-red-500 mt-1">{errors.duration}</p>}
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              placeholder="Enter program location"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.location ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
          </div>
        </div>

        {/* Criteria */}
        <div>
          <label htmlFor="criteria" className="block text-sm font-medium text-gray-700 mb-2">
            Participant Criteria <span className="text-red-500">*</span>
          </label>
          <textarea
            id="criteria"
            placeholder="Describe the criteria or requirements to join the program"
            rows={3}
            value={formData.criteria}
            onChange={(e) => handleInputChange("criteria", e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.criteria ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.criteria && <p className="text-sm text-red-500 mt-1">{errors.criteria}</p>}
        </div>
      </div>
    </div>
  );
}