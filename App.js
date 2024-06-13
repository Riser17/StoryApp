

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Keyboard,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const App = () => {

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isAgastyaVisible, setAgastyaVisible] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [responseText, setResponseText] = useState('');


  const titleInputRef = useRef(null);
  const subtitleInputRef = useRef(null);
  const bodyInputRef = useRef(null);

  const handleKeyboardPress = () => {
    setKeyboardVisible(!isKeyboardVisible);
    setAgastyaVisible(false);
  };

  const handleStarPress = () => {
    setAgastyaVisible(true);
    setKeyboardVisible(!isKeyboardVisible);
    Keyboard.dismiss();
  };

  const handleSendRequest = async (action) => {
    const response = await mockServerRequest(selectedText || bodyInputRef.current.value, action);
    setResponseText(response);
  };

  const mockServerRequest = (text, action) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Response for action "${action}" on text: ${text}`);
      }, 1000);
    });
  };

  const handleTextSelection = (start, end) => {

    const selected = bodyInputRef.current.value?.substring(start, end);
    setSelectedText(selected);
    if(selected){
      setAgastyaVisible(!isAgastyaVisible);
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Write New Story</Text>
      <TextInput
        ref={titleInputRef}
        style={styles.input}
        placeholder="Title"
        keyboardType='ascii-capable'
        onChangeText={value => {
          titleInputRef.current.value = value;
        }}
        onFocus={() => {
          setKeyboardVisible(true);
        }}
      />
      <TextInput
        ref={subtitleInputRef}
        style={styles.input}
        placeholder="Sub Title"
        keyboardType='ascii-capable'
        onChangeText={value => {
          subtitleInputRef.current.value = value;
        }}
        onFocus={() => {
          setKeyboardVisible(true);
        }}
      />
      <TextInput
        ref={bodyInputRef}
        style={styles.bodyInput}
        keyboardType='ascii-capable'
        onChangeText={value => {
          bodyInputRef.current.value = value;
        }}
        onFocus={() => {
          setKeyboardVisible(true);
        }}
        multiline
        
        onSelectionChange={(event) => {
          const { start, end } = event.nativeEvent.selection;
          handleTextSelection(start, end);
        }}
      />

      <Modal
        transparent={true}
        animationType="slide"
        visible={isKeyboardVisible || isAgastyaVisible}
        onRequestClose={() => {
          setKeyboardVisible(false);
          setAgastyaVisible(false);
        }}
      >
        <View style={styles.modalView}>
          <View style={{flexDirection: 'row',    justifyContent: 'space-around',}}>
        <TouchableOpacity onPress={handleKeyboardPress}>
            <Icon name="keyboard-o" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleStarPress}>
            <Icon name="star" size={30} color="#000" />
          </TouchableOpacity>
          </View>
          {isAgastyaVisible && (
            <View style={styles.agastyaOptions}>
              <Text style={styles.option}>Ask Agastya AI</Text>
              <TouchableOpacity onPress={() => handleSendRequest("Correct Grammar & Spelling")}>
                <Text style={styles.option}>Correct Grammar & Spelling</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSendRequest("Improve writing")}>
                <Text style={styles.option}>Improve writing</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSendRequest("Make it longer")}>
                <Text style={styles.option}>Make it longer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSendRequest("Make it shorter")}>
                <Text style={styles.option}>Make it shorter</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSendRequest("Summarize")}>
                <Text style={styles.option}>Summarize</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleSendRequest("Make a To-Do list")}>
                <Text style={styles.option}>Make a To-Do list</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>

      {responseText !== '' && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>{responseText}</Text>
          <TouchableOpacity onPress={() => setResponseText('')} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      )}
      
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  bodyInput: {
    flex: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    fontSize: 24,
  },
  agastyaOptions: {
    marginHorizontal:12,
    marginTop:10,
  },
  option: {
    paddingVertical: 8,
    fontSize: 16,
  },
  responseContainer: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginTop: 20,
  },
  responseText: {
    fontSize: 16,
  },
  clearButton: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: '#ff6347',
    padding: 8,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'white',
  },
});

export default App;
