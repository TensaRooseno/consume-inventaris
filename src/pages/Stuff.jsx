import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import Table from "../components/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Stuff() {
    const [stuff, setStuff] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getStuff();
    }, []);

    function getStuff() {
        axios.get('http://localhost:8000/stuff', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            console.log(res.data);
            setStuff(res.data.data);
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda Belum Login!'));
            }
        });
    }

    const headers = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defect",
        "Action"
    ];

    const endpointModal = {
        "data_detail": "http://localhost:8000/stuff/show/{id}",
        "delete": "http://localhost:8000/stuff/delete/{id}",
        "update": "http://localhost:8000/stuff/update/{id}",
        "store": "http://localhost:8000/stuff/create",
    };

    const columnIdentitasDelete = 'name';

    const inputData = {
        "name": {
            "tag": "input",
            "type": "text",
            "option": null,
            "label": "Nama"
        },
        "category": {
            "tag": "select",
            "type": "select",
            "option": ['HTL', 'KLN', 'Teknisi/Sarpras'],
        },
    }
    
    const title = "Modal Title";

    const buttons = [
        "create",
        "trash",
        "edit",
        "delete"
    ]

    const tdColumn = {
        "name": null,
        "category": null,
        "stuff_stock": "total_available",
        "stuff_stock_defec": "total_defec"
    }

    return (
        <Case>
            <div className="flex justify-center">
                <div className="w-full max-w-5xl">
                    <Table
                        headers={headers}
                        data={stuff}
                        endPointModal={endpointModal}
                        inputData={inputData}
                        titleModal={title}
                        identitasColumn={columnIdentitasDelete}
                        opsiButton={buttons}
                        columnForTd={tdColumn}
                    />
                </div>
            </div>
        </Case>
    );
}
