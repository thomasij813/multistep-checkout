class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            step: 0,
            userInfo: {
                name: '',
                email: '',
                password: '',
            }
        }

        this.resetForm = this.resetForm.bind(this);
        this.updateField = this.updateField.bind(this);
        this.advanceStep = this.advanceStep.bind(this);
        this.decreaseStep = this.decreaseStep.bind(this);
    }

    resetForm() {
        this.setState({
            step: 1,
            userInfo: {
                name: '',
                email: '',
                password: '',
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
        this.steState({
            step: this.step - 1
        });
    }

    render() {
        const getComponent = (step) => {
            switch(step) {
                case 1:
                    return <SignUpForm user={this.state.userInfo} updateField={this.updateField}
                        advanceStep={this.advanceStep}/>;
                    break;
                case 2:
                    return <AddressForm />;
                    break;
                case 3:
                    return null;
                    break
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
            <Button handleClick={props.advanceStep}>Next</Button>
        </form>
    )
}

const AddressForm = (props) => {
    return (
        <form className="ui form">
            <div class="field">
                <label>Shipping Address</label>
                <div class="fields">
                    <div class="twelve wide field">
                        <input type="text" name="shipping[address]" placeholder="Street Address" />
                    </div>
                    <div class="four wide field">
                        <input type="text" name="shipping[address-2]" placeholder="Apt #" />
                    </div>
                </div>
            </div>
            <div class="two fields">
                <div class="field">
                    <label>State</label>
                    <select class="ui fluid dropdown">
                        <option value="">State</option>
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
            </div>
            <Button handleClick={props.advanceStep}>Next</Button>
        </form>
    )
}

const Home = (props) => {
    return (
        <p>Looks like you're ready to click the checkout button...</p>
    )
}




ReactDOM.render(<App />, document.getElementById('app'));