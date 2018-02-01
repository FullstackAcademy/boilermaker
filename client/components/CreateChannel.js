import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createChannel } from '../store';

class CreateChannel extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            channelValue: '',
            descriptionValue: ''
        };
    }

    getValidationState(key) {
        const length = this.state[key].length;
        if (length > 0) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    handleChange(key, e) {
        this.setState({ [key]: e.target.value });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        this.props.makeChannel(evt.target.channel.value, evt.target.category.value, evt.target.description.value);
        this.setState({ channelValue: '', descriptionValue: '' })
    }

    render() {
        const categories = ['Anime', 'Gaming', 'Other', 'Politics', 'Sports', 'TV/Film'];

        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState('channelValue')}
                >
                    <ControlLabel>Create a Channel</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.channelValue}
                        name="channel"
                        placeholder="Enter channel name"
                        onChange={this.handleChange.bind(this, 'channelValue')}
                    />
                    <FormControl.Feedback />
                    {
                        this.state.channelValue.length ? null : <HelpBlock>Please enter a value</HelpBlock>
                    }
                </FormGroup><br />
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Category</ControlLabel>
                    <FormControl componentClass="select" placeholder="select" name="category">
                        {
                            categories.map(category => {
                                return (
                                    <option key={category} value={category}>{category}</option>
                                )
                            })
                        }
                    </FormControl>
                </FormGroup><br />
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState('descriptionValue')}
                >
                    <ControlLabel>Describe Your Channel</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.descriptionValue}
                        name="description"
                        placeholder="Enter description"
                        onChange={this.handleChange.bind(this, 'descriptionValue')}
                    />
                    <FormControl.Feedback />
                    {
                        this.state.descriptionValue.length ? null : <HelpBlock>Please enter a value</HelpBlock>
                    }
                </FormGroup><br />
                <Button type="submit">Submit</Button>
            </form>
        );
    }
}

const mapDispatch = (dispatch) => {
    return {
        makeChannel(channel, category, description) {
            dispatch(createChannel(
                channel,
                category,
                description
            ))
        }
    }
}

export default withRouter(connect(null, mapDispatch)(CreateChannel));