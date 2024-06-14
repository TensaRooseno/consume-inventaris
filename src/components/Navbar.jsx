import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
    const [isLogin, setIsLogin] = useState(false);
    const [authUser, setAuthUser] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        axios.get('http://localhost:8000/profile', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setIsLogin(true);
            setAuthUser(res.data.data);
            if (location.pathname === '/login') {
                navigate('/profile');
            }
        })
        .catch(err => {
            setIsLogin(false);
            if (err.response && err.response.status === 401 && location.pathname !== '/login') {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!!!'));            
            }
        })
    }, [navigate, location.pathname]);

    return (
        <nav className="bg-blue-600 py-2">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link 
                            className="text-lg font-bold text-white uppercase"
                            to="/"
                        >
                            INVENTARIS APP
                        </Link>
                        {isLogin && authUser && authUser.role === 'admin' && (
                            <>
                                <Link to="/profile" className="text-white hover:underline">Profile</Link>
                                <Link to="/stuff" className="text-white hover:underline">Stuff</Link>
                                <Link to="/inbound-stuff" className="text-white hover:underline">Inbound</Link>
                                <Link to="/lending" className="text-white hover:underline">Lending</Link>
                                <Link to="/profile" className="text-white hover:underline">User</Link>
                            </>
                        )}
                        {isLogin && authUser && authUser.role !== 'admin' && (
                            <Link to="/lending" className="text-white hover:underline">Lending</Link>
                        )}
                    </div>
                    {!isLogin && (
                        <Link to="/login" className="text-white hover:underline">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
