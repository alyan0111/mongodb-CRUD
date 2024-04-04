import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FormData = () => {
    const [formData, setFormData] = useState([]);
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            
            const raw = JSON.stringify({
              "id": id
            });
            
            const requestOptions = {
              method: "POST",
              headers: myHeaders,
              body: raw,
              redirect: "follow"
            };
            
            fetch("http://localhost:8080/deleltedata", requestOptions)
              .then((response) => response.text())
              .then((result) => console.log(result))
              .catch((error) => console.error(error));
            
            fetchData(); // Refresh data after deletion
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8080/fetchData");
            const data = await response.json();
            setFormData(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdate = (id) => {
        navigate(`/update/${id}`);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Form Data</h2>
            <div>
                {formData.map((data, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-md mb-4">
                        <h3 className="text-xl text-slate-800 font-bold">{data.name}</h3>
                        <p className="text-gray-700">Email: {data.email}</p>
                        <div className="mt-4">
                            <button
                                onClick={() => handleDelete(data._id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
                            >
                                Delete
                            </button>
                            <button
                                onClick={() => handleUpdate(data._id)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Update
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormData;
