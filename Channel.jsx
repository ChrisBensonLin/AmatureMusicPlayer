import React, { Component } from "react";
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import Axios from "axios";
import swal from 'sweetalert';

import Music from "./Music";
import ChannelBlog from "./ChannelBlog";


class Channel extends Component {
  state = {
    trackListUser: [{}],
    userInfo: [{ UserID: this.props.match.params.id }],
    channelUser: [{}],
    creditCardInfo: [{}],
    defaultDonate: [{ ChannelID: this.props.match.params.id, UserID: document.cookie, money: "", Donate: this.getNowDate() }],
    userTrack: [{}],
    // trackListAll: [{}],
    defaulttrack: [{ UserID: "", ChannelID: this.props.match.params.id }]
  };

  render() {
    return (
      <BrowserRouter>
        <main>
          <div className="homeImg">
            {this.state.channelUser.map((item, idx) => (
              <img src={item.ChannelImage} alt="封面" className="w-100 h-100 object-cover" />
            ))}
          </div>
          <div className="container">
            <section className="channel_userInfo row">
              <div className="channel_userImgLeft col-md-5 col-12">
                <img
                  src={this.state.userInfo[0].UserImage}
                  alt="頭像"
                  className="channel_userImg imgRadius"
                />
                <div className="p-5">
                  <div className="pt-2">
                    <button
                      type="button"
                      id="isFollow"
                      style={{ width: "120px" }}
                      className={this.getClasses()}
                      onClick={this.doFollow}
                    >{this.FollowCheck()}
                    </button>


                    <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content bg-dark w-100">
                          {this.state.channelUser.map((item, idx) => (
                            <div className="modal-header">
                              <h4 className="modal-title text-white" id="exampleModalToggleLabel">贊助「{item.ChannelName}」</h4>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                          ))}
                          {this.state.creditCardInfo.map((item, idx) => (
                            <div className="modal-body">
                              <div className="row p-2">
                                <h6 className="col-4 m-auto fs-6">
                                  請輸入贊助金額
                                </h6>
                                <input
                                  type="text"
                                  className="form-control col-8"
                                  value={this.state.defaultDonate[0].money}
                                  onChange={e => {
                                    let newState = { ...this.state }
                                    newState.defaultDonate[0].money = e.target.value
                                    this.setState({ newState });
                                  }}
                                />
                              </div>
                              <div className="row mt-2 p-2">
                                <h6 className="col-4 fs-6 m-auto">請選擇卡片</h6>
                                <select
                                  name=""
                                  id="card"
                                  className="form-select col-8"
                                >
                                  {/* <option value="">請選擇</option> */}
                                  <option value="">{item.CreditNum}</option>
                                </select>
                              </div>
                              <div
                                className="mt-5 bg-black"
                                style={{ height: "200px", borderRadius: "20px" }}
                              >
                                <div className=" text-center pt-5">
                                  <div className="d-flex justify-content-between">
                                    <div className="ps-5">
                                      <img src="/images/icon/MastercardLogo.jpeg" alt="" style={{ width: '80px' }} />
                                      {/* <span className="fw-bold">玉山銀行</span> */}
                                    </div>
                                    <div className="">
                                      <img src="/images/icon/outline_rss_feed_white_36dp.png" alt="" className="cardIcon" />
                                    </div>
                                  </div>
                                  <div>
                                    <p className="fw-bold fs-4" style={{ letterSpacing: '5px' }}>{item.CreditNum}</p>
                                  </div>
                                  <div className="text-start ps-18 pt-5">
                                    <p>{item.CreditDeadLine}</p>
                                  </div>
                                  {/* <div>
                                <p>{item.CreatidSSC}</p>
                              </div> */}
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="modal-footer">
                            <button className="btn btn-secondary" onClick={this.doDonate} data-bs-toggle="modal">送出</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-secondary btn-m ms-4  px-4 hvr-bounce-to-right" data-bs-toggle="modal" href="#exampleModalToggle" role="button" style={{ width: "120px" }}>&rarr; 抖內</button>
                    {/* <h2 className="fs-1 userName my-5 ms-5"> */}
                    {/* {this.state.userInfo[0].UserName} */}
                    {/* </h2> */}
                  </div>
                </div>
                {this.state.channelUser.map((item, idx) => (
                  <div className=" ps-11">
                    <span className="fs-5 followText">追蹤人數：</span>
                    <span className="fs-5 followText">{item.ChannelFollow} 粉絲</span>
                  </div>
                ))}
                {this.state.channelUser.map((item, idx) => (
                  <div className="mt-3 ps-11">
                    <span className="fs-5 followText">成立時間：</span>
                    <span className="fs-5 followText">{item.ChannelDate}</span>
                  </div>
                ))}
              </div>
              <div className="col-md-7 col-12 channelInfoDiv" style={{ paddingTop: " 280px" }}>
                <div className="d-flex">
                  <div className="">
                    <span className="fs-1 pt-2">
                      <ins className="">
                        {this.state.userInfo[0].UserName}
                      </ins>
                    </span>
                  </div>
                  <div>
                    <a href={this.state.channelUser[0].ChannelLink}><img src="/images/icon/instagram.png" alt="" width={"36px"} className="ms-3 pt-2" /></a>
                  </div>
                  {/* <div className="pt-2"> */}
                  {/* </div> */}
                </div>
                {this.state.channelUser.map((item, idx) => (
                  <div className="pt-8 lh-lg">
                    <span className="text-justify ">{item.ChannelIntro}</span>

                  </div>
                ))}
              </div>
            </section>

            <section className="chaContent">
              {/* <ul className="nav nav-pills mb-3 justify-content-center "> */}
              <ul className="nav channelDiv mb-3 justify-content-center ">
                <li className="nav-item">
                  {/* <NavLink to="/channel" className="btn tab_link active"> */}
                  <NavLink
                    to={`/channel/${this.props.match.params.id}`}
                    className="btnLink btnActive btn btn-lg btn-outline-secondary"
                    style={{ width: "150px" }}
                  >
                    音樂創作
                  </NavLink>
                </li>
                <li className="nav-item">
                  {/* <NavLink to="/channelBlog" className="btn tab_link"> */}
                  <NavLink
                    to={`/channelBlog/${this.props.match.params.id}`}
                    className="btnLink btnActive btn btn-lg btn-outline-secondary"
                    // onClick={this.test}
                    style={{ width: "150px" }}
                  >
                    部落格
                  </NavLink>
                </li>
              </ul>

              <Switch>
                <Route path="/channel" component={Music} exact />
                <Route path="/channel/:id" component={Music} exact />
                <Route path="/channelBlog/:id" component={ChannelBlog} />
                {/* <Route
                  path="/channel/channelBlog/:id"
                  component={ChannelBlog}
                /> */}
              </Switch>
            </section>
          </div>
        </main >
      </BrowserRouter>
    );
  }
  componentDidMount = async () => {
    //頻道資料
    let result = await Axios.get(
      `http://localhost:9000/channel/${this.props.match.params.id}`
    );
    this.setState({ channelUser: result.data });

    //做作者登入資料
    let result2 = await Axios.get(
      `http://localhost:9000/channelUserInfo/${this.props.match.params.id}`);
    this.setState({ userInfo: result2.data });

    //登入創作者信用卡資料
    let result3 = await Axios.get(
      `http://localhost:9000/creditCardData/${document.cookie}`);
    this.setState({ creditCardInfo: result3.data });

    //指定追蹤名單
    let result4 = await Axios.get(`http://localhost:9000/userTrack/${this.props.match.params.id}`)
    this.setState({ userTrack: result4.data })


    //登入判斷ChannelID=UserID 不能點擊追蹤按鈕
    // let newState = { ...this.state };

    // newState.defaulttrack[0].ChannelID = this.props.match.params.id;
    // // console.log(this.defaulttrack);
    // this.setState({ newState });

    let channel = this.state.channelUser[0].ChannelID;
    let follow = document.querySelector('#isFollow');
    let newState = { ...this.state };
    newState.defaulttrack[0].UserID = document.cookie
    this.setState({ newState });

    if (channel == this.state.defaulttrack[0].UserID) {
      follow.setAttribute('disabled', 'disabled');
      follow.classList.add("btn-dark");
    }
    let result6 = await Axios.get(`http://localhost:9000/tracklistdata/${this.state.defaulttrack[0].UserID}/${this.props.match.params.id}`)
    this.setState({ trackListUser: result6.data })
    // console.log(result6)
    console.log(this.state.defaulttrack[0].UserID)
    // console.log(this.state.trackListUser[0])

  }



  //取得日期
  getNowDate() {
    var dd = new Date();
    return dd.toLocaleDateString()
  }
  test = async () => {

    console.log(this.state.userTrack);

  };


  //追蹤button  text change
  FollowCheck() {
    let Listchecked = "";
    Listchecked += (this.state.trackListUser[0]) ? "取消追蹤" : "+ 追蹤";
    return Listchecked;
  }
  //追蹤button  color change
  getClasses() {
    let classes = "btn btn-m ms-5 px-4 hvr-bounce-to-right btn-";
    classes += this.state.trackListUser[0] ? "primary" : "secondary";
    return classes;
  }
  //沒有資料就追蹤，有就刪除
  doFollow = async () => {
    let newState = { ...this.state }
    console.log(this.state.trackListUser[0]);
    if (this.state.trackListUser[0]) {
      newState.channelUser[0].ChannelFollow -= 1;
      let resultFollow = await Axios.post(`http://localhost:9000/followUpdate`, this.state.channelUser);
      window.location = `/channel/${this.props.match.params.id}`;
      let resultDelete = await Axios.delete(`http://localhost:9000/trackDelete/${this.props.match.params.id}`, this.state.userTrack);
    } else {
      let resultAdd = await Axios.post(`http://localhost:9000/trackAdd`, this.state.defaulttrack);
      newState.channelUser[0].ChannelFollow += 1
      this.setState({ newState });
      let resultFollow = await Axios.post(`http://localhost:9000/followUpdate`, this.state.channelUser)
      console.log(resultAdd);
    }

    window.location = `/channel/${this.props.match.params.id}`


  }
  //抖內
  doDonate = async () => {
    let result5 = await Axios.post(
      "http://localhost:9000/create/donate",
      this.state.defaultDonate);
    swal({
      title: `感謝${this.state.creditCardInfo[0].CreditName}贊助`,
      // text:
      icon: 'success',
      button: '確認'
    })

  }
  componentDidUpdate = async () => {
    window.scroll(0, 0);
  }
  changePage = async () => {
    setTimeout(() => {
      document.location.reload();
    }, 0)
  }
}
export default Channel;
