import React, { Component } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";

class SearchPage extends Component {
  state = {
    searchSinger: [{}]
  };
  render() {
    return (
      <div className="container py-20">
        <section className="py-20">
          {/* <div className="d-flex justify-content-between"> */}
          <div className="d-flex pb-15 border-bottom-secondery">
            <div className="d-flex">
              <h2 className="fs-2">搜尋結果 : </h2>
              <p className="fs-3 ms-3">{this.state.searchSinger[0].Singer}</p>
            </div>
            {/* <div>
              <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
            </div> */}
          </div>
          {this.state.searchSinger.map((item, idx) => (
            <div className="channel_songList row pt-8 pb-8 px-4  border-bottom-secondery heartDiv" idx={item.MusicID}>
              <div className="col-md-2 col-4 imgContainer">
                <div className="musicDiv">
                  <img src={item.MusicImage} alt="" className="imgContent musicImg" />
                </div>
                <div className="imgPalyIconSearch">
                  <button type="button" className="btn">
                    <img
                      src="/images/icon/play_circle_outline_white_48dp.svg"
                      alt="play"
                    />
                  </button>
                </div>
              </div>
              <div className="col-md-2 m-auto col-6">
                <NavLink className="hvr-underline-from-center-secondry fs-5" to={`/channel/${item.UserID}`}>
                  {item.MusicName}
                </NavLink>
              </div>
              <div className="col-md-2 m-auto  d-none d-md-block">
                <NavLink className="hvr-underline-from-center-secondry fs-5" to={`/channel/${item.UserID}`}>
                  {item.Singer}
                </NavLink>
              </div>
              <div className="col-md-3 m-auto d-none d-md-block">
                <NavLink className="hvr-underline-from-center-secondry fs-5" to={`/channel/${item.UserID}`}>
                  {item.Album}
                </NavLink>
              </div>
              <div className="col-md-1 m-auto d-none d-md-block">
                <span className="time fs-5">{item.MusicTime}</span>
              </div>
              <div className="col-md-1 m-auto col-1">
                <button type="button" className="btn hvr-bounce-in">
                  <img src="/images/icon/plus-solid 1.png" alt="like" />
                </button>
              </div>
              <div className="col-md-1 m-auto col-1">
                <button type="button" className="btn hvr-bounce-in" onClick={() => { this.changeHeart(item.MusicID) }}>
                  <img src="/images/icon/heart.png" alt="" className="heartIcon" />
                  <img src="/images/icon/heart2.png" alt="" className="heartIcon2 d-none" />
                </button>
              </div>
            </div>
          ))}
        </section>
        <div className="mt-20 text-center">
          <NavLink to="/" className="btn btn-xl btn-gradation">返回</NavLink>
        </div>
      </div>
    );
  }
  componentDidMount = async () => {
    let result = await Axios.get(`http://localhost:9000/search/singer/${this.props.match.params.id}`);
    this.setState({ searchSinger: result.data });
    console.log(this.state.searchSinger)

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

export default SearchPage;
