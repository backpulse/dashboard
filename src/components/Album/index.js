import React from 'react';
import './styles.scss';
import dayjs from 'dayjs';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import CardMedia from '@material-ui/core/CardMedia';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import strings from 'strings';

class Album extends React.Component {
    render() {
        return (
            <Card className="album">
                <CardHeader
                    title={<Typography variant="body1">{this.props.data.title || strings.NO_NAME}</Typography>}
                    subheader={<Typography className="updated-at" variant="caption"> {dayjs(this.props.data.updated_at).format("DD/MM/YYYY HH:mm")}</Typography>}
                />
                {this.props.data.cover && <CardMedia
                    className="media"
                    image={this.props.data.cover}
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

export default Album;