import React, { Component } from 'react';
import { Text, View, StyleSheet, ImageEditor, TouchableOpacity, Image } from 'react-native';
import { ImagePicker } from 'expo';

export default class ImgPicker extends Component {
  state = {
    image: null,
  }
  pickImage = () => {
    // open the camera roll
    ImagePicker.launchImageLibraryAsync({
      allowEditing: true,
      aspect: [2, 1], // aspect ratio
    }).then((result) => {
      if (result.cancelled) {
        return
      }
      // crop the selected image
      ImageEditor.cropImage(
      result.uri, // first we pass the image that will be cropped
      { // second we pass its settings
          offset: { x: 0, y: 0 },
          size: { width: result.width, height: result.height },
          displaySize: { width: 200, height: 100 },
          resizeMode: 'contain',
      },
      (uri) => this.setState(() => ({ image: uri })), // third we pass the successfull function
      () => console.log('Error')); // fourth we pass the erro function
    });
  }
  render() {
    const { image } = this.state;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.pickImage}>
          <Text>Open Camera Roll</Text>
        </TouchableOpacity>

        {image && (
          <Image style={styles.img} source={{ uri: image }} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    backgroundColor: 'black',
  }
});