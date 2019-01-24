import React from 'react';

import Typography from '@material-ui/core/Typography';

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
            <Card className="sitebox">
                <CardHeader
                    title={<Typography variant="body1">{this.props.site.name}</Typography>}
                    subheader={<Typography className="updated-at" variant="caption"> {dayjs(this.props.site.updated_at).format("DD/MM/YYYY HH:mm")}</Typography>}
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