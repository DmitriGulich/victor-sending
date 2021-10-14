import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Payments from '../Components/profile/payments';

/**
 * 0. account information
 * 1. account status (financial)
 * 2. remaining email counts
 * 3. end date for premium
 * @returns Profile Component
 */

const Profile = () => {

    const [modalShow, setModalShow] = useState(false);
    const { user } = useSelector(state => state.auth);

    const payGuest = () => {
        setModalShow(true);
    }

    const upgrade = () => {
        setModalShow(true);
    }

    const payPremium = () => {
        setModalShow(true);
    }

    const renderFinancial = (user) => {
        switch (user.role) {
            case 'guest':
                return (
                    <>
                        <div className="mb-3">
                            <span>Remaining Free email: {user.freeCount}</span>
                        </div>
                        <div className="mb-3">
                            <span>Remaining email: {user.counter}</span>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary mr-3" onClick={() => payGuest()}>Pay for Email</button>
                            <button className="btn btn-success" onClick={() => upgrade()}>Upgrade to Premium</button>
                        </div>
                    </>
                )
            case 'premium':
                return (
                    <>
                        <div>
                            <span>Payment Ending Date: {user.endDate}</span>
                        </div>
                        <div>
                            <button onClick={() => payPremium()}>Pay For Premium</button>
                        </div>
                    </>
                )
            default:
                break;
        }
    }

    return ( 
        <div className="container">
            <h3>{user.username}, Profile</h3>
            <div className="mt-4">
                <div className="mb-3">
                    <span>User name: {user.username}</span>
                </div>
                <div className="mb-3">
                    <span>email: {user.email}</span>
                </div>
                <div className="mb-3">
                    <span>phone: {user.phone}</span>
                </div>
                <div className="mb-3">
                    <span>Role: {user.role}</span>
                </div>
            </div>
            <div className="userFinan">
                {renderFinancial(user)}
            </div>

            <Payments show={modalShow} onHide={() => setModalShow(false)} />
        </div>
     );
}
 
export default Profile;