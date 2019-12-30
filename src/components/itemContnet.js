import React from 'react'
import axios from 'axios'
import { Layout, Row, Col, Button } from 'antd'

import { connect } from 'react-redux'

import {changeItemStatus,deleteItem} from '../redux/todolist.redux'

@connect(
    state=>state.todolist,
    {changeItemStatus,deleteItem}
)
class ItemContent extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        console.log(this.props)
        const currentItem = this.props.currentItem
        return (
            <Layout style={{ padding: '0 24px 24px' }}>
                <Layout.Header
                    style={{background: '#f0f2f5', padding: 0}}
                >
                    {
                        currentItem.title?(<Row>
                            <Col span={18}>
                                {currentItem.title? currentItem.title : ''}
                            </Col>
                            <Col span={3}>
                                <Button 
                                    onClick={()=>this.props.changeItemStatus(currentItem)}
                                >{currentItem.status==='todo'? '便签完成':'便签未完成'}</Button>
                            </Col>
                            <Col span={3}>
                                <Button 
                                    onClick={()=>this.props.deleteItem(currentItem)}
                                >删除便签</Button>
                            </Col>
                        </Row>):null
                    }
                </Layout.Header>
                <Layout.Content style={{
                    background: '#fff', padding: 24, margin: 0, minHeight: 280,
                    }}
                >
                    {!currentItem.content?'请选择一个便签':currentItem.content}
                </Layout.Content>
            </Layout>
        )
    }
}

export default ItemContent