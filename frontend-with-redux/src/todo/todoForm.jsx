import React, { Component } from 'react';

import Grid from '../template/grid'
import IconButton from '../template/iconButton'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { changeDescription, search, add } from './todoActions'

class TodoForm extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.search()
    }

    render() {
        const { add, search, description } = this.props;
        return (
            <div role='form' className='todoForm'>
                <Grid cols='12 9 10'>
                    <input id='description' className='form-control'
                        placeholder='Adicione uma tarefa'
                        value={description}
                        onChange={this.props.changeDescription} />
                </Grid>
        
                <Grid cols='12 3 2'>
                    <IconButton style="primary" icon="plus" onClick={() => add(description)} />  
                    <IconButton style="info" icon="search" onClick={() => search()} />
                    <IconButton style="default" icon="close" onClick={this.props.handleClear} />
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => ({ description: state.todo.description })

const mapDispatchToProps = dispatch => bindActionCreators({ changeDescription, search, add }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)