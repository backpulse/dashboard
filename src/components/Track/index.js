import React from 'react';
import Typography from '@material-ui/core/Typography';

import './styles.scss';

import dayjs from 'dayjs';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import strings from 'strings';
import CardMedia from '@material-ui/core/CardMedia';

class Track extends React.Component {
    render() {
        console.log(this.props.data.image);
        return (
            <Card className="track">
                <CardHeader
                    title={<Typography variant="body1">{this.props.data.title}</Typography>}
                    subheader={<Typography className="updated-at" variant="caption"> {dayjs(this.props.data.updated_at).format("DD/MM/YYYY HH:mm")}</Typography>}
                />
                {this.props.data.image && <CardMedia
                    className="track-preview-media"
                    image={this.props.data.image}
                />}
                <CardActions disableActionSpacing>
                    <Tooltip title={strings.OPEN}>
                        <IconButton onClick={this.props.open}>
                            <OpenInNewIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={strings.EDIT}>
                        <IconButton onClick={this.props.onEdit}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={strings.DELETE}>
                        <IconButton onClick={this.props.onDelete} style={{marginLeft: "auto"}}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip> 
                </CardActions>
            </Card>
        );
    }
}

export default Track;