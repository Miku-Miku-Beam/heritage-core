import { getCurrentCookie } from '@/lib/auth';
import { repositories } from '@/lib/repository';
import Form from 'next/form';
import { redirect } from "next/navigation";
import { updateProfile } from './actions';

export default async function ProfilePage() {
  const user = await getCurrentCookie();

  if (!user || user.role !== "APPLICANT") {
    redirect("/login/applicant");
  }

  const userData = await repositories.user.getUserById(user.userId);
  console.log(userData);
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-gray-50 min-h-screen p-8">
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-8">My Profile</h1>
              <div className="bg-white rounded-xl shadow-lg p-8">
                
                <Form
                  action={updateProfile}
                  className="space-y-8"
                >
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={userData.name}
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
                      defaultValue={userData.location}
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
                      defaultValue={userData.ApplicantProfile?.background}
                      placeholder="Computer Science"
                      className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Interests
                    </label>
                    <select
                      name="interests"
                      defaultValue={userData.ApplicantProfile?.interests}
                      className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
                  </div>

                  {/* Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      defaultValue={userData.bio}
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
                      defaultValue={userData.ApplicantProfile?.portfolioUrl}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}