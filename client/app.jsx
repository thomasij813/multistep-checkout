class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            userInfo: {
                userId: '',
                name: '',
                email: '',
                password: '',
                addressId: '',
                streetAddress1: '',
                streetAddress2: '',
                city: '',
                state: '',
                zipcode: '',
                paymentInfoId: '',
                creditCardNum: '',
                expDate: '',
                cvv: '',
                billingZipcode: ''
            }
        }

        this.resetForm = this.resetForm.bind(this);
        this.updateField = this.updateField.bind(this);
        this.advanceStep = this.advanceStep.bind(this);
        this.decreaseStep = this.decreaseStep.bind(this);
        this.postUser = this.postUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.postAddress = this.postAddress.bind(this);
        this.updateAddress = this.updateAddress.bind(this);
        this.postPaymentInfo = this.postPaymentInfo.bind(this);
        this.updatePaymentInfo = this.updatePaymentInfo.bind(this);
    }

    resetForm() {
        this.setState({
            step: 1,
            userInfo: {
                userId: '',
                name: '',
                email: '',
                password: '',
                addressId: '',
                streetAddress1: '',
                streetAddress2: '',
                city: '',
                state: '',
                zipcode: '',
                paymentInfoId: '',
                creditCardNum: '',
                expDate: '',
                cvv: '',
                billingZipcode: ''
            }
        })
    }

    updateField(field, update) {
        let newObj = {};
        newObj[field] = update;
        let userInfo = Object.assign({}, this.state.userInfo, newObj);
        this.setState({ userInfo });
    }

    advanceStep() {
        this.setState({
            step: this.state.step + 1
        });
    }

    decreaseStep() {
        this.setState({
            step: this.state.step - 1
        });
    }

    postUser() {
        fetch('/user', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.userInfo.name,
                email: this.state.userInfo.email,
                password: this.state.userInfo.password
            })
        })
        .then(res => res.json())
        .then(user => {
            let userInfo = Object.assign(this.state.userInfo, {
                userId: user.id
            })
            this.setState({ userInfo });
        }).catch(err => console.error(err));
    }

    updateUser() {
        fetch('/user', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                userId: this.state.userInfo.userId,
                name: this.state.userInfo.name,
                email: this.state.userInfo.email,
                password: this.state.userInfo.password
            })
        })
        .then(res => res.json())
        .then(d => console.log(d))
        .catch(err => console.error(err));
    }

    postAddress() {
        fetch('/address', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                streetAddress1: this.state.userInfo.streetAddress1,
                streetAddress2: this.state.userInfo.streetAddress2,
                city: this.state.userInfo.city,
                state: this.state.userInfo.state,
                zipcode: this.state.userInfo.zipcode,
                userId: this.state.userInfo.userId
            })
        })
        .then(res => res.json())
        .then(address => {
            let userInfo = Object.assign(this.state.userInfo, {
                addressId: address.id
            })
            this.setState({ userInfo });
        }).catch(err => console.error(err));
    }

    updateAddress() {
        fetch('/address', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                addressId: this.state.userInfo.addressId,
                streetAddress1: this.state.userInfo.streetAddress1,
                streetAddress2: this.state.userInfo.streetAddress2,
                city: this.state.userInfo.city,
                state: this.state.userInfo.state,
                zipcode: this.state.userInfo.zipcode,
                userId: this.state.userInfo.userId
            })
        })
        .then(res => res.json())
        .then(d => console.log(d))
        .catch(err => console.error(err));
    }

    postPaymentInfo() {
        fetch('/paymentinfo', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                creditCardNum: this.state.userInfo.creditCardNum,
                expDate: this.state.userInfo.expDate,
                cvv: this.state.userInfo.cvv,
                billingZipcode: this.state.userInfo.billingZipcode,
                userId: this.state.userInfo.userId
            })
        })
        .then(res => res.json())
        .then(paymentInfo => {
            let userInfo = Object.assign(this.state.userInfo, {
                paymentInfoId: paymentInfo.id
            })
            this.setState({ userInfo });
        }).catch(err => console.error(err));
    }

    updatePaymentInfo() {
        fetch('/paymentInfo', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                paymentInfoId: this.state.userInfo.paymentInfoId,
                creditCardNum: this.state.userInfo.creditCardNum,
                expDate: this.state.userInfo.expDate,
                cvv: this.state.userInfo.cvv,
                billingZipcode: this.state.userInfo.billingZipcode,
                userId: this.state.userInfo.userId
            })
        })
        .then(res => res.json())
        .then(d => console.log(d))
        .catch(err => console.error(err));
    }

    render() {
        const getComponent = (step) => {
            switch(step) {
                case 1:
                    return <SignUpForm user={this.state.userInfo} updateField={this.updateField}
                        advanceStep={this.advanceStep} postUser={this.postUser} updateUser={this.updateUser}/>;
                    break;
                case 2:
                    return <AddressForm user={this.state.userInfo} updateField={this.updateField}
                        advanceStep={this.advanceStep} decreaseStep={this.decreaseStep}
                        postAddress={this.postAddress} updateAddress={this.updateAddress}/>;
                    break;
                case 3:
                    return <BillingForm user={this.state.userInfo} updateField={this.updateField}
                        advanceStep={this.advanceStep} decreaseStep={this.decreaseStep}
                        postPaymentInfo={this.postPaymentInfo} updatePaymentInfo={this.updatePaymentInfo}/>;
                    break
                case 4:
                    return <Confirmation user={this.state.userInfo} advanceStep={this.advanceStep}
                        decreaseStep={this.decreaseStep}/>
                    break;
                case 5:
                    return <ThankYou />
                    break;
                default:
                    return <Home />
            }
        }

        return (
            <main className="ui text container">
                <div className="ui top attached menu">
                    <div className="item">Buy Stuff Here 🤑</div>
                    <div className="right item">
                        <Button color="green" handleClick={this.resetForm}>Checkout</Button>
                    </div>
                </div>
                <div className="ui bottom attached segment">
                    {getComponent(this.state.step)}
                </div>
            </main>
        )
    }
}

