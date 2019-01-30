import React from 'react';
import {injectStripe, CardElement} from 'react-stripe-elements';

import MaskedInput from 'react-text-mask';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {getTheme} from 'utils';

import strings from 'strings';
import './styles.scss';

import client from 'services/client';

function ZIP(props) {
    const { inputRef, ...other } = props;
    return (
        <MaskedInput
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            {...other}
            mask={[/\d/, /\d/, /\d/,/\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
        />
    )
}

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: this.props.lastUser.fullname,
        address: this.props.lastUser.address,
        zip: this.props.lastUser.zip,
        city: this.props.lastUser.city,
        state: this.props.lastUser.state,
        country: this.props.lastUser.country,
        
        paid: false
    }
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    ev.preventDefault();
    this.setState({paid: true}, async () => {
        const {token} = await this.props.stripe.createToken({name: this.state.name, });

        if(token) {
            try {
                this.setState({paid: true});
                const response = await client.post('/account/charge', {
                    name: this.state.name,
                    address: this.state.address,
                    city: this.state.city,
                    state: this.state.state,
                    zip: this.state.zip,
                    country: this.state.country,
                    token
                });
                if(response.data.status === "success") {
                    this.props.onSuccess();
                }
            } catch (err) {
                this.setState({paid: false});
                if(err) throw err;
            }   
        } else {
            this.setState({paid: false});
        }
    });
    
}

  handleChange = (value, e) => {
      this.setState({
          [value]: e.target.value
      });
  } 

  render() {
    const colorText = getTheme() === "dark" ? "#e3e3e3" : "#000";
    const style = {
        base: {
            color: colorText,
            fontSize: '18px',
            fontFamily: '"Open Sans", sans-serif',
            fontSmoothing: 'antialiased',
            '::placeholder': {
                color: '#CFD7DF',
            },
        },
        invalid: {
            color: colorText,
            ':focus': {
                color: 'white',
            },
        },
      };

        return (
            <div className={["checkout", getTheme()].join(" ")}>
                <form onSubmit={this.submit}>
                    <TextField
                        required
                        margin="dense"
                        label={strings.NAME}
                        value={this.state.name}
                        onChange={e => this.handleChange('name', e)}
                        fullWidth
                    />
                    <TextField
                        disabled
                        margin="dense"
                        label={strings.EMAIL}
                        value={this.props.lastUser.email}
                        fullWidth
                        style={{opacity: 0.5}}
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        label={strings.COUNTRY}
                        onChange={e => this.handleChange('country', e)}
                        value={this.state.country}
                        fullWidth
                    />
                    <TextField
                        required
                        margin="dense"
                        label={strings.ADDRESS}
                        onChange={e => this.handleChange('address', e)}
                        value={this.state.address}
                        fullWidth
                    />
                    <div className="inline-grid">
                        <Grid item md={5}>
                            <TextField
                                required
                                margin="dense"
                                label={strings.CITY}
                                onChange={e => this.handleChange('city', e)}
                                value={this.state.city}
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={3}>
                            <TextField
                                required
                                margin="dense"
                                onChange={e => this.handleChange('state', e)}
                                label={strings.STATE}
                                value={this.state.state}
                                fullWidth
                            />
                        </Grid>
                        <Grid item md={3}>
                            <TextField
                                required
                                margin="dense"
                                onChange={e => this.handleChange('zip', e)}
                                label={strings.POSTAL_CODE}
                                value={this.state.zip}
                                fullWidth
                                InputProps={{
                                    inputComponent: ZIP
                                }}
                            />
                        </Grid>
                    </div>
                    
                    <CardElement hidePostalCode style={style} className="card-number-input"/>
                    <div className="inline-grid">
                        <Grid item md={2}>
                            <Button onClick={this.props.close} fullWidth style={{marginTop: 15}}>
                                {strings.CANCEL}
                            </Button>
                        </Grid>
                        <Grid item md={9}>
                            <Button disabled={this.state.paid} type="submit" color="primary" fullWidth style={{marginTop: 15}} variant="contained">
                                {strings.SUBSCRIBE}
                            </Button>
                        </Grid>
                    </div>
                </form>
            </div>
        );
    }
}

export default injectStripe(CheckoutForm);