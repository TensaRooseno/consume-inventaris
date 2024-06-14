import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Table({
    headers,
    data,
    endPointModal,
    inputData,
    titleModal,
    identitasColumn,
    opsiButton,
    columnForTd = {}
}) {
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [endPointToSend, setEndPointToSend] = useState({});
    const navigate = useNavigate();

    function handleModalDelete(id) {
        const endpointDelete = endPointModal['delete'];
        const endpointDetail = endPointModal['data_detail'];
        const replaceUrlDelete = endpointDelete.replace("{id}", id);
        const replaceUrlDetail = endpointDetail.replace("{id}", id);
        const endpointReplaced = {
            "data_detail": replaceUrlDetail,
            "delete": replaceUrlDelete,
        };
        setEndPointToSend(endpointReplaced);
        setIsModalDeleteOpen(true);
    }

    function handleModalEdit(id) {
        const endPointEdit = endPointModal['update'];
        const endPointDetail = endPointModal['data_detail'];
        const replaceUrlEdit = endPointEdit.replace("{id}", id);
        const replaceUrlDetail = endPointDetail.replace("{id}", id);
        const endPointReplaced = {
            "data_detail": replaceUrlDetail,
            "update": replaceUrlEdit
        };

        console.log(replaceUrlEdit);

        setEndPointToSend(endPointReplaced);
        setIsModalEditOpen(true);
    }

    function handleModalAdd() {
        setIsModalAddOpen(true);
    }

    function handleRestore(id) {
        const endpointRestore = endPointModal['restore'].replace("{id}", id);
        axios.put(endpointRestore, null, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
    }
    
    function handlePermanentDelete(id) {
        const endpointPermanentDelete = endPointModal['delete_permanent'].replace("{id}", id);
        axios.delete(endpointPermanentDelete, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
            }
        })
    }
    

    const instance = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-6">
            <div className="flex justify-end mb-4 space-x-3">
                {opsiButton.includes("create") && (
                    <button
                        type="button"
                        onClick={handleModalAdd}
                        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                    >
                        Create
                    </button>
                )}
                {opsiButton.includes("trash") && (
                    <Link
                        to={'/stuff/trash'}
                        className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-lg hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
                    >
                        Trash
                    </Link>
                )}
            </div>

            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headers.map((header, index) => (
                            <th scope="col" className="px-6 py-3" key={index}>
                                {header}
                            </th>
                        ))}
                        <th scope="col" className="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{index + 1}.</td>
                            {Object.entries(columnForTd).map(([key, value]) => (
                                <td key={key} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {!value ? item[key] : item[key.replace(/[!&*;:]/g, '')] ? item[key.replace(/[!&*;:]/g, '')][value] : '0'}
                                </td>
                            ))}
                            <td className="px-6 py-4 text-right space-x-2">
                                {opsiButton.includes("edit") && (
                                    <button
                                        type="button"
                                        onClick={() => handleModalEdit(item.id)}
                                        className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                                    >
                                        Edit
                                    </button>
                                )}
                                {opsiButton.includes("delete") && (
                                    <button
                                        type="button"
                                        onClick={() => handleModalDelete(item.id)}
                                        className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                                    >
                                        Delete
                                    </button>
                                )}
                                {opsiButton.includes("restore") && (
                                    <button
                                        onClick={() => handleRestore(item.id)}
                                        type="button"
                                        className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
                                    >
                                        Restore
                                    </button>
                                )}
                                {opsiButton.includes("permanentDeletes") && (
                                    <button
                                        onClick={() => handlePermanentDelete(item.id)}
                                        type="button"
                                        className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                                    >
                                        Permanent Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ModalDelete isOpen={isModalDeleteOpen} onClose={() => setIsModalDeleteOpen(false)} endPoint={endPointToSend} identitasColumn={identitasColumn} />
            <ModalEdit isOpen={isModalEditOpen} onClose={() => setIsModalEditOpen(false)} endPoint={endPointToSend} inputData={inputData} />
            <ModalAdd isOpen={isModalAddOpen} onClose={() => setIsModalAddOpen(false)} endPoint={endPointModal} inputData={inputData} titleModal={titleModal} />
        </div>
    );
}
