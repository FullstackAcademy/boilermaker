import React from 'react';
import { connect } from 'react-redux';
import {getOrderHistory} from '../store'
import Card from 'react-bootstrap/Card'

// class OrderHistory extends React.Component{
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     this.props.getOrderHistory()
//   }

//   render() {
//     const orders = this.props.OrderHistory
//     return (
//       <div id="history">
//         {orders.map((singleOrder) => (
//           <div key>
//             <br />
//             {singleOrder.map((item) => (
//               <div key={item.pizza.id}>
//                 <div className="order_history">
//                   <img
//                     id="history_img"
//                     src={item.pizza.imageUrl}
//                   />
//                   <p>
//                     {item.pizza.name} x {item.quantity} ={' '}
//                     {item.subTotal}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     orderHistory: state.orderHistory
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     getOrderHistory: () => dispatch(getOrderHistory())
//   }
// }

// export default connect(mapStateToProps, mapDispatch)(OrderHistory)
