import { getCurrentUser } from '@/lib/auth';
import { artisanRepository } from '@/lib/repository/artisan.repository';
import { redirect } from 'next/navigation';
import ArtisanProfileForm from './components/ArtisanProfileForm';

export default async function ArtisanProfilePage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    // Get current user from server-side
    const user = await getCurrentUser();

    // Redirect if not authenticated or not an artisan
    if (!user || user.role !== 'ARTISAN') {
        redirect('/login/artisan');
    }

    return (
        <div>
            <ArtisanProfileForm
            />
        </div>
    );
}
