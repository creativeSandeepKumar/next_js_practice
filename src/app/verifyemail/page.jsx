"user client";

import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page = () => {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [errors, setErrors] = useState(false);

    const verifyUserEmail = async () => {
        try {
            
        await axios.post('/api/users/verifiedemail', {token});
        setVerified(true);
    } catch (error) {
            setErrors(true);
            console.log(error.response.data);
    }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [token]);
    

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">Verified Email</h1>
        <h2>{token ? `${token}` : "no token"}</h2>
        {verified && (
            <div>
                <h2 className='text-2xl'>Email Verified</h2>
                <Link className='/login'>LogIn</Link>
            </div>
        )}
        { errors && (
            <div>
                <h2 className="text-2xl bg-red-500 text-black">Error</h2>
            </div>
        )}
    </div>
  )
}

export default page