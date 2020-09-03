import React from 'react';

export const BookingIndexListItem = ({ booking, currentUserRole }) => {
    let postIdType = null;
    let feeAndTransportationInfo = null;
    let travelDate = null;
    if (currentUserRole === "shipper" && booking["carrierPostId"]){
        postIdType = "carrierPostId";
        travelDate = new Date(booking[postIdType].travelDate);
        feeAndTransportationInfo = () => {
            return (
                <>
                    <div>
                        Fee: {booking[postIdType].fee}
                    </div>
                    <div>
                        Transportation: {booking[postIdType].transportation}
                    </div>
                    <div>
                        Travel Date: {travelDate.toJSON().slice(0, 10)}
                    </div>
                </>
            )
        }
    } else {
        postIdType = "shipperPostId";
        feeAndTransportationInfo = () => {
            return <></>;
        }
    }

    return(
        <div className="carrier-post-list-item-container">
            <div>
                <div>
                    <span>
                        Phone number: {booking.phone}
                    </span>
                </div>
                <div>
                    Parcel Contents: {booking.parcelContents}
                </div>
                <div>
                    Destination: {booking[postIdType].destination}
                </div>
                <div>
                    Origin: {booking[postIdType].origin}
                </div>
                <div>
                    Maximum Weight: {booking[postIdType].maxWeight} lb
                </div>
                {feeAndTransportationInfo()}
            </div>
        </div>
    );
}