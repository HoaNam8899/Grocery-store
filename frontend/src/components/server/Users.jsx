import React from 'react'
import { useEffect, useState } from 'react';
const Users = () => {

    const [users, setUsers] = useState([]);
    const [name, setName] = useState({
        fullname: ""
    });
    // const [reUsers, setReUsers] = useState([]);

    const fetchUser = async () => {
        try {
            let response = await fetch("http://localhost:3000/user");
            let data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser()
    }, [])

    const handleDelate = async (e, id) => {
        e.preventDefault();
        try {
            let res = await fetch(`http://localhost:3000/user/softDelete/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
            });
            fetchUser()
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdate = async (e, id) => {
        e.preventDefault();
        try {
            let res = await fetch(`http://localhost:3000/user/softUpdate/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json",
                },
            });
            fetchUser()
        } catch (error) {
            console.log(error);
        }
    }

    const handleFind = (e) => {
        if (name.fullname.replace(/\s+/g, '') !== "") {
            const data = users?.filter((i) => { return i.fullname.toLocaleLowerCase().includes(name.fullname.toLocaleLowerCase()) })
            setUsers(data);
        }

    }
    const handleReget = (e) => {
        e.preventDefault();
        fetchUser();
    }

    // pagination

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = users?.slice(firstIndex, lastIndex);
    const npage = Math.ceil(users?.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)

    function prePage() {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    function changCpage(id) {
        setCurrentPage(id);
    }
    function nextPage() {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <>
            <div className="body-admin m-0">
                <div className="container container-margin-0">
                    <div className="row">
                        <div className="containt-body col-xxl-12">
                            <div className="table-nav d-flex align-items-center mt-4 mb-4">
                                <div className="search d-flex align-items-center justify-content-between me-4">
                                    <input type="text" className="no-border me-2" onChange={(e) => setName({
                                        fullname: e.target.value
                                    })} />
                                    <button className="btn btn-success me-4" onClick={(e) => handleFind(e)}>Tìm kiếm</button>
                                    <button className='btn btn-success' onClick={(e) => handleReget(e)}>Toàn bộ</button>
                                </div>
                            </div>
                            <div className="body-table d-flex flex-column">
                                <table className="table table-bordered table-height" >
                                    <thead>
                                        <tr>
                                            <td style={{ width: '5%' }}>user_id</td>
                                            <td style={{ width: '10%' }}>email</td>
                                            <td style={{ width: '10%' }}>username</td>
                                            <td style={{ width: '10%' }}>fullname</td>
                                            <td style={{ width: '5%' }}>role</td>
                                            <td style={{ width: '5%' }}>status</td>
                                            <td style={{ width: '5%' }}>phone</td>
                                            <td style={{ width: '15%' }}>address</td>
                                            <td style={{ width: '10%' }}>time create</td>
                                            <td style={{ width: '10%' }}>time update</td>
                                            <td />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            records?.map((i, index) =>
                                                <tr key={index}>
                                                    <td>{i.user_id}</td>
                                                    <td>{i.email}</td>
                                                    <td>{i.username}</td>
                                                    <td>{i.fullname}</td>
                                                    <td>{i.role ? "admin" : "người dùng"}</td>
                                                    <td>{i.status ? "đang dùng" : "khóa"}</td>
                                                    <td>{i.phone}</td>
                                                    <td>{i.address}</td>
                                                    <td>{i.create_at}</td>
                                                    <td>{i.update_at}</td>
                                                    <td>
                                                        <button className="btn btn-primary me-2" onClick={(e) => handleUpdate(e, i.user_id)}>Update</button>
                                                        <button className="btn btn-danger" onClick={(e) => handleDelate(e, i.user_id)}>Delete</button>
                                                    </td>
                                                </tr>

                                            )
                                        }

                                    </tbody>
                                </table>
                                {/* pagination */}
                                <nav className='mt-auto align-self-center'>
                                    <ul className='pagination'>
                                        <li className='page-item'>
                                            <a className='page-link' href="#"
                                                onClick={prePage}
                                            > Prev</a>
                                        </li>

                                        {
                                            numbers?.map((n, i) =>
                                                <li className={`page-item ${currentPage === n ? "active" : " "}`} key={i}>
                                                    <a className='page-link' href="#"
                                                        onClick={() => changCpage(n)}
                                                    >{n}</a>
                                                </li>
                                            )
                                        }
                                        <li className='page-item'>
                                            <a className='page-link' href="#"
                                                onClick={nextPage}
                                            > Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default Users