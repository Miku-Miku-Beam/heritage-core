"use server";
import Form from 'next/form';
import { updateProfile } from "./page";

interface ApplicantProfile {
  background?: string;
  interests?: string;
  portfolioUrl?: string;
}

interface User {
  id: string;
  name?: string;
  bio?: string;
  location?: string;
  profileImageUrl?: string;
  ApplicantProfile?: ApplicantProfile;
}

interface ProfileFormProps {
  user: User;
}

export default async function ProfileForm({ user }: ProfileFormProps) {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>



      {/* Profile Form */}
      <Form
        action={async (formData: FormData) => {
          await updateProfile(formData);
        }}
        className="space-y-4"
      >
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            defaultValue={user.name}
            placeholder="Fawwaz Humam"
            className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location (City & Province/State)
          </label>
          <input
            type="text"
            name="location"
            defaultValue={user.location}
            placeholder="Yogyakarta, Special Region of Yogyakarta"
            className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        {/* Background */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background
          </label>
          <input
            type="text"
            name="background"
            defaultValue={user.ApplicantProfile?.background}
            placeholder="Computer Science"
            className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interests
          </label>
          <div className="relative">
            <select
              name="interests"
              defaultValue={user.ApplicantProfile?.interests}
              className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 appearance-none"
            >
              <option value="">Select your interests...</option>
              <option value="Indonesian Furniture">Indonesian Furniture</option>
              <option value="Traditional Batik">Traditional Batik</option>
              <option value="Wood Carving">Wood Carving</option>
              <option value="Pottery">Pottery</option>
              <option value="Textile Arts">Textile Arts</option>
              <option value="Keris Making">Keris Making</option>
              <option value="Cultural Heritage">Cultural Heritage</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 fill-current text-gray-400"
                viewBox="0 0 20 20"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bio
          </label>
          <textarea
            name="bio"
            defaultValue={user.bio}
            placeholder="I am a final-year Product Design student who fell in love with the detail and philosophy behind the Javanese Keris."
            rows={3}
            className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
          />
        </div>

        {/* Portfolio URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Portfolio URL (optional)
          </label>
          <input
            type="url"
            name="portfolioUrl"
            defaultValue={user.ApplicantProfile?.portfolioUrl}
            placeholder="https://your-portfolio.com"
            className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-8">
          <button
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
          >
            Update Profile
          </button>
        </div>
      </Form>
    </div>
  );
}