import React, { Component } from "react";
import Axios from "axios";
import { NavLink } from "react-router-dom";
// import { NavLink } from "react-router-dom";


class ChannelBlog extends Component {
  state = {
    blogList: [{}]
  };
  render() {
    return (
      <div className="mb-20">
        {this.state.blogList.map((item, idx) => (
          <div className="blog d-flex row pb-10 border-bottom-secondery">
            <div className="blogImg pe-5 col-md-4 ">
              <NavLink to={`/channelBlog/${item.ChannelID}/blog/${item.BlogID}`} onClick={this.changePage}>
                <img src={item.BlogImage} alt="blog1" className="w-100 imgRadius" />
              </NavLink>
            </div>
            <div className="blogContent col-md-8 ">
              <div className="blogTitle">
                <NavLink to={`/channelBlog/${item.ChannelID}/blog/${item.BlogID}`} className="fs-3 linkHover"
                  onClick={this.changePage}>
                  <ins>{item.BlogTitle}</ins>
                </NavLink>
                <span>{item.BlogTime}</span>
              </div>
              <div className="blogText linkHover">
                <p className="text pt-12 fs-5">{item.BlogText}</p>
                <NavLink
                  to={`/channelBlog/${item.ChannelID}/blog/${item.BlogID}`}
                  class="blogLink fs-5 hvr-underline-from-center"
                  onClick={this.changePage}
                >
                  see more
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  componentDidMount = async () => {
    var result = await Axios.get(
      `http://localhost:9000/blog/${this.props.match.params.id}`
    );
    this.setState({ blogList: result.data });

  }
  changePage = async () => {
    setTimeout(() => {
      document.location.reload();
    }, 0)
  }
}

export default ChannelBlog;
