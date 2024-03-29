// import logo from './logo.svg';
import Swal from 'sweetalert2'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
// import './CrdTask.css';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_API, GET_API, POST_API, UPDATE_API } from '../Action/Action';
import './CrdTask.css';
import Emp_Form from '../Emp_Form/Emp_Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap";
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { Link } from 'react-router-dom';
import { post_cmp } from '../Action/Complain_Action';
import { get_SCN } from '../Action/SelCmpName_Action';
window.bootstrap = bootstrap;
// import 'sweetalert2/src/sweetalert2.scss'
// import Swal from 'sweetalert2/dist/sweetalert2.js'

function CrdTask() {
    const [name, setName] = useState('');
    const [add, setAdd] = useState('');
    const [date, setDate] = useState('');
    const [desc, setDesc] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilterdData] = useState([]);
    const [searchState, setSearchState] = useState(false);
    const [errors, setErrors] = useState({});


    // complaint...
    const [Cmp_name, setCmp_name] = useState('');
    const [Emp_name, setEmp_name] = useState("");
    const [complain_email, setComplain_email] = useState('');
    const [Complain_desc, setComplain_desc] = useState('');
    const [complain_title, setComplain_title] = useState('');
    // const [complain_data, setComplain_data] = useState([]);
    const [empOptionsData, setEmpOptionsData] = useState([]);

    const dispatch = useDispatch();
    const GetAPIData = useSelector((state) => state.get_func.list)

    const GetAPICmp = useSelector((state) => state.get_func_cmp.cmpList)

    const GetAPISELCMPNAME = useSelector((state) => state.get_SCName_func.list_ScmpName)

    // get api............
    // let getCompData = () => {
    //     axios.get('http://127.0.0.1:8000/api/companies/').then((res) => {
    //         setEmpOptionsData(res.data);
    //         console.log(res.data);
    //     })
    // }


    let complainSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('company', JSON.parse(Cmp_name));
        formData.append('employee', JSON.parse(Emp_name));
        formData.append('email', complain_email);
        formData.append('discriptions', Complain_desc);
        formData.append('title', complain_title);
        // if (validateForm()) {

        // axios.post(`http://127.0.0.1:8000/api/complains/`, formData).then((res) => {
        dispatch(post_cmp(formData));
        // console.log(getCompData);
        // getCompData();

        reset_Data();
        // })
        successAlert();
        // }
    }
    const SelectCmp_Name = (e) => {
        setCmp_name(e.target.value);
        const cmpId = JSON.parse(e.target.value);
        // axios.get(`http://127.0.0.1:8000/api/companiesemp/${cmpId}/`).then((res) => {
        dispatch(get_SCN(cmpId))
        // console.log(res.data);
        // setEmpOptionsData(res.data);
        // })
    }

    // display search icon...hover
    // const [disbox, setDisbox] = useState(false);
    // const ShowSearchBox = () => {
    //     setDisbox(true);
    // }
    // const HideSearchBox = () => {
    //     setDisbox(false);
    // }


    const [selectedId, setSelectedId] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 5;
    let getpageno = searchState ? Math.ceil(filteredData.length / itemPerPage) : Math.ceil(data.length / itemPerPage)

    // let PageNumber = [];
    // if (getpageno <=5) {
    //     for (let i = 0; i < getpageno; i++) {
    //         PageNumber.push(i+1);
    //     }
    // }
    // else{
    //     for(let i=0;i<=3;i++){
    //         PageNumber.push(i+1);
    //     }
    //     PageNumber.push(`...`,getpageno);
    //     // i = i < currentPage ? currentPage - 1 : getpageno - 2;
    // }


    // while (i <= getpageno) {
    //     if (i <= 3 || i >= getpageno - 2 || i >= currentPage - 1 && i <= currentPage + 1) {
    //         PageNumber.push(i);
    //         i++;
    //     } else {
    //         PageNumber.push(`...`);
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

    // }

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
                if ((item.name.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) || (item.founded_date.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) || (item.headquarters_location.toString().toLowerCase().includes(e.target.value.toString().toLowerCase())) || (item.description.toString().toLowerCase().includes(e.target.value.toString().toLowerCase()))) {
                    return item;
                }
            })
            setFilterdData(filterData);
        }
        else {
            setSearchState(false)
        }
    }

    // ascending order by name...
    // let getData = () => {
    //     axios.get('http://127.0.0.1:8000/api/companies/').then((res) => {
    //         setData(res.data.sort((a, b) => {
    //             const fir_name = a.name.toLowerCase();
    //             const sec_name = b.name.toLowerCase();
    //             if (fir_name < sec_name) {
    //                 return -1;
    //             }
    //             if (fir_name > sec_name) {
    //                 return 1;
    //             }
    //             return 0;
    //         }));
    //     })
    // }

    useEffect(() => {
        if (GetAPIData !== null) {
            setData(GetAPIData);
        }
    }, [GetAPIData])

    useEffect(() => {
        if (GetAPICmp !== null) {
            setData(GetAPICmp);
        }
    }, [GetAPICmp])

    useEffect(() => {
        if (GetAPISELCMPNAME !== null) {
            // setData(GetAPISELCMPNAME);
            setEmpOptionsData(GetAPISELCMPNAME);
        }
    }, [GetAPISELCMPNAME])

    useEffect(() => {
        // getData();
        dispatch(GET_API());
        // dispatch(get_cmp_API());
    }, [])

    const validateForm = () => {
        var nm = /^[A-Za-z]+$/;   //name validation...

        const newErrors = {};
        if (!name) {
            newErrors.name = 'Name is required';
        }
        else if (!name.match(nm)) {
            newErrors.name = "name is not valid";
        }
        if (!date) {
            newErrors.date = 'Date is required';
        }
        if (!add) {
            newErrors.add = 'Add is required';
        }
        if (!desc) {
            newErrors.desc = 'Name is required';
        }

        // if (!pass) {
        //   newErrors.pass = 'Password is required';
        // } else if (pass.length < 8 || pass.length > 15) {
        //   newErrors.pass = 'Password length must be between 8 and 15 characters';
        // }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    let Submit_Data = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('founded_date', date);
        formData.append('headquarters_location', add);
        formData.append('description', desc);

        // 
        if (isUpdate && selectedId) {
            if (validateForm()) {
                // axios.put(`http://127.0.0.1:8000/api/companies/${selectedId}/`, formData).then((res) => {
                dispatch(UPDATE_API(selectedId, formData))
                // getData();
                reset_Data();
                setIsUpdate(false);
                setSelectedId(null);
                // });
                successAlert();
            }
        } else {
            if (validateForm()) {
                // axios.post('http://127.0.0.1:8000/api/companies/', formData).then((res) => {
                dispatch(POST_API(formData))
                // getData();
                dispatch(GET_API())
                reset_Data();
                // })
                successAlert();
            }
            else {
                InvaliAlert();
            }
        }
    }
    let reset_Data = () => {
        setName('');
        setAdd('');
        setDate('');
        setDesc('');
        setCmp_name('');
        setEmp_name('');
        setComplain_email('');
        setComplain_desc('');
        setComplain_title('');

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
                // axios.delete(`http://127.0.0.1:8000/api/companies/${id}/`).then((res) => {
                //     Swal.fire({
                //         title: 'deleted',
                //         text: "data deleted",
                //         icon: 'success',
                //         timer: 3000,
                //         showConfirmButton: false,
                //     })
                //     // getData();
                dispatch(DELETE_API(id));
                // })
            }
        })

    }
    let update_Data = (data1) => {
        setSelectedId(data1.id);
        setIsUpdate(true);
        // // Fetch the data for the selected ID here and set the state letiables to populate the form fields.
        // // For example:
        const data2 = data.find((item) => item.id === data1.id);
        setName(data2.name);
        setDate(data2.founded_date);
        setAdd(data2.headquarters_location);
        setDesc(data2.description);

        let myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
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
    let InvaliAlert = () => {
        Swal.fire({
            icon: "error",
            title: "Empty Fields",
            text: "Please Fill All Fields Clearly",
            // footer: '<a href="#">Why do I have this issue?</a>'
        });
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
                                <h4 className='h4 text-primary' style={{ fontFamily: 'cursive' }}>Company Info. System</h4>
                            </div> */}
                            {/* <div className='col-sm-12 col-md-6 col-lg-6' style={{ marginTop: '5px' }}>
                                {disbox ?
                                    <div className='search-btn container' onMouseOut={HideSearchBox} style={{ marginTop: '0px' }}>
                                        <input className='form-control border-primary text-primary' type="text" id="site-search" style={{ display: 'block' }} onChange={searchData} placeholder='Search Data by Company Name' /><SearchIcon style={{ width: '50px', height: '50px', marginTop: '0px', marginLeft: '-50px' }} />
                                        <hr className='hr hr-primary' />
                                    </div> :
                                    <div className='search-btn container' style={{ marginTop: '5px' }}>
                                        <SearchIcon style={{ width: '50px', height: '50px', marginTop: '0px', marginLeft: '-50px' }} onMouseOver={ShowSearchBox} />
                                        <hr className='hr hr-primary' />
                                    </div>}
                            </div> */}
                            {/* <!-- Button trigger modal --> */}
                            <div className='col-sm-12 col-md-4 col-lg-4'>
                                <button type="button" id='nav-btn' class="btn" style={{ backgroundColor: 'white', color: 'black', fontFamily: 'Arial' }} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Add User
                                </button>

                                {/* <!-- Modal --> */}
                                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Add User</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                {/* form start */}
                                                <form className='form'>
                                                    <div className='row'>
                                                        <div className='col-sm-12 col-md-6 col-lg-6'>
                                                            <label className='form-label' htmlFor='name'>Company Name</label>
                                                            <input type='text' className='form-control' name='name' value={name} onChange={(e) => setName(e.target.value)} />
                                                            {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
                                                        </div>
                                                        <div className='col-sm-12 col-md-6 col-lg-6'>
                                                            <label className='form-label' htmlFor='date'>Date</label>
                                                            <input type='date' className='form-control' name='date' value={date} onChange={(e) => setDate(e.target.value)} />
                                                            {errors.date && <p style={{ color: 'red' }}>{errors.date}</p>}
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-12 col-md-12 col-lg-12'>
                                                            <label className='form-label' htmlFor='location'>Location</label>
                                                            <input type='text' className='form-control' name='location' value={add} onChange={(e) => setAdd(e.target.value)} />
                                                            {errors.add && <p style={{ color: "red" }}>{errors.add}</p>}
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-12 col-md-12 col-lg-12'>
                                                            <label className='form-label' htmlFor='description'>Description</label>
                                                            <textarea class="form-control" placeholder="Leave a comment here" value={desc} id="floatingTextarea" onChange={(e) => setDesc(e.target.value)} ></textarea>
                                                            {errors.desc && <p style={{ color: "red" }}>{errors.desc}</p>}
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

                            {/* complaint */}
                            <div className='col-sm-12 col-md-4 col-lg-4'>
                                <button type="button" id='nav-btn' class="btn" style={{ backgroundColor: 'white', color: 'black', fontFamily: 'Arial' }} data-bs-toggle="modal" data-bs-target="#exampleModal1">
                                    complaint
                                </button>

                                {/* <!-- Modal --> */}
                                <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div class="modal-dialog">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">Complain</h5>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                {/* form start */}
                                                <form className='form'>
                                                    <div className='row'>
                                                        <div className='col-sm-12 col-md-6 col-lg-6'>
                                                            <label className='form-label' htmlFor='Cmp_name'>Company Name</label>
                                                            {/* <input type='text' className='form-control' name='Cmp_name' value={Cmp_name} onChange={(e) => setCmp_name(e.target.value)}/> */}
                                                            <select className='form-control' name='Cmp_name' value={Cmp_name} onChange={SelectCmp_Name}>
                                                                <option value="">Select company</option>
                                                                {data.map((Citem, id) => {
                                                                    return (
                                                                        <option key={id} value={Citem.id}>
                                                                            {Citem.name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                        <div className='col-sm-12 col-md-6 col-lg-6'>
                                                            <label className='form-label' htmlFor='Emp_name'>Employee Name</label>
                                                            {/* <input type='date' className='form-control' name='date' value={date} onChange={(e) => setDate(e.target.value)} /> */}
                                                            {/* <input type='text' className='form-control' name='Emp_name' value={Emp_name} onChange={(e) => setEmp_name(e.target.value)} /> */}

                                                            <select className='form-control' name='Emp_name' value={Emp_name} onChange={(e) => setEmp_name(e.target.value)}>
                                                                <option value=""> select employee</option>
                                                                {empOptionsData.map((CitemP, id) => {
                                                                    return (
                                                                        <option key={CitemP.id} value={CitemP.id}>
                                                                            {CitemP.first_name}</option>
                                                                    )
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-12 col-md-6 col-lg-6'>
                                                            <label className='form-label' htmlFor='complain_email'>email</label>
                                                            <input type='text' className='form-control' name='complain_email' value={complain_email} onChange={(e) => setComplain_email(e.target.value)} />
                                                        </div>
                                                        <div className='col-sm-12 col-md-6 col-lg-6'>
                                                            <label className='form-label' htmlFor='complain_title'>title</label>
                                                            <input type='text' className='form-control' name='complain_title' value={complain_title} onChange={(e) => setComplain_title(e.target.value)} />
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='col-sm-12 col-md-12 col-lg-12'>
                                                            <label className='form-label' htmlFor='Complain_desc'>Description</label>
                                                            <textarea class="form-control" placeholder="Leave a comment here" value={Complain_desc} id="floatingTextarea" onChange={(e) => setComplain_desc(e.target.value)} ></textarea>
                                                        </div>
                                                    </div>
                                                </form>
                                                {/* form end */}
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" >Close</button>
                                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={complainSubmit}>Save changes</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-sm-12 col-md-4 col-lg-4' style={{ marginTop: '5px' }}>
                                <div className='search-btn container' style={{ marginTop: '10px' }}>
                                    <input className='form-control border-primary text-primary' type="text" id="site-search" onChange={searchData} placeholder='Search Data' /><SearchIcon id="searchicon" style={{ width: '30px', height: '30px', marginTop: '5px', marginLeft: '-30px' }} />
                                    <hr className='hr hr-primary' />
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                    </nav>
                </div >
                {/* header end */}

                {/* table data show start */}
                <div className='container' id='show-data'>
                    <table>
                        <thead >
                            <tr>
                                <th>Sr.No.</th>
                                <th>Company Name</th>
                                <th>Founded date</th>
                                <th>Headquarter Location</th>
                                <th>Description</th>
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
                                                <td>{data.name}</td>
                                                <td>{data.founded_date}</td>
                                                <td>{data.headquarters_location}</td>
                                                <td>{data.description}</td>
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
                                            <tr key={index.id}>
                                                <td>{getIndex}</td>
                                                <td><Link to={`/company/${item.id}`}>{item.name}</Link></td>
                                                <td>{item.founded_date}</td>
                                                <td>{item.headquarters_location}</td>
                                                <td>{item.description}</td>
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
                </div>
                {/* table data show start */}
                <br />
                {/* pagination */}
                {
                    getpageno > 1
                        ? <div className='pagination justify-content-center border-primary'>
                            <button className='btn btn-primary' key={Number} id='Number' onClick={() => prevClick(Number)} style={{ marginLeft: '2px' }} disabled={currentPage == 1 ? true : false}>  prev</button>
                            {PageNumber.map((Number, index) => {
                                return (
                                    // <button className='btn btn-primary' key={Number} id='Number' onClick={() => handleClick(Number)} style={{ marginLeft: '2px' }}>{Number}</button>
                                    <button className="btn btn-primary" key={index} onClick={() => handleClick(Number)} style={{ marginLeft: '2px' }} > {Number} </button>
                                )
                            }
                            )}
                            <button className='btn btn-primary' key={Number} id='Number' onClick={() => NextClick(Number)} style={{ marginLeft: '2px' }} disabled={currentPage == getpageno ? true : false}>Next</button>
                        </div>
                        : null
                }
                {/* pagination end */}

            </div >
        </>
    );
}

export default CrdTask;
