import React from 'react'
import {Layout, Menu, Icon} from 'antd'
import { connect } from 'react-redux'

import { selectCurrentItem } from '../redux/todolist.redux'

const { SubMenu } = Menu;

@connect(
    state=>state.todolist,
    { selectCurrentItem }
)
class SiderItems extends React.Component{
    constructor(props){
        super(props)
        this.handleItemClick = this.handleItemClick.bind(this)
    }

    handleItemClick(item){
        this.props.selectCurrentItem(item)
    }

    render(){
        console.log(this.props)
        const items = this.props.items
        const todoitems = items.filter(v=>(v.status==='todo'))
        const doneitems = items.filter(v=>(v.status!=='todo'))
        
        return (
            <Layout.Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <SubMenu key="todoitems" title={<span><Icon type="laptop" />待办便签</span>}>
                        {
                            todoitems.map(v=>{
                                return (
                                    <Menu.Item
                                        key={v._id}
                                        onClick = {()=>this.handleItemClick(v)}
                                    >
                                        {v.title}
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="notification" />已完成便签</span>}>
                        {
                            doneitems.map(v=>{
                                return (
                                    <Menu.Item
                                        key={v._id}
                                        onClick = {()=>this.handleItemClick(v)}
                                    >
                                        {v.title}
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                </Menu>
            </Layout.Sider>
        )
    }
}

export default SiderItems