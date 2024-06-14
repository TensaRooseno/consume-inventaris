import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

export default function Inbound() {
    const [inbounds, setInbounds] = useState([]);
    const [error, setError] = useState([]);

    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    useEffect(() => {
        instance.get('inbound', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
            .then(res => {
                setInbounds(res.data.data);
                console.log(res.data.data); // Added for debugging
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
                }
            });
    }, [navigate]);

    const deleteInbound = (id) => {
        instance.delete(`/inbound/destroy/${id}`)
            .then(res => {
                setInbounds(inbounds.filter(inbound => inbound.id !== id));
            })
            .catch(err => {
                setError(err.response ? err.response.data : { message: "An error occurred" });
            });
    };

    return (
        <Case>
            <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    <div className="flex justify-between">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Inbound</h5>
                        <div className="flex space-x-2 mr-10">
                            <Link to='create' className="px-4 py-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg flex items-center">
                                Tambah
                                <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                            </Link>
                            <Link to='/inbound-stuff/trash' className="px-4 py-2 bg-teal-700 text-white shadow-md border-sky-500 rounded-lg flex items-center">
                                Trash
                                <FontAwesomeIcon icon="fa-solid fa-trash" className="pl-1 w-4 h-4 text-inherit" />
                            </Link>
                        </div>
                    </div>
                    {
                        Object.keys(error).length > 0 && (
                            <div role="alert" className="mt-4">
                                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                    Gagal!
                                </div>
                                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                    <ul>
                                        <li>{error.message}</li>
                                    </ul>
                                </div>
                            </div>
                        )
                    }
                    <div className="flex mt-4 md:mt-6">
                        <table className="min-w-full text-left text-sm font-light">
                            <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-4">No</th>
                                    <th scope="col" className="px-6 py-4">Stuff</th>
                                    <th scope="col" className="px-6 py-4">Total</th>
                                    <th scope="col" className="px-6 py-4">Date</th>
                                    <th scope="col" className="px-6 py-4">File</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inbounds.map((inbound, id) => (
                                    <tr key={inbound.id} className="border-b dark:border-neutral-500">
                                        <td className="whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white">{id + 1}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white">{inbound.stuff ? inbound.stuff.name : 'No Stuff'}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white">{inbound.total}</td>
                                        <td className="whitespace-nowrap px-6 py-4 text-gray-900 dark:text-white">{inbound.date}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <img src={`http://localhost:8000/uploads/${inbound.proff_file}`} alt="Proof file" className="w-20 h-25 object-cover" />
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <button type="button" onClick={() => deleteInbound(inbound.id)} className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white">Hapus</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Case>
    );
}
