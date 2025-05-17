"use client"
import Link from 'next/link';
import AuthForm from '@/components/AuthForm';
// import axios from 'axios';

export default function SignUpPage() {

    return (

        <div className="w-full relative z-10 max-w-md p-8  font-serif shadow-lg shadow-violet-300 justify-center rounded-3xl items-center">

            <h1 className="text-4xl font-bold mb-4 text-violet-300 text-center">SIGN UP</h1>
            <AuthForm type="signup" />
            <p className="mt-4 text-sm">
                Already have an account? <Link href="/auth/signin" className="text-blue-500 underline">Sign In</Link>
            </p>
        </div>

    );
}
