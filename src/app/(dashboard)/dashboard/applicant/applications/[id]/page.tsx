import { getCurrentCookie } from "@/lib/auth";
import { repositories } from "@/lib/repository";
import { redirect } from "next/navigation";
import ApplicationDetailTabs from "./components/ApplicationDetailTabs";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ApplicationDetailPage({ params }: PageProps) {
    const user = await getCurrentCookie();
    if (!user || user.role !== "APPLICANT") {
        redirect("/login/applicant");
    }
    const { id } = await params;
    const application = await repositories.application.getApplicationById(id);
    if (!application) {
        redirect("/dashboard/applicant/applications");
    }
    
    return (
        <div className="mx-auto p-6">
            <ApplicationDetailTabs application={application} />
        </div>
    );
}