const Button = (props) => {
    const handleClick = (e) => {
        e.preventDefault();
        props.handleClick();
    }

    return <div className={`ui button ${props.color}`} onClick={handleClick}>{props.children}</div>
}

const SignUpForm = (props) => {
    const updateName = (e) => {
        props.updateField('name', e.target.value);
    }

    const updateEmail = (e) => {
        props.updateField('email', e.target.value);
    }

    const updatePassword = (e) => {
        props.updateField('password', e.target.value);
    }

    const handleNextClick = (e) => {
        if (props.user.userId.length === 0) {
            props.postUser();
        } else {
            props.updateUser();
        }
        props.advanceStep();
    }

    return (
        <form className="ui form">
            <div className="field">
                <label>Name</label>
                <input type="text" name="name" value={props.user.name} onChange={updateName}/>
            </div>
            <div className="field">
                <label>Email</label>
                <input type="email" name="name" placeholder="you@example.com"
                    value={props.user.email} onChange={updateEmail}
                />
            </div>
            <div className="field">
                <label>Password</label>
                <input type="email" name="name" placeholder="********"
                    value={props.user.password} onChange={updatePassword}
                />
            </div>
            <Button handleClick={handleNextClick}>Next</Button>
        </form>
    )
}

const AddressForm = (props) => {
    const updateStreeAddress1 = (e) => {
        props.updateField('streetAddress1', e.target.value);
    }

    const updateStreeAddress2 = (e) => {
        props.updateField('streetAddress2', e.target.value);
    }

    const updateCity = (e) => {
        props.updateField('city', e.target.value);
    }

    const updateState = (e) => {
        props.updateField('state', e.target.value);
    }

    const updateZipcode = (e) => {
        props.updateField('zipcode', e.target.value);
    }

    const handleNextClick = (e) => {
        if (props.user.addressId.length === 0) {
            props.postAddress();
        } else {
            props.updateAddress();
        }
        props.advanceStep();
    }

    return (
        <form className="ui form">
            <div className="field">
                <label>Street Address</label>
                <input type="text" name="street-address-1" placeholder="Street Address"
                    value={props.user.streetAddress1} onChange={updateStreeAddress1}/>
                <input type="text" name="street-address-2" placeholder="Apt #"
                    value={props.user.streetAddress2} onChange={updateStreeAddress2}/>
            </div>
            <div className="field">
                <label>City</label>
                <input type="text" name="city" placeholder="City"
                    value={props.user.city} onChange={updateCity}/>
            </div>
            <div className="field">
                <label>State</label>
                <select className="ui fluid dropdown"
                    value={props.user.state} onChange={updateState}>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                </select>
            </div>
            <div className="field">
                <label>Zip Code</label>
                <input type="text" name="zipcode" placeholder="Zip Code"
                    value={props.user.zipcode} onChange={updateZipcode}/>
            </div>
            <Button handleClick={props.decreaseStep}>Back</Button>
            <Button handleClick={handleNextClick}>Next</Button>
        </form>
    )
}

