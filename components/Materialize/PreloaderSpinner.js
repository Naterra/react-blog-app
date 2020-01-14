import React from "react";

const PreloaderSpinner = (props) => {
    const {extraStyles} = props;
    const cStyles =extraStyles||{};
    return (
        <div className="preloader-wrapper active" style={cStyles}>
            <div className="spinner-layer spinner-blue-only">
                <div className="circle-clipper left">
                    <div className="circle" />
                </div>
                <div className="gap-patch">
                    <div className="circle" />
                </div>
                <div className="circle-clipper right">
                    <div className="circle" />
                </div>
            </div>
        </div>
    );
};
export default PreloaderSpinner;