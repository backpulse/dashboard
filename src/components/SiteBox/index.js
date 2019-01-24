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

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import strings from 'strings';

class SiteBox extends React.Component {
    render() {
        return (
            // <Paper className="sitebox">
            //     <Link to={"/site/" + this.props.site.name}>
            //         <div className="sitebox-content">
            //             <div>
            //                 <span className="type-icon">
            //                     {this.props.site.type === "photography" && <Photo/>}
            //                     {this.props.site.type === "music" && <MusicNote/>}
            //                     {this.props.site.type === "portfolio" && <Portfolio/>}
            //                 </span>
            //                 <Typography variant="body1">{this.props.site.name}</Typography>
            //             </div>

            //             <div className="divider"/>
            //         </div>
            //     </Link>
            //     <div className="bottom">
            //         <UpdateIcon fontSize="small"/>
            //         <Typography className="updated-at" variant="caption"> {dayjs(this.props.site.updated_at).format("DD/MM/YYYY HH:mm")}</Typography>
            //         <Link className="open-button" to={"/site/" + this.props.site.name}>
            //             <Button color="primary" size="small" variant="contained">{strings.OPEN}</Button>
            //         </Link> 
            //     </div>
            
            // </Paper>
            <Card className="sitebox">
                <CardHeader
                    title={<Typography variant="body1">{this.props.site.name}</Typography>}
                    subheader={<Typography className="updated-at" variant="caption"> {dayjs(this.props.site.updated_at).format("DD/MM/YYYY HH:mm")}</Typography>}
                />
                
                <CardMedia
                    onClick={this.props.edit}
                    className="gallery-card-preview-media"
                    image={this.props.previewImage || "https://cdn8.bigcommerce.com/s-mz5hl9/stencil/40b091e0-9fe5-0136-6c3f-65c8afb177d4/images/no-image.svg"}
                />
                <CardActions disableActionSpacing>
                    <Tooltip title={strings.OPEN}>
                        <IconButton onClick={this.props.open}>
                            <OpenInNewIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={strings.EDIT}>
                        <Link to={"/site/" + this.props.site.name}>
                            <IconButton >
                                <EditIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    <Tooltip title={strings.FAVORITE}>
                        <IconButton color={this.props.site.favorite ? "primary": "default"} onClick={this.props.favorite} style={{marginLeft: "auto"}}>
                            <FavoriteIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>

        );
    }
}

export default SiteBox;