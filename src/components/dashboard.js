import React from 'react'
import { Layout,Button, Row, Col } from 'antd'
import axios from 'axios'
import { connect } from 'react-redux'

import AddItem from './addItem'
import SiderItems from './sider'
import ItemContent from './itemContnet'

import {getTodoList} from '../redux/todolist.redux'

@connect(
    state=>state.todolist,
    {getTodoList}
)

class TodoList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            items:[],
            currentItem:{}
        }

        this.getItemList = this.getItemList.bind(this)
    }

    getItemList(){
        const _this = this
        axios.get('/todolist/allitems')
            .then(function(response){
                if(response.status===200 && response.data.code===0){
                    _this.setState({
                        items:response.data.data.length>0?response.data.data:[]
                    })
                }
            })
            .catch(function(err){
                console.log(err)
            })
    }

    componentDidMount(){
        this.props.getTodoList()
    }

    render(){
        return this.props.items.length>0?(
            <Layout>
                <Layout.Header className="header">
                    <Row>
                        <Col span={2}>
                            <Button 
                                onClick={()=>this.props.history.push('/edit')}
                            >编辑页面</Button>
                        </Col>
                        <Col span={22}>
                            <AddItem></AddItem>
                        </Col>
                    </Row>
                </Layout.Header>
                <Layout>
                    <SiderItems></SiderItems>
                    <ItemContent></ItemContent>
                </Layout>
            </Layout>
        ):null
    }
}

export default TodoList