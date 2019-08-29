import React from 'react'
import { Button } from 'antd'

class EditPage extends React.Component{

    render(){
        return (
            <div>
                <h1>这是编辑页面</h1>
                <Button 
                    onClick={()=>this.props.history.goBack()}
                >返回</Button>
            </div>
        )
    }
}

export default EditPage