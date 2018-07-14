import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            description: '',
            list: []
        }

        this.refresh()
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : ''
        axios.get(`${URL}?sort=-createdAt${search}`)
            .then(res => this.setState({ ...this.state, description, list: res.data }))
    }
    
    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value })
    }
    
    handleAdd() {
        const description = this.state.description;
        axios.post(URL, { description })
            .then(res => this.refresh()) 
    }

    handleRemove(todo) {
        axios.delete(`${URL}/${todo._id}`)
            .then(res => this.refresh(this.state.description))
    }

    handleMarkAsDone(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPending(todo) {
        axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(resp => this.refresh(this.state.description))
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleClear() {
        this.refresh()
    }
    
    render() {
        return (
            <div>
                <PageHeader name='Tarefas' small='Cadastro' />
                
                <TodoForm 
                    description={this.state.description}
                    handleAdd={this.handleAdd.bind(this)}
                    handleChange={this.handleChange.bind(this)}
                    handleSearch={this.handleSearch.bind(this)}
                    handleClear={this.handleClear.bind(this)} />
                
                <TodoList list={this.state.list}
                    handleRemove={this.handleRemove.bind(this)}
                    handleMarkAsDone={this.handleMarkAsDone.bind(this)}
                    handleMarkAsPending={this.handleMarkAsPending.bind(this)} />
            </div>
        )
    }
}