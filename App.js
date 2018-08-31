import React from 'react';
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import PuntosCrediGana from './components/GetPuntosCrediGana';
import AlertaOffline from './components/AlertaOffline';
import DialogProgress from 'react-native-dialog-progress';

const options = {
  title:"Espere un momento...",
  message:"Obteniendo Informacion!",
  isCancelable:false
}


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {text: null,
                  isLoading: false
                };
  }

  getPuntosCrediGana = () =>{    
      
      DialogProgress.show(options);
      console.log("Text Input: "+ this.state.text);

      fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(res => res.json())
      .then(parsedRes =>{
        console.log('resultado del WS: '+parsedRes.title);
        DialogProgress.hide();
        this.textInput.clear()
        Alert.alert(
          'Resultado!',
          parsedRes.title,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          { cancelable: false }
        );

      })
      .catch(err => console.log(err));

  }
  
  render() {
    return (
      <View style={styles.container}>
        <AlertaOffline/>
        <View style={styles.inLine} >
            <View style ={styles.inLineItem} >
              <Text>Codigo de Cliente:</Text>
            </View>
            <View style ={styles.inLineItem} >
              <TextInput style ={styles.textInput} maxLength={6} keyboardType={'numeric'} placeholder={"######"}
                onChangeText={(text) => this.setState({text}) } ref={input => { this.textInput = input }} />
            </View>
            <View style ={styles.inLineItem} >
              <PuntosCrediGana onPuntosCredigana ={this.getPuntosCrediGana}/>
            </View>
        </View>
      </View>            
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop:20
  },textInput:{ height: 40,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1
  },
  inLine: {
    flexDirection: 'row'
  },
  inLineItem:{
    flex:1
  }
});