const BillingForm = (props) => {
    const updateCreditCardNum = (e) => {
        props.updateField('creditCardNum', e.target.value);
    }

    const updateExpDate = (e) => {
        props.updateField('expDate', e.target.value);
    }

    const updateCvv = (e) => {
        props.updateField('cvv', e.target.value);
    }

    const updateBillingZipcode = (e) => {
        props.updateField('billingZipcode', e.target.value);
    }

    const handleNextClick = (e) => {
        if (props.user.paymentInfoId.length === 0) {
            props.postPaymentInfo();
        } else {
            props.updatePaymentInfo();
        }
        props.advanceStep();
    }

    return (
        <form className="ui form">
            <div className="field">
                <label>Credit Card Number</label>
                <input type="text" name="creditCardNum" value={props.user.creditCardNum} onChange={updateCreditCardNum}/>
            </div>
            <div className="field">
                <label>Expiration Date</label>
                <input type="text" name="expDate" placeholder="01/2020"
                    value={props.user.expDate} onChange={updateExpDate}
                />
            </div>
            <div className="field">
                <label>CVV</label>
                <input type="text" name="cvv" placeholder="###"
                    value={props.user.cvv} onChange={updateCvv}
                />
            </div>
            <div className="field">
                <label>Billing Zipcode</label>
                <input type="text" name="billingZipcode" placeholder="#####"
                    value={props.user.billingZipcode} onChange={updateBillingZipcode}
                />
            </div>
            <Button handleClick={props.decreaseStep}>Back</Button>
            <Button handleClick={handleNextClick}>Next</Button>
        </form>
    )
}

const Home = (props) => {
    return (
        <p>Looks like you're ready to click the checkout button...</p>
    )
}

const Confirmation = (props) => {
    return (
        <div>
            <p>Please confirm that everything looks great:</p>
            <p><strong>Account Information</strong></p>
            <p>Name: {props.user.name}</p>
            <p>Email: {props.user.email}</p>
            <p>Password: {props.user.password}</p>
            <p><strong>Shipping Address</strong></p>
            <p>Street Address 1: {props.user.streetAddress1}</p>
            <p>Street Address 2: {props.user.streetAddress2}</p>
            <p>City: {props.user.city}</p>
            <p>State: {props.user.state}</p>
            <p>Zip Code: {props.user.zipcode}</p>
            <p><strong>Billing Information</strong></p>
            <p>Credit Card Number: {props.user.creditCardNum}</p>
            <p>Expiration Date: {props.user.expDate}</p>
            <p>CVV: {props.user.cvv}</p>
            <p>Billing Zip Code: {props.user.billingZipcode}</p>
            <Button handleClick={props.decreaseStep}>Back</Button>
            <Button handleClick={props.advanceStep}>Confirm</Button>
        </div>
    )
}

const ThankYou = (props) => {
    return (
        <p>💗 Thank you for your purchase. Please come again! 💗</p>
    )
}




ReactDOM.render(<App />, document.getElementById('app'));