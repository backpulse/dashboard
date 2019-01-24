import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import strings from 'strings';

import './styles.scss';

class PhotoBox extends React.Component {
    render() {
        return (
            <Card className="photobox margin-10">
                <CardMedia
                    className="photobox-preview-media"
                    image={this.props.src}
                />
                {this.props.editing && <CardActions disableActionSpacing>
                    <Checkbox
                        checked={this.props.checked}
                        onChange={this.props.toggleCheck}
                        color="primary"
                    />
                    <Tooltip title={strings.DELETE}>
                        <IconButton onClick={this.props.onDelete} aria-label="Delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>

                    {this.props.previewButton && <Button onClick={this.props.setPreview} color="primary" style={{marginLeft: "auto", cursor: this.props.preview ? "default": "pointer"}} size="small" variant={this.props.preview ? "contained" : "outlined"}>{strings.GALLERY_PREVIEW_IMAGE}</Button>}

                </CardActions>}
            </Card>
        )
    }
}

export default PhotoBox;