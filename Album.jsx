import Axios from "axios";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Album extends Component {
  state = {
    albumList: [{}],
    defaultAlbum: [{ num: "" }],
    albumItem: [{}]
  }
  render() {
    return (
      <main className="container py-md-20">
        <section className="row bg-white-opacity-10 p-15">
          <div className="col-md-5 AlbumDiv">
            <img
              src={this.state.albumItem[0].AlbumImage}
              alt=""
              className="channel_userImg w-100 h-100 object-cover"
            />
          </div>
          <div className="m-auto col-md-7 pt-10">
            <h2>{this.state.albumItem[0].Album}</h2>
            <p className="mt-3">專輯‧{this.state.albumItem[0].Singer}‧{this.state.albumItem[0].AlbumTime}</p>
            <p>{this.state.albumItem.length}首歌</p>
            <p className=" mt-5 ">
              {" "}
              {this.state.albumItem[0].AlbumIntro}
            </p>
          </div>
        </section>
        <section className="mt-12">
          {this.state.albumItem.map((item, idx) => (
            <div className="row hoverDiv border-bottom-secondery pb-5 heartDiv" idx={item.MusicID}>
              <div className="col-md-1 col-2 playIcon m-auto">
                <button type="button" className="btn " onClick={this.test}>
                  <img src="/images/icon/Vector.png" alt="play" />
                </button>
              </div>
              <div className="hoverContent col-md-10 col-8 row">
                <div className="col-md-1 col-2 m-auto">
                  <span className="m-auto fs-5">{idx + 1}</span>
                </div>
                <div className="col-md-10 col-8 m-auto">
                  <NavLink className="text-white fs-5" to={`/channel/${item.UserID}`}>
                    {item.MusicName}
                  </NavLink>
                </div>
                <div className="col-md-1 col-2 m-auto p-1">
                  <span className="fs-5">{item.MusicTime}</span>
                </div>
              </div>
              <div className="drop col-md-1 col-2">
                <div className="moreIcon">
                  <button type="button" className="btn dropbt">
                    <img
                      src="/images/icon/ellipsis-vertical-solid 1.png"
                      alt="more"
                    // className="iconSize m-1"
                    />
                  </button>
                  <div className="dropbox">
                    <button type="button" className="btn" onClick={() => { this.changeHeart(item.MusicID) }}>
                      <img src="/images/icon/heart.png" alt="" className="iconSize m-1 heartIcon" />
                      <img src="/images/icon/heart2.png" alt="" className="iconSize m-1 heartIcon2 d-none" />
                      收藏
                    </button>
                    <button type="button" className="btn">
                      {" "}
                      <img src="/images/icon/plus-solid 1.png" alt="add" className="iconSize m-1" />
                      儲存
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
        <div className="mt-20 text-center">
          <NavLink to={`/channel/${this.props.match.params.id}`} className="btn btn-xl btn-gradation">返回</NavLink>
        </div>
      </main>
    );
  }
  componentDidMount = async () => {
    // let result2 = await Axios.get(`http://localhost:9000/channel/Album/${this.props.match.params.id}`);
    // this.setState({ albumList: result2.data });

    let urlNum = this.props.match.url.slice(14, 15);
    var result = await Axios.get(
      `http://localhost:9000/channelMusic/${urlNum}/AlbumMusic/${this.props.match.params.id}`
    );
    this.setState({ albumItem: result.data });
  }
  test = () => {
    console.log(this.props.match.url.slice(14, 15))
  }
  changeHeart = (MusicID) => {
    let temp = document.querySelectorAll('.heartDiv');
    let icon = document.querySelectorAll('.heartIcon');
    let icon2 = document.querySelectorAll('.heartIcon2');

    console.log(MusicID);
    for (var i = 0; i < temp.length; i++) {
      if (parseInt(temp[i].attributes.idx.value) === MusicID) {
        console.log(MusicID, "ok");

        console.log(icon[i])
        console.log(icon2[i])
        if (icon[i].attributes.class.value.indexOf("d-none") > -1) {
          icon[i].classList.remove("d-none");
          icon2[i].classList.add("d-none")
        } else {
          icon[i].classList.add("d-none");
          icon2[i].classList.remove("d-none")
        }
      } else {
        console.log("NO")
      }

    }
  }
}

export default Album;