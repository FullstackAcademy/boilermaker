import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { ProgressBar, OverlayTrigger, Tooltip } from 'react-bootstrap';

const Score = (props) => {
    const { user } = props;
    const totalScore = (
        <Tooltip>
            <strong>{`Total Score: ${user.score}`}</strong>
        </Tooltip>
    );
    return (
        <div>
            <OverlayTrigger placement="bottom" overlay={totalScore}>
                <ProgressBar bsStyle="success" active now={user.score % 100} label={`${user.score % 100} / 100 until next level`} />
            </OverlayTrigger >
        </div>
    )
}

export default Score;