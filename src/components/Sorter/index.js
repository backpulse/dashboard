import React from 'react';

import {reorder, sortByIndex} from 'utils';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


class Sorter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: this.props.items
        }
    }

    onDragEnd = result => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }
    
        const items = reorder(
            this.props.items,
            result.source.index,
            result.destination.index
        );
    
        this.setState({
            items,
        });

        const data = this.updateIndexes(items);
        this.props.onDragEnd(data);
    }

    updateIndexes = data => {
        const items = data.map((d, i) => {
            d.index = i;
            return d;
        });
        return items;
    }

    render() {
        return (
            <div className="c-div">
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="droppable">
                        {provided => (
                            <div ref={provided.innerRef} className={this.props.className}>
                                {this.props.items.map((item, i) => (
                                    <Draggable key={i} draggableId={item.id} index={i}>
                                        {provided => (
                                        <div
                                            className="draggable"
                                            ref={provided.innerRef} 
                                            {...provided.draggableProps} 
                                            {...provided.dragHandleProps}>
                                        
                                            <this.props.component
                                                loading={this.props.loading}
                                                onDefaultSet={() => this.props.onDefaultSet(item)}
                                                onDelete={() => this.props.onDelete(item)}
                                                onEdit={() => this.props.onEdit(item)} 
                                                data={item}
                                            />
                                        </div>
                                        )}
                                    </Draggable>
                                )
                                )}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
}

export default Sorter;