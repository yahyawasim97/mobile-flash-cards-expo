import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions';
import { styles } from '../styles/styles';

function DeckList({navigation, decks, handleInitialData}) {
  const [loading, setLoading] = useState(decks ? false : true);

  useEffect(() => {
    handleInitialData();
    
  }, []);

  const fetchData = async() =>{
    setLoading(true)
    handleInitialData();
    setLoading(false)
  }


  function RenderItem({ item }) {
    const {title, questions} = item 

    return (
      <TouchableOpacity style={styles.listItem} onPress={()=> navigation.navigate("deckDetails", {title: item.title, id: item.id})}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={[styles.mutedText, {marginTop: 5}]}>{questions.length ? `${questions.length} cards` : "No cards found"} </Text>
      </TouchableOpacity>
    );
  }
  
  const data = decks ? decks : []

  return (
      <View style={styles.container}>     
       <StatusBar barStyle = "dark-content" />
          <SafeAreaView>
            <FlatList
              data={Object.values(data)}
              renderItem={({item})=> <RenderItem item={item}/>}
              keyExtractor={item => item.id}
              onRefresh={fetchData}
              refreshing={loading}
              
            />
          
      
          </SafeAreaView>
      </View>
  );
} 

const mapStateToProps = state => ({
  decks: state
})

export default connect(
  mapStateToProps,
  { handleInitialData }
)(DeckList)
