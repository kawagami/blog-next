"use server";

import { redirect } from 'next/navigation';
import { createAuthRequest } from "@/libs/createAuthRequest";

const memberRequest = createAuthRequest("access_token", async () => {
    redirect('/login');
});

export default memberRequest;
