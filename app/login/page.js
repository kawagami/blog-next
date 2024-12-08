"use client";

import Form from 'next/form'
import { login } from './actions';
import LoginButton from './login-button';
import { useActionState } from 'react';

export default function Login() {
    const [state, action] = useActionState(login, undefined);
    return (
        <div className="flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                <Form action={action} className="space-y-4">
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 mt-1 text-gray-900 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    {state?.error && (
                        <p className="text-sm text-red-500">{state.error}</p>
                    )}

                    <LoginButton />
                </Form>

            </div>
        </div>
    );
}
