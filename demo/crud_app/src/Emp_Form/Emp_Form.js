// import logo from './logo.svg';
import Swal from 'sweetalert2'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import './Emp_Form.css';
import './Emp_Form.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap"
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { Form, Link, useParams, useNavigate } from 'react-router-dom';
import CrdTask from '../CrdTask/CrdTask';
window.bootstrap = bootstrap;
// import { useNavigate } from 'react-router-dom';


// import 'sweetalert2/src/sweetalert2.scss'
// import Swal from 'sweetalert2/dist/sweetalert2.js'


function Emp_Form() {
    const { id } = useParams()
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [date, setDate] = useState('');
    const [Email, setEmail] = useState('');
    const [Contact, setContact] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilterdData] = useState([]);
    const [searchState, setSearchState] = useState(false);
    const [errors, setErrors] = useState({});

    const [selectedId, setSelectedId] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const userNavigat = useNavigate();
    const GotoComp = () => {
        userNavigat('/')
    }


    // display search icon...
    // const [disbox, setDisbox] = useState(false);
    // const ShowSearchBox = () => {
    //     setDisbox(true);
    // }
    // const HideSearchBox = () => {
    //     setDisbox(false);
    // }

    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 5;
    let getpageno = searchState ? Math.ceil(filteredData.length / itemPerPage) : Math.ceil(data.length / itemPerPage)

    // let PageNumber = [];
    // if (getpageno !== 0) {
    //     for (let i = 0; i < getpageno; i++) {
    //         PageNumber.push(i + 1);
    //     }
    // }

    // let PageNumber = [], i = 1;

    // while (i <= getpageno) {
    //     if (i <= 3 || i >= getpageno - 2 || i >= currentPage - 1 && i <= currentPage + 1) {
    //         PageNumber.push(i);
    //         i++;
    //     } else {
    //         PageNumber.push(<div>...</div>);
    //         i = i < currentPage ? currentPage - 1 : getpageno - 2;
    //     }
    // }

    let PageNumber = [];
    if (getpageno <= 7) {
        for (let i = 1; i <= getpageno; i++) {
            PageNumber.push(i);
        }
    } else {
        if (currentPage <= 4) {
            for (let i = 1; i <= 5; i++) {
                PageNumber.push(i);
            }
            PageNumber.push('...', getpageno);
        } else if (currentPage > getpageno - 4) {
            PageNumber.push(1, '...');
            for (let i = getpageno - 4; i <= getpageno; i++) {
                PageNumber.push(i);
            }
        } else {
            PageNumber.push(1, '...');
            // PageNumber.push(1);
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                PageNumber.push(i);
            }
            PageNumber.push('...', getpageno);
        }
    }



    let handleClick = (page) => {
        setCurrentPage(page);
    }
    let prevClick = (page) => {
        setCurrentPage(currentPage - 1);
    }
    let NextClick = (page) => {
        setCurrentPage(currentPage + 1);
    }


    const searchData = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value !== "") {
            setSearchState(true)
            let filterData = data.filter((item) => {
                if ((item.first_name.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) || (item.last_name.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) || (item.hire_date.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) || (item.email.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) || (item.phone.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()))) {
                    return item;
                }
            })
            setFilterdData(filterData);
        }
        else {
            setSearchState(false)
        }
    }

    const validateForm = () => {
        var nm = /^[A-Za-z]+$/;   //name validation...

        const newErrors = {};
        if (!fName) {
            newErrors.fName = 'Name is required';
        }
        else if (!fName.match(nm)) {
            newErrors.fName = "name is not valid";
        }
        if (!lName) {
            newErrors.lName = 'Name is required';
        }
        else if (!lName.match(nm)) {
            newErrors.lName = "name is not valid";
        }
        if (!date) {
            newErrors.date = 'Date is requierd';
        }
        if (!Email) {
            newErrors.Email = 'Email is required';
        } else if (!Email.includes('@') || !Email.includes('.')) {
            newErrors.Email = 'Invalid email format';
        }
        if (!Contact) {
            newErrors.Contact = 'Contact is required';
        } else if (Contact.length !== 10) {
            newErrors.Contact = 'Contact must be 10 digits';
        }
        // if (!pass) {
        //   newErrors.pass = 'Password is required';
        // } else if (pass.length < 8 || pass.length > 15) {
        //   newErrors.pass = 'Password length must be between 8 and 15 characters';
        // }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    let getData = () => {
        axios.get(`http://127.0.0.1:8000/api/companiesemp/${id}/`).then((res) => {
            setData(res.data);
        })
        console.log(id);
    }
    useEffect(() => {
        getData();
    }, [])


    let Submit_Data = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('first_name', fName);
        formData.append('last_name', lName);
        formData.append('hire_date', date);
        formData.append('email', Email);
        formData.append('phone', Contact);
        formData.append('company', JSON.parse(id));

        // 
        if (isUpdate && selectedId) {
            if (validateForm()) {
                axios.put(`http://127.0.0.1:8000/api/employees/${selectedId}/`, formData).then((res) => {
                    getData();
                    reset_Data();
                    setIsUpdate(false);
                    setSelectedId(null);
                });
                successAlert();
            }
        } else {
            if (validateForm()) {
                axios.post(`http://127.0.0.1:8000/api/employees/`, formData).then((res) => {
                    getData();
                    reset_Data();
                })
                successAlert();
            }
        }
    }
    let reset_Data = () => {
        setFName('');
        setLName('');
        setEmail('');
        setDate('');
        setContact('');
    }
    let delete_Data = (id) => {
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
                axios.delete(`http://127.0.0.1:8000/api/employees/${id}/`).then((res) => {
                    Swal.fire({
                        title: 'deleted',
                        text: "data deleted",
                        icon: 'success',
                        timer: 3000,
                        showConfirmButton: false,
                    })
                    getData();
                })
            }
        })

    }
    let update_Data = (data1) => {
        setSelectedId(data1.id);
        setIsUpdate(true);
        // // Fetch the data for the selected ID here and set the state letiables to populate the form fields.
        // // For example:
        const data2 = data.find((item) => item.id === data1.id);
        setFName(data2.first_name);
        setLName(data2.last_name);
        setDate(data2.hire_date);
        setEmail(data2.email);
        setContact(data2.phone);

        let myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
        // debugger
        // const modal = Modal.getOrCreateInstance(myModal);
        myModal.show();

    }
    let successAlert = () => {
        Swal.fire({
            title: 'successfull',
            text: "data inserted",
            icon: 'success',
            timer: 3000,
            showConfirmButton: false,
        })
    }

    // useEffect(()=>{
    //      axios.get('http://127.0.0.1:8000/api/companies/').then((res) => {
    //     setData(res.data);
    //   })
    //   .catch(err=>{
    //     console.log(err)
    // })
    //   },[setData])

    return (
        <>
            <div className='container-fluid'>
                {/* header start */}
                <div className='container'>
                    <nav>
                        <div className='row'>
                            {/* <div className='col-sm-12 col-md-6 col-lg-6'>
                                <h4 className='h4 text-primary' style={{ fontFamily: 'cursive' }}>Employee Info. System</h4>
                            </div> */}
                            {/* <div className='col-sm-12 col-md-6 col-lg-6' style={{marginTop:'5px'}}>
                                {disbox ?
                                    <div className='search-btn container' onMouseOut={HideSearchBox} style={{marginTop:'5px'}}>
                                        <input className='form-control border-primary text-primary' type="text" id="site-search" style={{ display: 'block' }} onChange={searchData} placeholder='Search Data by Company Name' /><SearchIcon style={{ width: '50px', height: '50px', marginTop: '0px', marginLeft: '-50px' }} />
                                        <hr className='hr hr-primary' />
                                    </div> :
                                    <div className='search-btn container' style={{marginTop:'5px'}}>
                                        <SearchIcon style={{ width: '50px', height: '50px', marginTop: '0px', marginLeft: '-50px' }} onMouseOver={ShowSearchBox} />
                                        <hr className='hr hr-primary' />
                                    </div>}
                            </div> */}
                            {/* <!-- Button trigger modal --> */}
                            <div className='col-sm-12 col-md-6 col-lg-6'>
                                <button type="button" id='nav-btn' class="btn" style={{ backgroundColor: 'white', color: 'black', fontFamily: 'Arial' }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Add Employee
                                </button>

                                {/* <!-- Modal --> */}
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Add Employee</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                {/* form start */}
                                                <form className='form'>
                                                    <div className='row'>
                                                        <div className='col-sm-12 col-md-6 col-lg-6'>
                                                            <label className='form-label' htmlFor='fName'>First Name</label>
                                                            <input type='text' className='form-control' name='fLame' value={fName} onChange={(e) => setFName(e.target.value)} />
                                                            {errors.fName && <p style={{ color: "red" }}>{errors.fName}</p>}
                                                        </div>
                                                        <div className='col-sm-12 col-md-6 col-lg-6'>
                                                            <label className='form-label' htmlFor='lName'>Last Name</label>
                                                            <input type='text' className='form-control' name='lName' value={lName} onChange={(e) => setLName(e.target.value)} />
                                                            {errors.lName && <p style={{ color: "red" }}>{errors.lName}</p>}
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-12 col-md-12 col-lg-12'>
                                                            <label className='form-label' htmlFor='date'>Hiring Date</label>
                                                            <input type='date' className='form-control' name='date' value={date} onChange={(e) => setDate(e.target.value)} />
                                                            {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-12 col-md-6 col-lg-6'>
                                                            <label className='form-label' htmlFor='contact'>Contact</label>
                                                            <input type='number' className='form-control' name='Contact' value={Contact} onChange={(e) => setContact(e.target.value)} />
                                                            {errors.Contact && <p style={{ color: "red" }}>{errors.Contact}</p>}
                                                        </div>
                                                        <div className='col-sm-12 col-md-6 col-lg-6'>
                                                            <label className='form-label' htmlFor='email'>Email</label>
                                                            <input type='email' className='form-control' name='Email' value={Email} onChange={(e) => setEmail(e.target.value)} />
                                                            {errors.Email && <p style={{ color: "red" }}>{errors.Email}</p>}
                                                        </div>
                                                    </div>
                                                </form>
                                                {/* form end */}
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={Submit_Data}>{isUpdate ? 'update changes' : 'Save changes'}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-6 col-lg-6' style={{ marginTop: '5px' }}>
                                <div className='search-btn container' style={{ marginTop: '10px' }}>
                                    <input className='form-control border-primary text-primary' type="text" id="site-search" onChange={searchData} placeholder='Search Data' /><SearchIcon style={{ width: '30px', height: '30px', marginTop: '5px', marginLeft: '-30px' }} />
                                    <hr className='hr hr-primary' />
                                </div>
                            </div>
                        </div >
                    </nav >
                </div >
                {/* header end */}
                {/* {disbox ?
                    <div className='search-btn container' onMouseOut={HideSearchBox}>
                        <input className='form-control border-primary text-primary' type="text" id="site-search" style={{ display: 'block' }} onChange={searchData} placeholder='Search Data by Company Name' /><SearchIcon style={{ width: '50px', height: '50px', marginTop: '0px', marginLeft: '-50px' }} />
                        <hr className='hr hr-primary' />
                    </div> :
                    <div className='search-btn container'>
                        <SearchIcon style={{ width: '50px', height: '50px', marginTop: '0px', marginLeft: '-50px' }} onMouseOver={ShowSearchBox} />
                        <hr className='hr hr-primary' />
                    </div>} */}
                {/* table data show start */}
                < div className='container' id='show-data' >
                    <table className='table'>
                        <thead style={{ backgroundColor: '#73DEDD' }}>
                            <tr>
                                <th>Sr.No.</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Founded date</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                searchState
                                    ? filteredData.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((data, i) => {
                                        let getIndex = (currentPage - 1) * itemPerPage + i + 1
                                        return (
                                            <tr key={i}>
                                                <td>{getIndex}</td>
                                                <td>{data.first_name}</td>
                                                <td>{data.last_name}</td>
                                                <td>{data.hire_date}</td>
                                                <td>{data.email}</td>
                                                <td>{data.phone}</td>
                                                <td>
                                                    <button className='btn btn-danger' onClick={() => delete_Data(data.id)}>Delete</button>
                                                    <button className='btn btn-success' style={{ marginLeft: '10px' }} onClick={() => { update_Data(data) }}>Update</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                    :
                                    data.slice((currentPage - 1) * itemPerPage, currentPage * itemPerPage).map((item, index) => {
                                        let getIndex = (currentPage - 1) * itemPerPage + index + 1
                                        return (
                                            <tr key={index}>
                                                <td>{getIndex}</td>
                                                <td><Link to={`/complain/${item.id}`}>{item.first_name}</Link></td>
                                                <td>{item.last_name}</td>
                                                <td>{item.hire_date}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>
                                                    <button className='btn' onClick={() => delete_Data(item.id)}><DeleteIcon id="delicon" /></button>
                                                    <button className='btn' onClick={() => { update_Data(item) }}><EditIcon id="editicon" /></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                            }
                        </tbody>
                    </table>
                    {/* </div > */}
                    {/* table data show start */}

                    {/* pagination */}
                    {
                        getpageno > 1
                            ? <div className='pagination justify-content-center border-primary'>
                                <button className='btn btn-primary' key={Number} id='Number' onClick={() => prevClick(Number)} style={{ marginLeft: '2px' }} disabled={currentPage == 1 ? true : false}>  prev</button>
                                {PageNumber.map((Number, index) => {
                                    return (
                                        // <button className='btn btn-primary' key={Number} id='Number' onClick={() => handleClick(Number)} style={{ marginLeft: '2px' }}>{Number}</button>
                                        <button className='btn btn-primary' key={index} onClick={() => handleClick(Number)} style={{ marginLeft: '2px' }}>{Number}</button>
                                    )
                                }
                                )}
                                <button className='btn btn-primary' key={Number} id='Number' onClick={() => NextClick(Number)} style={{ marginLeft: '2px' }} disabled={currentPage == getpageno ? true : false}>Next</button>
                            </div>
                            : null

                    }
                    <button className='btn btn-primary' type='submit' onClick={GotoComp}><ArrowBackIcon /></button>
                    {/* pagination end */}
                </div>
            </div >
        </>
    );
}

export default Emp_Form;
