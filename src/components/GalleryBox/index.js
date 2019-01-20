import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import UpdateIcon from '@material-ui/icons/Update';

import Button from '@material-ui/core/Button';

import dayjs from 'dayjs';

import strings from 'strings';

import './styles.scss';

class galleryBox extends React.Component {
    render() {
        return (
            <Paper className="gallerybox">
                <div onClick={this.props.onOpen} className="gallerybox-content">
                    <div>
                        <Typography variant="body1">{this.props.gallery.title}</Typography>
                    </div>

                    <div className="divider"/>
                </div>
                <div className="bottom">
                    <UpdateIcon fontSize="small"/>
                    <Typography className="updated-at" variant="caption"> {dayjs(this.props.gallery.updated_at).format("DD/MM/YYYY HH:mm")}</Typography>
                    <Button onClick={this.props.onOpen} className="open-button" color="primary" size="small" variant="contained">{strings.OPEN}</Button>
                </div>
            
            </Paper>

        );
    }
}

export default galleryBox;