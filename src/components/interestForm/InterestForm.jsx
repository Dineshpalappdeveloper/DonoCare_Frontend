import React, { Component } from "react";
import styles from "../../styles/InterestForm.module.css";
// import TextField from "@material-ui/core/TextField";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import Router from "next/router";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Select from "@mui/material/Select";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "next/image";
import smlogo from "../../../public/logo.jpg";
import Head from "next/head";
// import {
//     GetpinCodeData,
//     UploadSellerData,
// } from "../../redux/actions/sellerInterestAction";
import { TextField } from "@mui/material";
class InterestForm extends Component {
    state = {
        showloader: false,
        showPopupMessage: false,
        message_heading: "",
        message_body: "",
        sellerName: null,
        sellerNature: "",
        ShowLoginErr: false,
        LoginErrMsg: "",
        persionName: null,
        persionContactNumber: null,
        persionWhatsappNumber: null,
        persionEmialId: null,
        persionAddress: null,
        user_pincode: null,
        persionCity: null,
        persionState: null,
        disablePincode: false,
        sellerName_error: "",
        sellerNature_error: "",
        persion_name_error: "",
        persion_contact_number_error: "",
        persion_whatsapp_number_error: "",
        user_pincode_error: "",
        persion_city_error: "",
        pincode_valid: true,
        persion_email_error: "",
        persion_state_error: "",
        check_whatsapp: false,
        main_Seo_data: {},
    };

