import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import MusicNote from '@material-ui/icons/MusicNote';
import Photo from '@material-ui/icons/Photo';
import Portfolio from '@material-ui/icons/PermIdentity'

import UpdateIcon from '@material-ui/icons/Update';

import Button from '@material-ui/core/Button';

import './styles.scss';

import {Link} from 'react-router-dom';

import dayjs from 'dayjs';

import strings from 'strings';

class SiteBox extends React.Component {
    render() {
        return (
            <Paper className="sitebox">
                <Link to={"/site/" + this.props.site.name}>
                    <div className="sitebox-content">
                        <div>
                            <span className="type-icon">
                                {this.props.site.type === "photography" && <Photo/>}
                                {this.props.site.type === "music" && <MusicNote/>}
                                {this.props.site.type === "portfolio" && <Portfolio/>}
                            </span>
                            <Typography variant="body1">{this.props.site.name}</Typography>
                        </div>

                        <div className="divider"/>
                    </div>
                </Link>
                <div className="bottom">
                    <UpdateIcon fontSize="small"/>
                    <Typography className="updated-at" variant="caption"> {dayjs(this.props.site.updated_at).format("DD/MM/YYYY HH:mm")}</Typography>
                    <Link className="open-button" to={"/site/" + this.props.site.name}>
                        <Button color="primary" size="small" variant="contained">{strings.OPEN}</Button>
                    </Link> 
                </div>
            
            </Paper>

        );
    }
}

export default SiteBox;