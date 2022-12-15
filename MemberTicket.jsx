import React, { Component } from 'react';
import Axios from 'axios';

class MemberTicket extends Component {
  state = {
    myTicketList: [{}]
  }
  render() {
    return (
      <div>
        <h2 class="fs-2 fw-bold mb-md-10">我的票券</h2>
        <div className="w-90">
          <img className="rounded-16" src={this.state.myTicketList[0].myTicketImage} alt="票劵圖片" />
          <ul className="bg-white-opacity-5 p-4 mt-8">
            <li className="fs-5">演出時間：{this.state.myTicketList[0].TicketDate}</li>
            <li className="border-bottom border-2 border-dark my-2"></li>
            <li className="fs-5">演出地點：{this.state.myTicketList[0].TicketLocation}</li>
            <li className="border-bottom border-2 border-dark my-2"></li>
            <li className="fs-5">票區位置：{this.state.myTicketList[0].TicketSeat}</li>
            <li className="border-bottom border-2 border-dark my-2"></li>
            <li className="fs-5">購票數量：{this.state.myTicketList[0].myTicketCount} 張</li>
            <li className="border-bottom border-2 border-dark my-2"></li>
            <li className="fs-5">購票金額：{this.state.myTicketList[0].myTicketTotal} 元</li>
          </ul>
        </div>
      </div>
    );
  }
  componentDidMount = async () => {
    let result = await Axios.get(`http://localhost:9000/MyTicketData/${this.props.match.params.id}`);
    this.setState({myTicketList: result.data});

  }
}

export default MemberTicket;