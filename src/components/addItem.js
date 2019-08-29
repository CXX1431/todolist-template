import React from 'react'
import axios from 'axios'
import { Button, Input, Row, Col } from 'antd'
import { connect } from 'react-redux'

import { addItemToList } from '../redux/todolist.redux'

@connect(
    state=>state.todolist,
    {addItemToList}
)
class AddItem extends React.Component{
    constructor(props){
        super(props)
        this.state={
            inputValue:''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleChange(e){
        this.setState({
            inputValue:e.target.value
        })
    }

    handleClick(getItemList){
        const inputValue = this.state.inputValue;
        this.setState({
            inputValue:''
        })
        if(inputValue.length>0){
            const item = {
                time: (new Date()).toLocaleString(),
                title:inputValue,
                content:'请输入便签内容',
                status:'todo'
            }

            this.props.addItemToList(item)
        }
    }

    render(){
        return (
            <Row>
                <Col span={2}></Col>
                <Col span={16}>
                    <Input type='text' value={this.state.inputValue} onChange={e=>this.handleChange(e)} />
                </Col>
                <Col span={4}>
                    <Button type="primary" onClick={()=>this.handleClick(this.props.getItemList)}>添加待完成事件</Button>
                </Col>
                <Col span={2}></Col>
            </Row>
        )
    }
}

export default AddItem