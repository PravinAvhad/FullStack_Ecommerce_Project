import React from 'react'
import "./shipping.css";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Country, State } from 'country-state-city';

const Deliverydetails = ({setDeliverydet,deliverydet,ShippingInfoSave,shippingInfo,DataChange}) => {
    return (
        <div className="shipinfo">
            <div className="shipinfoheading">
                <div className="shipinfoheadingsub">
                    <h3>1</h3>
                    <h3>DELIVERY DETAILS</h3>
                </div>
                {deliverydet ? (
                    <FontAwesomeIcon icon={faChevronUp} />) : (
                    <FontAwesomeIcon icon={faChevronDown} />
                )}
            </div>
            {deliverydet && (
                <div className="shipinfocontainer" id="delivery">
                    <form onSubmit={ShippingInfoSave}>
                        <input type="text"
                            name='address'
                            required
                            placeholder="Address"
                            value={shippingInfo.address}
                            onChange={DataChange}
                        />
                        <input type="text"
                            name='city'
                            required
                            placeholder="City"
                            value={shippingInfo.city}
                            onChange={DataChange}
                        />
                        <input type="text"
                            name='pincode'
                            required
                            placeholder="Pincode"
                            value={shippingInfo.pincode}
                            onChange={DataChange}
                        />
                        <input type="text"
                            name='mobileno'
                            required
                            placeholder="Mobile Number"
                            value={shippingInfo.mobileno}
                            onChange={DataChange}
                        />
                        <select
                            name="Country"
                            id=""
                            required
                            value={shippingInfo.Country}
                            onChange={DataChange}
                        >
                            <option value="">Country</option>
                            {Country && Country.getAllCountries().map((item) => (
                                <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                            ))}
                        </select>
                        {shippingInfo.Country && (
                            <select
                                name="state"
                                id=""
                                required
                                value={shippingInfo.state}
                                onChange={DataChange}
                            >
                                <option value="">State</option>                               
                                {State && State.getStatesOfCountry(shippingInfo.Country).map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                ))}
                            </select>
                        )}
                        <input type="submit" className='button' value="Save and Deliver Here" />
                    </form>
                </div>
            )}
        </div>
    )
}

export default Deliverydetails