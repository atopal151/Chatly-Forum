import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ItemCard = ({ title, description, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: 120,
    borderRadius: 10,
    backgroundColor: '#fff',
    margin: 10,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    borderBottomRightRadius:90,
    margin:10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"black",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#888',
  },
});

export default ItemCard;
