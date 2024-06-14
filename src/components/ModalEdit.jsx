import React, { useState, useEffect } from "react";
import axios from "axios";

const ModalEdit = ({ isOpen, onClose, endPoint }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
    });

    useEffect(() => {
        if (isOpen && endPoint.data_detail) {
            axios.get(endPoint.data_detail, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }
            })
            .then(response => {
                setFormData(response.data.data);
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [isOpen, endPoint.data_detail]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(endPoint.update, formData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(response => {
            onClose();
            window.location.reload();  // Reload the page to see the changes
        })
        .catch(error => {
            console.error(error);
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-800 rounded-lg p-6 w-96">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white">Edit Stuff</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-200">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-300">Category</label>
                        <select
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-700 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        >
                            <option value="Teknisi/Sarpras">Teknisi/Sarpras</option>
                            <option value="KLN">KLN</option>
                            <option value="HTL">HTL</option>
                            {/* Add other categories as needed */}
                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Update Stuff
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalEdit;
