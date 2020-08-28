import React from 'react';

export const BookingIndexListItem = (props) => {
    return(
        <div className="carrier-post-list-item-container">
            <div>
                <div className="carrier-post-list-item-left">
                    <span>
                        Phone number: {props.phone}
                    </span>
                </div>
                <div className="carrier-post-list-item-left">
                    Parcel Contents: {props.parcelContents}
                </div>
            </div>
            <div className="carrier-post-list-item-right">
                <div>
                    Confirmation Code: {props.carrierPostId}
                </div>
            </div>
        </div>
    );
}