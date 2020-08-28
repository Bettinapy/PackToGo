import React from 'react';

export const BookingIndexListItem = (props) => {
    return(
        <div className="carrier-post-list-item-container">
            <div>
                <div className="carrier-post-list-item-left">
                    <span>
                        Phone number: {props.booking.phone}
                    </span>
                </div>
                <div className="carrier-post-list-item-left">
                    Parcel Contents: {props.booking.parcelContents}
                </div>
            </div>
            <div className="carrier-post-list-item-right">
                <div>
                    Confirmation Code: {props.booking.carrierPostId}
                </div>
            </div>
        </div>
    );
}