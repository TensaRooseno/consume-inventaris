import React, { useEffect, useState } from "react";
import Case from "../components/Case";
import axios from "axios";
import Table from "../components/Table";
import { Navigate, useNavigate } from "react-router-dom";

export default function TrashStuff() {
    const [stuffTrash, setStuffTrash] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/stuff/trash', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
            setStuffTrash(res.data.data);
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            }
        });
    }, [navigate]);

    const headers = [
        "#", 
        "Name", 
        "Category",
        "action"
    ];

    const inputData = {};

    const title = 'Stuff';

    const identitasColumn = "name";

    const buttons = [
        "restore", 
        "permanentDeletes"
    ];

    const columnForTd = {
        "id": null,
        "name": null,
        "category": null
    };

    const endPointModal = {
        "restore": "http://localhost:8000/stuff/restore/{id}",
        "delete_permanent": "http://localhost:8000/stuff/permanentDel/{id}"
    };

    return (
        <Case>
            
            <Table 
                headers={headers} 
                data={stuffTrash} 
                endPointModal={endPointModal} 
                inputData={inputData} 
                titleModal={title} 
                identitasColumn={identitasColumn} 
                opsiButton={buttons} 
                columnForTd={columnForTd}
            />
        </Case>
    );
}
