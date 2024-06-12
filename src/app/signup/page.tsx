"use client";
import axios from 'axios';
import Link from 'next/link';
// import { useRouter } from 'next/router';   // server
import { useRouter } from 'next/navigation';    // client
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


// {
//   "email": "man@gmail.com",
//   "password": "1234",
//   "username": "mani"
// }

export default function page() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const router = useRouter();

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response: any = await axios.post('/api/users/signup', user);
      console.log("signup success :: ", response.data);

      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Signup"}</h1>
      <hr />

      <label htmlFor="username">username</label>
      <input
        value={user.username}
        onChange={e => setUser(c => ({ ...c, username: e.target.value }))}
        type="text"
        id="username"
        className='p-2 border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      />

      <label htmlFor="email">email</label>
      <input
        value={user.email}
        onChange={e => setUser(c => ({ ...c, email: e.target.value }))}
        type="email"
        id="email"
        className='p-2 border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      />

      <label htmlFor="password">password</label>
      <input
        value={user.password}
        onChange={e => setUser(c => ({ ...c, password: e.target.value }))}
        type="password"
        id="password"
        className='p-2 border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
      />

      <button
        onClick={onSignUp}
        disabled={buttonDisabled}
        className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >
        {buttonDisabled ? "No Signup" : "Signup"}
      </button>

      <Link href="/login">Visit login page</Link>

    </div>
  );
}