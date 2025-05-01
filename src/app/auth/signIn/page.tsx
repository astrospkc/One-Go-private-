import Link from 'next/link';
import AuthForm from '@/components/AuthForm';


export default function SignInPage() {

    return (

        <div className="w-full  font-serif relative z-10 max-w-md p-8  shadow-lg shadow-violet-300 justify-center rounded-3xl items-center">
            <h1 className=" font-bold mb-4 text-violet-300 text-4xl text-center">SIGN IN</h1>
            <AuthForm type="signin" />
            <p className="mt-4 text-sm">
                Don&apos;t have an account? <Link href="/auth/signup" className="text-blue-500 underline">Sign Up</Link>
            </p>
        </div>

    );
}
