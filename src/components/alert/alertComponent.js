import React, {useState} from "react";
import Alert from 'react-bootstrap/Alert'


const AlertComponent = ({time, message, onAlert}) => {

    setTimeout(() => {
        onAlert();
    },time);

    return (
        <>
            {
                message ?
                    <Alert variant="danger">
                        <Alert.Heading>Error!</Alert.Heading>
                        <p>
                            {message}
                        </p>
                    </Alert>
                    : null
            }
        </>
    )
};

export default AlertComponent;