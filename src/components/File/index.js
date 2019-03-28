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
import strings from 'strings';
import CardMedia from '@material-ui/core/CardMedia';
import LinkIcon from '@material-ui/icons/Link';
import {copy} from 'utils';

class File extends React.Component {

    copyLink = () => copy(this.props.data.url);

    render() {
        return (
            <Card className="filebox">
                <CardHeader
                    title={<Typography variant="body1">{this.props.data.name}</Typography>}
                    subheader={<Typography className="updated-at" variant="caption"> {dayjs(this.props.data.created_at).format("DD/MM/YYYY HH:mm")}</Typography>}
                />
                {this.props.data.type.startsWith("image") && <CardMedia
                    className="media"
                    image={this.props.data.url}
                />}
                <CardActions disableActionSpacing>
                    <Tooltip title={strings.COPY_URL}>
                        <IconButton onClick={this.copyLink}>
                            <LinkIcon />
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

export default File;