"use server";

import { getCurrentCookie } from '@/lib/auth';
import { repositories } from '@/lib/repository';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateProfile(formData: FormData) {
  const user = await getCurrentCookie();
  if (!user || user.role !== "APPLICANT") {
    redirect("/dashboard/applicant/profile?error=unauthorized");
  }

  const name = formData.get('name') as string;
  const location = formData.get('location') as string;
  const background = formData.get('background') as string;
  const interests = formData.get('interests') as string;
  const bio = formData.get('bio') as string;
  const portfolioUrl = formData.get('portfolioUrl') as string;

  if (!name || !location) {
    redirect("/dashboard/applicant/profile?error=missing-fields");
  }

  try {
    await repositories.user.updateUser(user.userId, { name, location, bio });
    await repositories.applicant.updateApplicantProfile(user.userId, { background, interests, portfolioUrl });
    revalidatePath('/dashboard/applicant/profile');
    redirect("/dashboard/applicant/profile?success=true");
  } catch (error) {
    console.error("Failed to update profile:", error);
    redirect("/dashboard/applicant/profile?error=update-failed");
  }
}
