import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import UpdateIcon from '@material-ui/icons/Update';

import Button from '@material-ui/core/Button';

import {Link} from 'react-router-dom';

import dayjs from 'dayjs';

import strings from 'strings';

import './styles.scss';

class ProjectBox extends React.Component {
    render() {
        return (
            <Paper className="projectbox">
                <div onClick={this.props.onOpen} className="projectbox-content">
                    <div>
                        <Typography variant="body1">{this.props.project.titles[0].content}</Typography>
                    </div>

                    <div className="divider"/>
                </div>
                <div className="bottom">
                    <UpdateIcon fontSize="small"/>
                    <Typography className="updated-at" variant="caption"> {dayjs(this.props.project.updated_at).format("DD/MM/YYYY HH:mm")}</Typography>
                    <Button onClick={this.props.onOpen} className="open-button" color="primary" size="small" variant="contained">{strings.OPEN}</Button>
                </div>
            
            </Paper>

        );
    }
}

export default ProjectBox;