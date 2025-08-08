"use server";
import { getCurrentCookie } from '@/lib/auth';
import { repositories } from '@/lib/repository';
import { revalidatePath } from "next/cache";
import Form from 'next/form';
import { redirect } from "next/navigation";

export async function updateArtisanProfile(formData: FormData) {
  "use server";
  const user = await getCurrentCookie();
  if (!user || user.role !== "ARTISAN") {
    redirect("/dashboard/artisan/profile?error=unauthorized");
  }

  const name = formData.get('name') as string;
  const location = formData.get('location') as string;
  const expertise = formData.get('expertise') as string;
  const bio = formData.get('bio') as string;
  const portfolioUrl = formData.get('portfolioUrl') as string;
  const story = formData.get('story') as string;
  
  if (!name || !location || !expertise) {
    redirect("/dashboard/artisan/profile?error=missing-fields");
  }

  try {
    // Update user basic info
    await repositories.user.updateUser(user.userId, { name, location, bio });
    
    // Update or create artisan profile
    await repositories.artisan.updateArtisanProfile(user.userId, {
      story,
      expertise,
      location
    });

    // Revalidate the path before redirecting
    revalidatePath('/dashboard/artisan/profile');

    // Redirect to success page
  } catch (error) {
    console.error("Failed to update artisan profile:", error);
    redirect("/dashboard/artisan/profile?error=update-failed");
  }
}

export default async function ArtisanProfilePage() {
  const user = await getCurrentCookie();

  if (!user || user.role !== "ARTISAN") {
    redirect("/login/artisan");
  }

  const userData = await repositories.user.getUserById(user.userId);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-gray-50 min-h-screen p-8">
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-8">My Profile</h1>
              <div className="bg-white rounded-xl shadow-lg p-8">
                
                <Form
                  action={updateArtisanProfile}
                  className="space-y-8"
                >
                  {/* Profile Image Section */}
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4 relative overflow-hidden">
                      {userData.profileImageUrl ? (
                        <img
                          src={userData.profileImageUrl}
                          alt="Profile"
                          className="w-32 h-32 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center">
                          <span className="text-white font-bold text-2xl">
                            {userData.name?.charAt(0)?.toUpperCase() || 'A'}
                          </span>
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-gray-600">Profile Image</span>
                  </div>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={userData.name}
                      placeholder="Dekhsa Afnan"
                      className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                      defaultValue={userData.location || userData.ArtisanProfile?.location}
                      placeholder="Yogyakarta, Special Region of Yogyakarta"
                      className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>

                  {/* Expertise */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expertise
                    </label>
                    <select
                      name="expertise"
                      defaultValue={userData.ArtisanProfile?.expertise}
                      className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    >
                      <option value="">Select Expertise</option>
                      <option value="Batik Tulis">Batik Tulis</option>
                      <option value="Batik Cap">Batik Cap</option>
                      <option value="Tenun">Tenun</option>
                      <option value="Keramik">Keramik</option>
                      <option value="Ukir Kayu">Ukir Kayu</option>
                      <option value="Anyaman">Anyaman</option>
                      <option value="Patung">Patung</option>
                      <option value="Wayang">Wayang</option>
                      <option value="Keris Making">Keris Making</option>
                      <option value="Traditional Jewelry">Traditional Jewelry</option>
                      <option value="Songket">Songket</option>
                      <option value="Leather Craft">Leather Craft</option>
                    </select>
                  </div>

                  {/* Bio/Story */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      defaultValue={userData.bio || userData.ArtisanProfile?.story}
                      placeholder="Tell your story as an artisan. Share your journey, passion, and what makes your craft special..."
                      rows={2}
                      className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Story
                    </label>
                    <textarea
                      name="story"
                      defaultValue={userData.ArtisanProfile?.story}
                      placeholder="Tell your story as an artisan. Share your journey, passion, and what makes your craft special..."
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
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
                      defaultValue={userData.ArtisanProfile?.works?.[0]}
                      placeholder="https://your-portfolio.com"
                      className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {/* Years of Experience */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Years of Experience
                    </label>
                    <select
                      name="experience"
                      className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select Experience Level</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="3-5 years">3-5 years</option>
                      <option value="6-10 years">6-10 years</option>
                      <option value="11-15 years">11-15 years</option>
                      <option value="16-20 years">16-20 years</option>
                      <option value="20+ years">20+ years</option>
                    </select>
                  </div> */}

                  {/* Workshop Address */}
                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Workshop Address (optional)
                    </label>
                    <textarea
                      name="workshopAddress"
                      placeholder="Jl. Malioboro No. 123, Yogyakarta"
                      rows={2}
                      className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                    />
                  </div> */}

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number (optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+62 812-3456-7890"
                        className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        WhatsApp (optional)
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        placeholder="+62 812-3456-7890"
                        className="w-full px-3 py-2 bg-gray-200 border-0 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-8 flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-medium"
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