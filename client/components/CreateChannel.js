import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

export default class FormExample extends Component {
    constructor(props, context) {
        super(props, context);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: ''
        };
    }

    getValidationState() {
        const length = this.state.value.length;
        if (length > 0) return 'success';
        else if (length > 0) return 'error';
        return null;
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    render() {
        const categories = ['Anime', 'Gaming', 'Other', 'Politics', 'Sports', 'TV/Film'];

        return (
            <form>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState()}
                >
                    <ControlLabel>Create a Channel</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.value}
                        placeholder="Enter channel name"
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback />
                    {
                        this.state.value.length ? null : <HelpBlock>Please enter a value</HelpBlock>
                    }
                </FormGroup>
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Category</ControlLabel>
                    <FormControl componentClass="select" placeholder="select">
                        {
                            categories.map(category => {
                                return (
                                    <option key={category} value={category}>{category}</option>
                                )
                            })
                        }
                    </FormControl>
                </FormGroup>
                <button type="submit">Submit</button>
            </form>
        );
    }
}