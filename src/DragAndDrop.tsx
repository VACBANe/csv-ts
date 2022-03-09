import React, { Component } from 'react';
import {DropHere} from "./components/DropHere";

type IProps = Record<string, unknown>;
class DragAndDrop extends Component<IProps, { drag: boolean }> {
    dragCounter: number;
    constructor(props: IProps) {
        super(props);
        this.state = {
            drag: false,
        };
        this.dragCounter = 0;
    }
    handleDrag(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
    }
    handleDragIn(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.dragCounter++;
        if (event.dataTransfer?.items && event.dataTransfer.items.length > 0) {
            this.setState({ drag: true });
        }
    }
    handleDragOut(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.dragCounter--;
        if (this.dragCounter === 0) {
            this.setState({ drag: false });
        }
    }
    handleDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.setState({ drag: false });
        if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
            // @ts-ignore
            this.props.handleDrop(event.dataTransfer.files);
            event.dataTransfer.clearData();
            this.dragCounter = 0;
        }
    }
    componentDidMount() {
        const el = document.body;
        el.addEventListener('dragenter', (event) => this.handleDragIn(event));
        el.addEventListener('dragleave', (event) => this.handleDragOut(event));
        el.addEventListener('dragover', (event) => this.handleDrag(event));
        el.addEventListener('drop', (event) => this.handleDrop(event));
    }
    componentWillUnmount() {
        const el = document.body;
        el.removeEventListener('dragenter', (event) =>
            this.handleDragIn(event)
        );
        el.removeEventListener('dragleave', (event) =>
            this.handleDragOut(event)
        );
        el.removeEventListener('dragover', (event) => this.handleDrag(event));
        el.removeEventListener('drop', (event) => this.handleDrop(event));
    }
    render() {
        return (
            <div>
                {this.state.drag && (
                    <DropHere>
                        Drop here
                    </DropHere>
                )}
                {this.props.children}
            </div>
        );
    }
}
export default DragAndDrop;
