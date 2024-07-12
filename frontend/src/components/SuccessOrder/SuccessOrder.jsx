import React from 'react'
import "./successOrder.css"
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import MetaData from '../Layout/MetaData'

const SuccessOrder = () => {
    const navigate = useNavigate();

    return (
        <div className="successOrder">
            <MetaData title="Ecommerce Order Success"/>
            <div className="successcontainer">
                <FontAwesomeIcon icon={faCircleCheck} className='icon'/>
                <h3>Your Order has been Placed Successfully.</h3>
                <button type="button" onClick={() => navigate("/myorders")}>View Orders</button>
            </div>
        </div>
    )
}

export default SuccessOrder