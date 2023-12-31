import Swal from 'sweetalert2'
import axios from 'axios'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import './Complain.css'

export default function Complain() {
    const { id } = useParams()
    const [comData, setCompData] = useState([]);
    const Navgt = useNavigate()

    const DeleteData = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://127.0.0.1:8000/complains/${id}/`).then((res) => {
                    Swal.fire({
                        title: 'deleted',
                        text: "data deleted",
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    })
                    fetchdata();
                })
            }
        })

    }


    const fetchdata = () => {
        axios.get(`http://127.0.0.1:8000/api/empcomplains/${id}/`).then((res) => {
            setCompData(res.data);
            console.log(res.data);
        })

    }
    useEffect(() => {
        fetchdata()
    }, [])
    const previousBtn = () => {
        window.history.back();
    }
    return (
        <div>
            <div className='container' id='cont_margin'>
                <table>
                    <thead>
                        <th>Sr.No.</th>
                        <th>Email</th>
                        <th>title</th>
                        <th>Descriptions</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {comData.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.email}</td>
                                    <td>{item.title}</td>
                                    <td>{item.discriptions}</td>
                                    <td>
                                        <button className='btn' onClick={() => DeleteData(item.id)}><DeleteIcon id='delbtn' /></button>
                                    </td>
                                </tr>
                            )
                        })
                        }
                    </tbody>
                </table>
                <br />
                <button className='btn btn-primary' type='submit' onClick={previousBtn}><ArrowBackIcon /></button>
            </div>
        </div>
    )
}
