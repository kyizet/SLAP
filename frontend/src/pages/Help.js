import React, { useState, useEffect } from "react";
import {
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBContainer,
    MDBCollapse,
} from "mdbreact";
import { CircleToBlockLoading } from "react-loadingg";

const Help = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [helpers, setHelpers] = useState([])

    useEffect(() => {
        setIsLoading(true);
        fetchHelpers();
        setIsLoading(false);
    }, [])


    const fetchHelpers = () => {
        const url = 'http://localhost:8000/backend/helpers/'
        fetch(url, {
            method: 'GET'
        }).then(res => res.json())
            .then(data => setHelpers(data))
    }

    return (
        <div> <div className="">
            <MDBContainer>
                <MDBRow className="py-5"></MDBRow>

                <MDBRow>
                    <MDBCol>
                        <MDBCard
                            className="pl-5 pr-5 py-5 scrollbar" style={{ minHeight: "55vh" }}
                        >
                            {isLoading ? <CircleToBlockLoading color="#ff8282" /> : ""}
                            <MDBCardBody className="px-5 scrollbar" style={{ overflowY: 'scroll' }}>
                                {helpers.map((item, index) => (
                                    <div key={index}>
                                        <MDBRow className="border-bottom border-dark">
                                            <MDBRow  className="button"><h4><strong>{item.helper_title}</strong></h4></MDBRow>
                                            <MDBCollapse isOpen={true}><MDBRow><p>{item.helper_description}</p></MDBRow></MDBCollapse>
                                        </MDBRow>
                                        <br /></div>
                                ))}

                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBRow className="py-5"></MDBRow>
            </MDBContainer>
        </div> </div >
    )
}

export default Help;