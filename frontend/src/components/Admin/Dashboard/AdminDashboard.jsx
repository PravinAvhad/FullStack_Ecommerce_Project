import React, { useEffect } from 'react'
import Aside from "../AsideBar/Aside.jsx"
import "./admindashboard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faIndianRupeeSign, faUsers } from '@fortawesome/free-solid-svg-icons'
import { faProductHunt } from "@fortawesome/free-brands-svg-icons"
import { Link } from 'react-router-dom'
import { Doughnut, Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from "chart.js";
import { useDispatch, useSelector } from 'react-redux'
import { admingetItems } from '../../../Actions/itemAction.js'
import { admingetallOrders } from '../../../Actions/OrderAction.js'
import Loader from "../../Layout/Loader/Loader.jsx";
import MetaData from "../../Layout/MetaData.jsx";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const { adminItems, loading, error } = useSelector((state) => state.AdminItems);
  const { adminOrders, error: admingetError, loading: admingetloading } = useSelector((state) => state.AdminGetOrders);
  const dispatch = useDispatch();
  let outOfStock = 0;
  adminItems && adminItems.forEach((item) => {
    if (item.stock === 0) {
      outOfStock += 1;
    }
  })
  useEffect(() => {
    if (error) {
      alert(error);
      console.log(error);
    }
    if (admingetError) {
      alert(admingetError);
      console.log(admingetError);
    }
    dispatch(admingetItems());
    dispatch(admingetallOrders());
  }, [dispatch, error, admingetError])
  const linestate = {
    labels: ["Initial Amount", "Earned Amount"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: "rgb(135,206,235)",
        hoverBackgroundColor: "rgb(255,75,43)",
        data: [0, 100000],
      }
    ],
  }
  const doughnutdata = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["rgb(135,206,235)", "rgb(128,128,128)"],
        hoverBackgroundColor: ["rgb(255,75,43)", "rgb(34, 139, 34)"],
        data: [outOfStock, adminItems.length - outOfStock],
      }
    ],
  }
  return (
    <>
      {
        loading || admingetloading ? (<Loader/>) : (
          <div className="admindashboard">
            <MetaData title="Ecommerce : Admin Dashboard"/>
            <Aside />
            <div className="dashboard">
              <h2>Dashboard</h2>
              <div className="sub1">
                <div className="detailbox">
                  <FontAwesomeIcon icon={faIndianRupeeSign} className='logo' />
                  <div>
                    <h4>Total Sales</h4>
                    <h3>Rs. 10,00,000</h3>
                  </div>
                </div>
                <Link to="/admin/orders" className="detailbox">
                  <FontAwesomeIcon icon={faCartShopping} className='logo' />
                  <div>
                    <h4>Total Orders</h4>
                    <h3>{adminOrders && adminOrders.orders && adminOrders.orders.length}</h3>
                  </div>
                </Link>
                <Link to="/admin/allproducts" className="detailbox">
                  <FontAwesomeIcon icon={faProductHunt} className='logo' />
                  <div>
                    <h4>Total Products</h4>
                    <h3>{adminItems.length}</h3>
                  </div>
                </Link>
                <Link to="/admin/allusers" className="detailbox">
                  <FontAwesomeIcon icon={faUsers} className='logo' />
                  <div>
                    <h4>Total Users</h4>
                    <h3>100</h3>
                  </div>
                </Link>
              </div>
              <div className="subsection">
                <div className="sub2">
                  <h3>Sales Statistics</h3>
                  <Line data={linestate} className='graph' />
                </div>
                <div className="sub3">
                  <h3>Products</h3>
                  <Doughnut data={doughnutdata} className='piechart' />
                </div>
              </div>
            </div>
          </div>
        )}</>
  )
}

export default AdminDashboard