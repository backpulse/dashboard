import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import CardHeader from '@material-ui/core/CardHeader';

import strings from 'strings';

import './styles.scss';

class PhotoBox extends React.Component {
    render() {
        return (
            <Card className="photobox">
                <CardHeader title={this.props.data.title || "No name"}/>
                {this.props.data.url && <CardMedia
                    className="photobox-preview-media"
                    image={this.props.data.url}
                />}
                <CardActions disableActionSpacing>
                    <Tooltip title={strings.EDIT}>
                        <IconButton onClick={this.props.onEdit} aria-label="Edit">
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={strings.DELETE}>
                        <IconButton onClick={this.props.onDelete} aria-label="Edit">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        )
    }
}

export default PhotoBox;