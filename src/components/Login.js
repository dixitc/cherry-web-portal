
    import React , {Component , PropTypes} from 'react';
    import { connect } from 'react-redux';
    import {registerRequest ,registerUser, setErrorMessage } from '../actions/actions';
    import cc from '../constants/country-codes';
    import TextField from 'material-ui/lib/text-field';
    import RaisedButton from 'material-ui/lib/raised-button';
    import CircularProgress from 'material-ui/lib/circular-progress';
    import SelectFieldExampleSimple from './SelectCountry';
    import AutoCompleteCountry from './AutoCompleteCountry';
    import IntlTelInput from 'react-intl-tel-input';
    import PNF from 'google-libphonenumber/dist/browser/libphonenumber';
    import Paper from 'material-ui/lib/paper';

    import style from '../styles/Login';
    //import ReactPhoneInput from 'react-phone-input';

    let AsYouTypeFormatter = require('google-libphonenumber').AsYouTypeFormatter;
    let formatter = new AsYouTypeFormatter('IN');


    /*NOTES :
        -consider showing country flags
        -separate out text field into phonetext field

    ISSUES :
        [-] mobile number label color on error [FIXED]

    */



    class LoginComponent extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    dial_code: '+91',
                    countryCode: 87,
                    formattedNumber: '9620418303'

                };

                this.handleChange = this.handleChange.bind(this)
                this.setDialCode = this.setDialCode.bind(this)
            }
            formatNumber(number) {
                formatter.clear();
                let stringNumber = number.toString();
                for (var i = 0; i < stringNumber.length; i++) {
                    formatter.inputDigit(stringNumber[i]);
                }
                return this.state.dial_code + ' ' + formatter.currentOutput_;

            }
            handleChange(e) {
                //remove any previous error messages asuser is making changes to input
                this.props.handleSetErrorMessage('');
                switch (true) {
    				//ALLOW ONLY NUMBER INPUT
                    case (e.keyCode >= 48 && e.keyCode <= 57):
                        let updatedFormattedNumber;

                        updatedFormattedNumber = this.state.formattedNumber + (String.fromCharCode(e.keyCode)).toString();
                        this.setState({
                            formattedNumber: updatedFormattedNumber
                        });

                        break;
    				//HANDLE ON PRESS ENTER
                    case (e.keyCode == 13):
                        this.props.handleRegisterUser(this.state.formattedNumber);
                        break;
    				//HANDLE ON PRESS BACKSPACE
                    case (e.keyCode == 8):
                    /*    console.log(e.nativeEvent.target.selectionStart-4);
                        console.log(e.nativeEvent.target.selectionEnd-4);
                        console.log(this.state.formattedNumber.substr(0, e.nativeEvent.target.selectionStart - 5));
                        console.log(this.state.formattedNumber.substr( e.nativeEvent.target.selectionEnd -4,this.state.formattedNumber.length)); */
                        let newNumber = this.state.formattedNumber.substr(0, this.state.formattedNumber.length - 1);
                        console.log(newNumber);
                        this.setState({
                            formattedNumber: ''
                        })

                        break;
                    default:

                        break;
                }

            }
            setDialCode(event, index, value) {

                this.setState({
                    countryCode: index
                })
                this.setState({
                        dial_code: cc[index].dial_code
                    })
                formatter.clear();
                formatter = new AsYouTypeFormatter((cc[index].code).toString());
            }
    	render(){
            let conditionalComponent;
            if(isRegistered){
                console.log('RENDER OTP COMPONENT');
                 conditionalComponent = <p>otp login</p>;

            }else{
                console.log('RENDER PHONE COMPONENT');
                 conditionalComponent = <p>phone login</p>;

            }
    		const  {isRegistered , isFetching , handleRegisterUser , handleVerifyUser, handleSetErrorMessage , errorMessage , verificationId  } = this.props;
    		return (
                    <div style={style.Login}>

                    {/*<AutoCompleteCountry value={4} />*/}
                    {/*	<ReactPhoneInput defaultCountry={'us'} /> */}


                    <Paper style={style.paper} zDepth={1}>
                    <div >
                        {!isRegistered &&
                            <div>
                            <div style={style.wrapperDiv}>

                                <div style={style.inlineDiv}>

                                    <SelectFieldExampleSimple countryValue={this.state.countryCode}  setCountry={this.setDialCode}/>
                                </div>
                                <div  style={style.inlineDiv}>
                                    <TextField hintText={this.state.formattedNumber.length ? 'Enter your mobile number' : ''}
                                        style={style.textField}
                                        errorText={errorMessage}
                                        value={this.formatNumber(this.state.formattedNumber)}
                                        onKeyDown={this.handleChange}
                                        onSelect={this.checkForTab}
                                        errorStyle={style.errorStyle}
                                        underlineFocusStyle={style.cherry}
                                        floatingLabelStyle={(errorMessage) ? style.cherry : style.red}
                                        floatingLabelText="Mobile Number"
                                        id="phoneText"
                                        />
                                </div>
                            </div>

                            <div>

                                {isFetching &&

                                    <CircularProgress size={0.8}/>
                                }
                                {!isFetching &&

                                    <RaisedButton style={style.button} labelColor="white" disabled={false} primary={true} label={isRegistered ? 'VERIFY' : 'REGISTER'} onClick={() => handleRegisterUser(this.state.formattedNumber)}/>
                                }
                            </div>
                        </div>
                        }

                        {isRegistered &&
                            <div>
                            <div style={style.wrapperDiv}>


                                <div  style={style.inlineDiv}>
                                    <TextField hintText={this.state.formattedNumber.length ? 'Enter the OTP' : ''}
                                        style={style.textField}


                                        onKeyDown={this.handleChange}
                                        onSelect={this.checkForTab}

                                        underlineFocusStyle={style.cherry}
                                        floatingLabelStyle={(errorMessage) ? style.cherry : style.red}
                                        floatingLabelText="OTP"
                                        id="otpText"
                                        />
                                </div>
                            </div>
                            <div>

                                {isFetching &&

                                    <CircularProgress size={0.8}/>
                                }
                                {!isFetching &&

                                    <RaisedButton style={style.button} labelColor="white" disabled={false} primary={true} label={isRegistered ? 'VERIFY' : 'REGISTER'} onClick={() => handleVerifyUser(verificationId ,'234')}/>
                                }
                            </div>
                        </div>
                        }

                    </div>
                </Paper>

                </div>
    			)
    		}
    }

    LoginComponent.propTypes = {
        handleRegisterUser: PropTypes.func.isRequired,
        handleVerifyUser: PropTypes.func.isRequired,
        handleSetErrorMessage: PropTypes.func.isRequired,
    	isRegistered: PropTypes.bool.isRequired,
        isFetching: PropTypes.bool.isRequired,
    	errorMessage: PropTypes.string
    }


    const mapStateToProps = (state) => {
    	const { auth } = state;
    	const{ isRegistered , errorMessage , isFetching , verificationId } = auth;

    	return {
    		isRegistered,
    		errorMessage,
    		isFetching,
            verificationId

    	}
    }

    const mapDispatchToProps = (dispatch) => {
    	return {
    		handleRegisterUser: (formattedNumber) => {
    			let creds = {
    				identifier :formattedNumber,
    				identifierType : 'PHONE',
    				verificationMode : 'OTP_MSG'

    			}
    			dispatch(registerUser(creds))
    			//dispatch(registerRequest(auth));
    		},
    		handleVerifyUser : (id,otp) => {
    			dispatch(verifyUser(id,otp))
    		},
    		handleSetErrorMessage : (msg) => {
    			dispatch(setErrorMessage(msg))
    		}
    	}
    }


    const Login = connect(
    	mapStateToProps,
    	mapDispatchToProps
    )(LoginComponent)

    export default Login;