    validateEmail(email) {
        const re =
            /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
    validateName = (name) => {
        if (!name) return true;
        const re = /^[a-zA-Z ]+(([',.-][a-zA-Z])?[a-zA-Z]*)*$/g;
        return re.test(name);
    };

    validateMobile = (mobile) => {
        if (!mobile) return true;
        if (mobile.length < 10) {
            return true;
        } else {
            const re =
                /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[0123456789]\d{9}|(\d[ -]?){10}\d$/g;
            return re.test(mobile);
        }
    };
    validatePincode = (pincode) => {
        if (!pincode) return true;
        const re = /^[0-9]/;
        return re.test(pincode);
    };
    handleClose = () => {
        this.setState({ ShowLoginErr: false });
    };
    handleClosePopup = () => {
        this.setState({ showPopupMessage: false });
        Router.push("/");
    };

    onHandleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        switch (name) {
            case "persionName":
                let persion_name = this.validateName(value);
                this.setState({
                    persion_name_error: persion_name ? "" : "Enter valid name",
                });
                break;
            case "persionContactNumber":
                let mobile = this.validateMobile(value);
                this.setState({
                    persion_contact_number_error: mobile ? "" : "Enter valid number",
                });
                break;
            case "persionWhatsappNumber":
                let whatsapp_no = this.validateMobile(value);
                this.setState({
                    persion_whatsapp_number_error: whatsapp_no
                        ? ""
                        : "Enter valid number",
                });

                break;
            case "address":
                if (value < 1) {
                    errors.address = "Enter  Address";
                } else {
                    errors.address = "";
                }
                break;
            case "landmark":
                break;

            case "user_pincode":
                let pincode = this.validatePincode(value);
                this.setState({
                    errormsg: "",
                    open_snackbar: false,
                });
                if (pincode) {
                    errors.pincode = "";
                    if (value < 1) {
                    } else {
                        errors.pincode = "";
                    }
                    if (value.length == 6) {
                        axios
                            .get(`${url}/pincode/pin_check/${e.target.value}/`)
                            .then((res) => {
                                if (res.data.length === 0) {
                                    errors.pincode = "pincode is wrong";
                                } else {
                                    this.setState({
                                        city: res.data[0].districtname,
                                        state: res.data[0].statename,
                                        pincodevalid: true,
                                    });

                                    errors.pincode = "";
                                }
                            })
                            .catch((err) => {
                                this.setState({ city: "", state: "", pincodevalid: false });
                            });
                    } else {
                        // errors.pincode = "pincode must be 6 digit"
                        this.setState({ city: "", state: "", pincodevalid: false });
                    }
                } else {
                    errors.pincode = "Enter valid pincode";
                }

                break;
            case "state":
                if (value < 1) {
                    // errors.state = "please enter state"
                } else {
                    errors.state = "";
                }
                break;
            case "city":
                break;
            default:
                break;
        }
        this.setState({ persion_email_error: "" });
        this.setState({
            [e.target.name]: e.target.value,
        });
    };
    check_same_no = () => {
        this.setState({ persion_whatsapp_number_error: "" });
        let checked = !this.state.check_whatsapp;
        if (checked) {
            this.setState({
                persionWhatsappNumber: this.state.persionContactNumber,
                check_whatsapp: true,
            });
        } else {
            this.setState({ persionWhatsappNumber: "", check_whatsapp: false });
        }
    };
    onHandlePineChange = (e) => {
        let pinecode = this.state.user_pincode;
        pinecode = e.target.value;
        this.setState({
            [e.target.name]: e.target.value,
        });
        this.setState({ persionCity: "", persionState: "", disablePincode: false });
        if (e.target.value.split("").length == "6") {
            let pincode = this.validatePincode(e.target.value);
            if (pincode) {
                this.setState({ user_pincode_error: "" });
            } else {
                this.setState({ user_pincode_error: "Enter valid PinCode" });
            }
            this.setState({ user_pincode: pinecode });
            // this.props
            //     .GetpinCodeData(pinecode)
            //     .then((res) => {
            //         if (this.props.seller_pineCode_data[0] !== "") {
            //             this.setState({
            //                 persionCity: this.props.seller_pineCode_data[0].districtname,
            //                 persionState: this.props.seller_pineCode_data[0].statename,
            //                 disablePincode: true,
            //             });
            //         }
            //     })
            //     .catch((err) => { });
        }
    };
    SubmitInterestForm = (e) => {
        e.preventDefault();
        if (this.state.sellerNature == "") {
            this.setState({
                ShowLoginErr: true,
                LoginErrMsg: "Please Select Nature of Business *",
            });
        } else {
            let persion_name = this.validateName(this.state.persionName);
            this.setState({
                persion_name_error: persion_name ? "" : "Enter valid name",
            });
            if (persion_name) {
                let mobile = this.validateMobile(this.state.persionContactNumber);
                this.setState({
                    persion_contact_number_error: mobile ? "" : "Enter valid number",
                });
                if (mobile) {
                    let whatsapp_no = this.validateMobile(
                        this.state.persionWhatsappNumber
                    );
                    this.setState({
                        persion_whatsapp_number_error: whatsapp_no
                            ? ""
                            : "Enter valid number",
                    });

                    if (whatsapp_no) {
                        if (this.state.persionContactNumber.length == 10) {
                            if (this.state.persionWhatsappNumber.length == 10) {
                                let email_id = this.validateEmail(this.state.persionEmialId);
                                this.setState({
                                    persion_email_error: email_id ? "" : "Enter valid Email Id",
                                });

                                if (email_id) {
                                    let pincode = this.validatePincode(this.state.user_pincode);
                                    this.setState({
                                        user_pincode_error: pincode ? "" : "Enter valid pincode",
                                    });

                                    if (pincode) {
                                        this.setState({ showloader: true });

                                        // this.props
                                        //     .UploadSellerData(
                                        //         this.state.sellerName,
                                        //         this.state.sellerNature,
                                        //         this.state.persionName,
                                        //         this.state.persionContactNumber,
                                        //         this.state.persionWhatsappNumber,
                                        //         this.state.persionEmialId,
                                        //         this.state.persionAddress,
                                        //         this.state.user_pincode,
                                        //         this.state.persionCity,
                                        //         this.state.persionState
                                        //     )
                                        //     .then((res) => {
                                        //         this.setState({
                                        //             showloader: false,
                                        //             showPopupMessage: true,
                                        //             message_heading:
                                        //                 "Thanks you for showing your interest",
                                        //             message_body:
                                        //                 "our team will get back to you within 48 Working Hours ",
                                        //         });
                                        //     })
                                        //     .catch((err) => {
                                        //         this.setState({
                                        //             showloader: false,
                                        //             ShowLoginErr: true,
                                        //             LoginErrMsg:
                                        //                 "Sometheing went wrong ! Please contact Mypustak support ",
                                        //         });
                                        //     });
                                    } else {
                                        this.setState({
                                            user_pincode_error: "Enter valid pincode",
                                        });
                                    }
                                } else {
                                    this.setState({
                                        persion_email_error: "Enter valid Email Id",
                                    });
                                }
                            } else {
                                // whatsapp err
                                this.setState({
                                    persion_whatsapp_number_error: "Enter valid 10 digit number",
                                });
                            }
                        } else {
                            // number error
                            this.setState({
                                persion_contact_number_error: "Enter valid 10 digit number",
                            });
                        }
                    } else {
                        this.setState({
                            persion_whatsapp_number_error: "Enter valid 10 digit number",
                        });
                    }
                } else {
                    this.setState({
                        persion_contact_number_error: "Enter valid 10 digit number",
                    });
                }
            } else {
                this.setState({ persion_name_error: "Enter valid name" });
            }
        }
    };

    render() {
        return (
            <>
                <div className={styles.FormParent}>
                    <div
                        className={styles.BrandlogoDiv}
                        style={{}}
                        onClick={() => {
                            Router.push("/");
                        }}
                    >
                        <div className={styles.brandimg} style={{}}>

                            <Image
                                alt="MyPustak.com"
                                src={smlogo}
                                onClick={() => {
                                    window.location = "/";
                                }}
                            />
                        </div>
                    </div>
                    <center>
                        <div className={styles.mainDiv}>
                            <br />
                            <Card style={{ borderRadius: "15px" }}>
                                <CardContent>
                                    <div className={styles.formhead}>
                                        MyPustak Seller Interest Form
                                    </div>
                                    <br />
                                    <center>
                                        {" "}
                                        <div className={styles.loginCon}>
                                            Already have a MyPustak Seller Account?
                                            <center>
                                                {" "}
                                                <Button
                                                    style={{
                                                        marginLeft: "5px",
                                                        maxWidth: "150px",
                                                        textTransform: "capitalize",
                                                        backgroundColor: "#2157ad",
                                                    }}
                                                    // color="primary"
                                                    variant="contained"
                                                    onClick={() => {
                                                        Router.push("/");
                                                    }}
                                                >
                                                    Login Now
                                                </Button>{" "}
                                            </center>
                                        </div>
                                    </center>
                                </CardContent>
                            </Card>

                            <br />
                            <br />
                            <form
                                onSubmit={this.SubmitInterestForm}
                                className={styles.formParentdiv}
                            >
                                <Card style={{ borderRadius: "15px" }}>
                                    <CardContent>
                                        <br />

                                        <h5 style={{ textAlign: "center", color: "#2A2F5B" }}>
                                            Your information will be kept strictly confidential.
                                        </h5>
                                        <br />

                                        <div
                                            className={styles.formHeading}
                                            style={{ borderRadius: "15px" }}
                                        >
                                            MyPustak Seller interest form should be submitted by an
                                            authorized person
                                        </div>
                                        <br />
                                        <br />
                                        <div>
                                            <Grid container spacing={2}>
                                                <Grid item sm={5} xs={12}>
                                                    <h6 style={{ textAlign: "start" }}>
                                                        {" "}
                                                        Seller Legal Entity Name *
                                                    </h6>
                                                </Grid>
                                                <Grid item sm={7} xs={12}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        variant="outlined"
                                                        multiline
                                                        error={this.state.sellerName_error ? true : false}
                                                        helperText={this.state.sellerName_error}
                                                        name="sellerName"
                                                        value={this.state.sellerName}
                                                        onChange={this.onHandleChange}
                                                        fullWidth
                                                        placeholder="Enter Legal Entity Name"
                                                        required
                                                        size="small"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Grid container spacing={2}>
                                                <Grid item sm={5} xs={12}>
                                                    <h6 style={{ textAlign: "start" }}>
                                                        {" "}
                                                        Nature of Business *
                                                    </h6>
                                                </Grid>
                                                <Grid item sm={7} xs={12}>
                                                    <FormControl fullWidth>
                                                        <Select
                                                            labelId="demo-simple-select-label"
                                                            id="demo-simple-select"
                                                            value={this.state.sellerNature}
                                                            name="sellerNature"
                                                            onChange={this.onHandleChange}
                                                        >
                                                            <MenuItem value="Publishers">Publishers</MenuItem>
                                                            <MenuItem value="Book Distributor">
                                                                Book Distributor
                                                            </MenuItem>
                                                            <MenuItem value="Online Books Store">
                                                                Online Books Store
                                                            </MenuItem>
                                                            <MenuItem value="Offline Books Store">
                                                                Offline Books Store
                                                            </MenuItem>
                                                            <MenuItem value="Others">Others</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <h4
                                                style={{
                                                    textAlign: "start",
                                                    alignSelf: "start",
                                                    fontSize: "1.2",
                                                }}
                                            >
                                                {" "}
                                                Contact Details
                                            </h4>
                                            <br />
                                            <Grid container spacing={2}>
                                                <Grid item sm={4} xs={12}>
                                                    <h6 style={{ textAlign: "start" }}>Contact Name *</h6>
                                                </Grid>
                                                <Grid item sm={8} xs={12}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        variant="outlined"
                                                        multiline
                                                        fullWidth
                                                        error={this.state.persion_name_error ? true : false}
                                                        helperText={this.state.persion_name_error}
                                                        name="persionName"
                                                        value={this.state.persionName}
                                                        onChange={this.onHandleChange}
                                                        placeholder="Person Contact name"
                                                        required
                                                        size="small"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Grid container spacing={2}>
                                                <Grid item sm={4} xs={12}>
                                                    <h6 style={{ textAlign: "start" }}>
                                                        Contact Number *
                                                    </h6>
                                                </Grid>
                                                <Grid item sm={8} xs={12}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        variant="outlined"
                                                        multiline
                                                        fullWidth
                                                        error={
                                                            this.state.persion_contact_number_error
                                                                ? true
                                                                : false
                                                        }
                                                        helperText={this.state.persion_contact_number_error}
                                                        name="persionContactNumber"
                                                        value={this.state.persionContactNumber}
                                                        onChange={this.onHandleChange}
                                                        placeholder="Person Contact number"
                                                        required
                                                        size="small"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Grid container spacing={2}>
                                                <Grid item sm={4} xs={12}>
                                                    <h6 style={{ textAlign: "start" }}>
                                                        WhatsApp Number *
                                                    </h6>
                                                </Grid>
                                                <Grid item sm={8} xs={12}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        variant="outlined"
                                                        multiline
                                                        fullWidth
                                                        error={
                                                            this.state.persion_whatsapp_number_error
                                                                ? true
                                                                : false
                                                        }
                                                        helperText={
                                                            this.state.persion_whatsapp_number_error
                                                        }
                                                        name="persionWhatsappNumber"
                                                        value={this.state.persionWhatsappNumber}
                                                        onChange={this.onHandleChange}
                                                        placeholder="Person WhatsApp Number"
                                                        required
                                                        size="small"
                                                    />
                                                </Grid>
                                            </Grid>
                                            {/* <br /> */}
                                            <Grid container spacing={2}>
                                                <Grid item sm={4}></Grid>
                                                <Grid item sm={8} xs={12}>
                                                    <div className={styles.checkboxParentDiv}>
                                                        <input
                                                            className="form-check-input"
                                                            checked={
                                                                this.state.check_whatsapp &&
                                                                this.state.persionWhatsappNumber ===
                                                                this.state.persionContactNumber
                                                            }
                                                            onClick={this.check_same_no}
                                                            type="checkbox"
                                                            value=""
                                                            id="flexCheckDefault5"
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor="flexCheckDefault5"
                                                            style={{ fontSize: "0.8rem", marginLeft: "8px" }}
                                                        >
                                                            same as mobile number
                                                        </label>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Grid container spacing={2}>
                                                <Grid item sm={4} xs={12}>
                                                    <h6 style={{ textAlign: "start" }}>Email Id *</h6>
                                                </Grid>
                                                <Grid item sm={8} xs={12}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        variant="outlined"
                                                        multiline
                                                        error={
                                                            this.state.persion_email_error ? true : false
                                                        }
                                                        helperText={this.state.persion_email_error}
                                                        name="persionEmialId"
                                                        value={this.state.persionEmialId}
                                                        onChange={this.onHandleChange}
                                                        fullWidth
                                                        placeholder="Email id for Correspondence"
                                                        required
                                                        size="small"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <br />
                                            <h4
                                                style={{
                                                    textAlign: "start",
                                                    alignSelf: "start",
                                                    fontSize: "1.2rem",
                                                }}
                                            >
                                                Business Address :
                                            </h4>
                                            <br />
                                            <Grid container spacing={2}>
                                                <Grid item sm={4} xs={12}>
                                                    <h6 style={{ textAlign: "start" }}>Address *</h6>
                                                </Grid>
                                                <Grid item sm={8} xs={12}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        variant="outlined"
                                                        multiline
                                                        fullWidth
                                                        name="persionAddress"
                                                        value={this.state.persionAddress}
                                                        onChange={this.onHandleChange}
                                                        rows={3}
                                                        placeholder="Complete Address "
                                                        required
                                                        size="small"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Grid container spacing={2}>
                                                <Grid item sm={4} xs={12}>
                                                    <h6 style={{ textAlign: "start" }}>Pincode *</h6>
                                                </Grid>
                                                <Grid item sm={8} xs={12}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        variant="outlined"
                                                        fullWidth
                                                        error={this.state.user_pincode_error ? true : false}
                                                        helperText={this.state.user_pincode_error}
                                                        name="user_pincode"
                                                        value={this.state.user_pincode}
                                                        onChange={this.onHandlePineChange}
                                                        maxLength={6}
                                                        inputProps={{ inputMode: "numeric" }}
                                                        placeholder="Pincode "
                                                        required
                                                        size="small"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Grid container spacing={2}>
                                                <Grid item sm={4} xs={12}>
                                                    <h6 style={{ textAlign: "start" }}>City *</h6>
                                                </Grid>
                                                <Grid item sm={8} xs={12}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        variant="outlined"
                                                        multiline
                                                        fullWidth
                                                        name="persionCity"
                                                        disabled={this.state.disablePincode ? true : false}
                                                        value={this.state.persionCity}
                                                        onChange={this.onHandleChange}
                                                        placeholder="City "
                                                        required
                                                        size="small"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Grid container spacing={2}>
                                                <Grid item sm={4} xs={12}>
                                                    <h6 style={{ textAlign: "start" }}>State *</h6>
                                                </Grid>
                                                <Grid item sm={8} xs={12}>
                                                    <TextField
                                                        id="outlined-basic"
                                                        variant="outlined"
                                                        multiline
                                                        fullWidth
                                                        disabled={this.state.disablePincode ? true : false}
                                                        name="persionState"
                                                        value={this.state.persionState}
                                                        onChange={this.onHandleChange}
                                                        placeholder="State "
                                                        required
                                                        size="small"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <br />
                                            <Button
                                                className={styles.submitFormButton}
                                                color="primary"
                                                variant="contained"
                                                type="submit"
                                                sx={{
                                                    minWidth: "15rem",
                                                    textTransform: "capitalize",
                                                    backgroundColor: "#2157ad",
                                                }}
                                            >
                                                {this.state.showloader ? (
                                                    <CircularProgress
                                                        size={25}
                                                        style={{ color: "white" }}
                                                    />
                                                ) : (
                                                    "Submit Interest Form"
                                                )}
                                            </Button>{" "}
                                            <br />
                                        </div>
                                    </CardContent>
                                    <div></div>
                                </Card>
                            </form>
                        </div>
                    </center>
                    <div>
                        {/* Thanks you popup  */}
                        <Dialog
                            open={this.state.showPopupMessage}
                            keepMounted
                            onClose={this.state.showPopupMessage}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <center>
                                <DialogTitle>{this.state.message_heading}</DialogTitle>
                            </center>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    {this.state.message_body}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClosePopup}>Ok</Button>
                            </DialogActions>
                        </Dialog>

                        <Snackbar
                            anchorOrigin={{ vertical: "top", horizontal: "center" }}
                            style={{ zIndex: "50001" }}
                            open={this.state.ShowLoginErr}
                            onClose={this.handleClose}
                            message={`${this.state.LoginErrMsg}`}
                            autoHideDuration={3000}
                        />
                    </div>
                    <div>
                        <br />
                        <br />
                        <br />
                    </div>
                </div>

            </>
        );
    }
}

const mapStateToProps = (state) => ({
    seller_pineCode_data: state.sellerInterestReducer.seller_pineCode_data,
});

export default connect(mapStateToProps, {
    GetpinCodeData,
    UploadSellerData,
})(InterestForm);
