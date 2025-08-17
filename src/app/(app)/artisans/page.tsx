import prisma from "@/lib/prisma";
import ArtisansPageClient from "./ArtisansPageClient";

async function getArtisans() {
    try {
        const artisans = await prisma.user.findMany({
            where: {
                role: 'ARTISAN'
            },
            include: {
                ArtisanProfile: true,
                ArtisanPrograms: {
                    where: {
                        isOpen: true
                    },
                    select: {
                        id: true,
                        title: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return artisans;
    } catch (error) {
        console.error('Error fetching artisans:', error);
        return [];
    }
}

export default async function ArtisansPage() {
    const artisans = await getArtisans();

    return <ArtisansPageClient initialArtisans={artisans} />;
}
