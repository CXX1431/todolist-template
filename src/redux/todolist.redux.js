import axios from 'axios'

const GET_ITEMS = 'GET_ITEMS'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
const SELECT_ITEM = 'SELECT_ITEM'
const CHANGE_ITEM_STATUS = 'CHANGE_ITEM_STATUS'

const initState = {
    items:[],
    currentItem:{}
}

export function todolist(state=initState, action){
    switch(action.type){
        case GET_ITEMS:
        case ADD_ITEM:
            return {...state,items:action.payload}
        case CHANGE_ITEM_STATUS:
            return {...state,
                items:action.payload.data,
                currentItem:{...action.payload.currentItem,status:action.payload.status}
            }
        case DELETE_ITEM:
            return {...state,items:action.payload,currentItem:{}}
        case SELECT_ITEM:
            return {...state,currentItem:action.payload}
        default:
            return state
    }
}

function getItems(data){
    return {type:'GET_ITEMS', payload:data}
}

function addItem(data){
    return {type:'ADD_ITEM', payload:data}
}

function deleteItemAction(data){
    return {type:'DELETE_ITEM', payload:data}
}

function selectItem(data){
    return {type:'SELECT_ITEM', payload:data}
}

function changeStatus(data){
    return {type:'CHANGE_ITEM_STATUS', payload:data}
}

export function getTodoList(){
    return dispatch=>{
        axios.get('/todolist/allitems')
            .then(function(response){
                if(response.status === 200 && response.data.code === 0){
                    dispatch(getItems(response.data.data.length>0?response.data.data:[]))
                }
            })
    }
}

export function addItemToList(item){
    return dispatch=>{
        axios.post('/todolist/additem', item)
              .then(function (res) {
                if(res.status===200 && res.data.code===0){
                    dispatch(addItem(res.data.data.length>0?res.data.data:[]))
                }
              })
              .catch(function (error) {
                console.log(error);
              });
    }
}

export function selectCurrentItem(currentItem){
    return dispatch=>{
        dispatch(selectItem(currentItem))
    }
}

export function changeItemStatus(currentItem){
    return dispatch=>{
        axios.post('/todolist/updateitem',{"_id":currentItem._id,"status":currentItem.status})
            .then(function(res){
                if(res.status===200 && res.data.code===0){
                    dispatch(changeStatus({
                            data:res.data.data||[],
                            currentItem:currentItem,
                            status:currentItem.status==='todo'?'done':'todo'
                        })
                    )
                }
            })
            .catch(function(err){
                console.log(err)
            })
    }
}

export function deleteItem(currentItem){
    return dispatch=>{
        axios.post('/todolist/deleteitem',{"_id":currentItem._id})
        .then(function(res){
            if(res.status===200 && res.data.code===0){
                dispatch(deleteItemAction(res.data.data||[]))
            }
        })
        .catch(function(err){
            console.log(err)
        })
    }
}