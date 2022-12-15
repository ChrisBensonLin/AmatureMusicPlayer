import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Axios from "axios";

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userLogin: [{ userID: "" }],
            searchSinger: [{}],
            defaultSearch: [{ searchName: "" }],
            defaultUserId: [{ UserId: "" }]
        }
    }

    render() {
        return (

            <div className="navBackground bg-black-opacity-20 backdrop-blur">
                <nav className="navbar navbar-expand-lg d-flex justify-content-between bg-black">
                    {/* logo */}
                    <div>
                        <NavLink to="/" onClick={this.MusicPlayerBlock}>
                            <img src="/images/icon/AMATEURLog.png" alt="" />
                        </NavLink>
                    </div>
                    <div className=" d-flex">
                        <div className="box me-10">
                            {/* search button */}
                            <div className="searchContainer searchDropdown">
                                <span className="icon" onclick={this.dropdownClose}>
                                    <i class="fa fa-search"></i>
                                </span>
                                <input
                                    type="search"
                                    id="search"
                                    placeholder="Search..."
                                    onClick={this.mysearchFunction}
                                    className="searchDropbtn"
                                />
                            </div>
                            <div
                                id="mySearchDropdown"
                                className="searchDropdown-content container mt-2 pe-8 bg-black"
                            >
                                <div className="text-end pt-3">
                                    <button type="button" class="btn-close btn-close-white" aria-label="Close"
                                        onClick={this.CloseShow}></button>
                                </div>
                                <div className="py-5 d-flex">
                                    <input
                                        type="search"
                                        id="search"
                                        name="search"
                                        placeholder="請輸入創作者名稱..."
                                        className=" form-control w-75"
                                        value={this.state.defaultSearch[0].searchName}
                                        onChange={e => {
                                            let newState = { ...this.state }
                                            newState.defaultSearch[0].searchName = e.target.value
                                            this.setState({ newState });
                                        }}
                                    />
                                    <div>
                                        <a href={`/searchSinger/${this.state.defaultUserId[0].UserId}`} className="btn btn-md btn-gradation rounded-pill ms-5"
                                            style={{ width: '80px' }}
                                            onClick={this.searchSinger}
                                        >搜尋</a>
                                    </div>
                                </div>
                                {/* type button */}
                                <div className="d-flex">
                                    <NavLink to="/search/情歌"
                                        className="btn btn-xl btn-gradation m-2 rounded-pill"
                                    >
                                        情歌
                                    </NavLink>
                                    <NavLink to="/search/推薦"
                                        className="btn btn-xl btn-gradation m-2 rounded-pill"
                                    >
                                        推薦
                                    </NavLink>
                                    <NavLink to="/search/搖滾"
                                        className="btn btn-xl btn-gradation m-2 rounded-pill"
                                    >
                                        搖滾
                                    </NavLink>
                                </div>
                                <div class="d-flex pb-5">
                                    <NavLink to="/search/Funk"
                                        className="btn btn-xl btn-gradation m-2 rounded-pill"
                                    >
                                        Funk
                                    </NavLink>
                                    <NavLink to="/search/重金屬"
                                        className="btn btn-xl btn-gradation m-2 rounded-pill"
                                    >
                                        重金屬
                                    </NavLink>
                                    <NavLink to="/search/R&B"
                                        className="btn btn-xl btn-gradation m-2 rounded-pill"
                                    >
                                        R&B
                                    </NavLink>
                                </div>
                                {/* <hr /> */}
                                <div class="py-5 text-center">
                                    {/* <span class="fs-5 searchResult">查無此資料</span> */}
                                    {/* <button
                                        type="button"
                                        className="btn btn-gradation rounded-pill me-3"
                                        style={{ width: '80px' }}
                                    >
                                        清空
                                    </button> */}
                                </div>
                                {/* <div className="p-5 text-gray">
                                    <p className="fs-5">搖滾</p>
                                    <p className="fs-5 . my-2">老王樂團</p>
                                </div> */}
                            </div>
                        </div>
                        {/* login button */}
                        <div className="pe-5">{(document.cookie == "") ?
                            <NavLink to="/login" className="btn btn-xl btn-gradation rounded-pill ">登入</NavLink> :
                            <div class="dropdown">
                                <button class="btn btn-m dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">
                                    {/* <img src="/images/icon/person_white_24dp.svg" alt="" className="navLoginIcon " /> */}
                                    <span className="fs-4 mt-5 text-gray">會員中心</span>
                                </button>
                                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="dropdownMenuButton2" style={{ width: '180px' }}>
                                    <li className="text-center "><img src={this.state.userLogin[0].UserImage} alt="" className="border border-secondary border-3 rounded-circle" width="100px" /></li>
                                    {/* <li className="text-center mt-2"><p className="fs-5 text-decoration-underline">{this.state.userLogin[0].UserName}</p></li> */}
                                    <li className="text-center mt-5"><NavLink to={`/member/${document.cookie}`} class="dropdown-item fs-4 " onClick={this.MusicPlayerNone}>後台管理</NavLink></li>
                                    <li className="text-center mt-2"><a class="dropdown-item fs-4" href="#" onClick={this.logout}>登出</a></li>
                                    {/* <li className="text-center mt-5"><button class="dropdown-item btn btn-s btn-gradation rounded-pill w-75 m-auto">登出</button></li> */}
                                </ul>
                            </div>
                        }
                        </div>
                    </div>
                </nav >
            </div >
        )

    }
    //點擊進入會員中心 音樂播放器消失
    MusicPlayerNone = () => {
        document.querySelector('.control-container').classList.add('d-none')


    }
    //點擊首頁LOGO和登出 音樂播放器出來
    MusicPlayerBlock = () => {
        document.querySelector('.control-container').classList.remove('d-none')
    }
    logout = (e) => {
        var cookies = document.cookie.split(";");
        var cookie = cookies[0];
        var eqPos = cookie.indexOf("=");
        document.cookie = cookie + ";expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.location.href = "http://localhost:3000/";
    }
    componentDidMount = async () => {
        let result = await Axios.get("http://localhost:9000/search/singer");
        this.setState({ searchList: result.data });

        let resultUser = await Axios.get("http://localhost:9000/loginUser/1");
        this.setState({ userLogin: resultUser.data })

    };

    searchSinger = () => {
        var searchUserID = "";
        if (this.state.defaultSearch[0].searchName === "老王樂隊") {
            searchUserID = 1;
        } else if (this.state.defaultSearch[0].searchName === "怕胖團") {
            searchUserID = 2;
        } else if (this.state.defaultSearch[0].searchName === "麋先生") {
            searchUserID = 3;
        } else if (this.state.defaultSearch[0].searchName === "康士坦") {
            searchUserID = 4;
        } else if (this.state.defaultSearch[0].searchName === "血肉果汁機") {
            searchUserID = 5;
        } else if (this.state.defaultSearch[0].searchName === "冰球樂團") {
            searchUserID = 6;
        } else if (this.state.defaultSearch[0].searchName === "P!SCO") {
            searchUserID = 7;
        } else if (this.state.defaultSearch[0].searchName === "草東沒有派對") {
            searchUserID = 8;
        } else {

            // window.location = Error
        }

        let newState = { ...this.state }
        newState.defaultUserId[0].UserId = searchUserID;
        this.setState({ newState });
        console.log(searchUserID)
        console.log(this.state.defaultUserId[0].UserId)
        // let result = Axios.get(`http://localhost:9000/search/singer/${searchUserID}`);
        // this.setState({ defaultSearch: result.data });


        console.log(this.state.defaultUserId[0])





    }
    mysearchFunction = () => {
        document.getElementById("mySearchDropdown").classList.toggle("show");
    }
    CloseShow = () => {
        document.getElementById("mySearchDropdown").classList.remove("show");
    }
    // Close the dropdown if the user clicks outside of it
    dropdownClose = (event) => {
        if (!event.target.matches('.searchDropbtn')) {
            var dropdowns = document.getElementsByClassName("searchDropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }


}

export default Navigation;