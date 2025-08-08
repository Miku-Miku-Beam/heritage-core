"use server";

import { getCurrentCookie } from '@/lib/auth';
import { repositories } from '@/lib/repository';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateArtisanProfile(formData: FormData) {
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
