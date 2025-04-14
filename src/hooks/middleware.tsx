"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export function withAuth(
    WrappedComponent: React.ComponentType<any>,
    redirectPath: string = "/"
) {
    const AuthenticatedComponent = (props: any) => {
        const router = useRouter();
        const token = typeof window !== "undefined" && getCookie("token");

        useEffect(() => {
            if (!token) {
                router.push(redirectPath);
            }
        }, [token, redirectPath]);

        if (!token) return null;

        return <WrappedComponent {...props} />;
    };

    return AuthenticatedComponent;
}