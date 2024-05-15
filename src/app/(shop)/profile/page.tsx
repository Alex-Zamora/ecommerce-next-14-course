import { auth } from "@/auth.config";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import React from "react";

const ProfilePage = async () => {
    const session = await auth();

    // if (!session?.user) redirect("/auth/login?returnTo=/profile");
    if (!session?.user) redirect("/");

    return (
        <div>
            <Title title="Perfil" />

            <pre>{JSON.stringify(session.user, null, 2)}</pre>
        </div>
    );
};

export default ProfilePage;
