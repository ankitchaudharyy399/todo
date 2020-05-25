import React, { Component } from 'react';
import {View,StyleSheet,FlatList} from 'react-native';
import Button from '../components/Button'
import Txtinput from '../components/textInp';
import TodoItem from '../components/todoItem';

export default class Home extends Component {
    constructor(props){
        super(props);

        this.arr=[],

        this.state={
            arrholder:[],
            txt:'',
            select:false
        }

    }

    /* itemSeprator function that seprate the flatlist */

    flatlistsep = () => {
        return(
            <View style={{width:"100%",height:5}}/>       
        )
    }

    /* add function to add items at the start*/

    _addItem=(text)=>{

        let nonempty = this.state.txt.trim().length > 0;
        let arrholder = this.arr;
        if(nonempty){
       this.arr.unshift({
           id:arrholder.length+1,
           title:this.state.txt,
           done:false})
       this.setState({ arrholder: [...this.arr],
    txt:'' })
    }
}


    /* handle the textInput and set state */

    handletxt = (item) => { 
        this.setState({txt:item})
        console.log("item==>",this.state.txt);
    }

    /* toggle function to highlight a item*/
    
    toggleDone(item){
        let arrholder = this.state.arrholder;
        arrholder = arrholder.map((todo)=>{
            if(todo.id == item.id)
            {
                todo.done = !todo.done;

            }
            return todo;
        })
        this.setState({arrholder})
    }
  
    /* Delete the item by pressing remove title */

removeTodo (item) {
    let arrholder = this.state.arrholder;
    arrholder = arrholder.filter((todo) => todo.id !== item.id);
    this.setState({arrholder});
}

    /* clear all list */
_clearall = () => {
    
    this.setState({arrholder:""});
}
    render() {
        return (
            <View style={styles.main}>
                <View style={styles.box}>
                    <Txtinput 
                    value={"Add task..."}
                    textChange={this.handletxt}
                    />
                </View>
                <View style={styles.box2}>
                  <Button name="Add" onPress={this._addItem}/>
                  <Button name="clear All" onPress={this._clearall}/>

                </View>
                <FlatList 
                style={{flex:1,backgroundColor:'lightgrey',}}
                data={this.state.arrholder}
                width="100%"
                extraData={this.state}
                keyExtractor={(item,index) => index.toString()}
                renderItem={({item,index})=>{
                    return(<TodoItem todoItem={item} toggleDone={()=>this.toggleDone(item)}
                    removeTodo={()=>this.removeTodo(item)}
                    />)}}
                ItemSeparatorComponent={this.flatlistsep}
                />    
            </View>
        )
    }
}
const styles = StyleSheet.create({

    main:{
        flex:1,
        backgroundColor:'gray',
    },
    box:{
        alignSelf:'center',
        height:"6%",
        width:"90%",
        backgroundColor:'lightgrey',
        borderRadius:10,
        marginTop:40,  
        marginLeft:5,
        flexDirection:'row',
    },
      box2:{
          height:"10%",
          flexDirection:'row',
          justifyContent:'space-around'
          
      }

})