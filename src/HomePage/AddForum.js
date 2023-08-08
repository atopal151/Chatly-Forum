import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert
} from 'react-native';
import firestore from "@react-native-firebase/firestore"
import auth from "@react-native-firebase/auth"

export default class AddForum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      titletext: '',
      descriptiontext: '',
      categories: [
        { id: 1, name: 'Teknoloji', checked: false },
        { id: 2, name: 'Spor', checked: false },
        { id: 3, name: 'Moda', checked: false },
        { id: 4, name: 'Yemek', checked: false },
        { id: 5, name: 'Seyahat', checked: false },
        { id: 6, name: 'Müzik', checked: false },
        { id: 7, name: 'Evcil Hayvanlar', checked: false },
        { id: 8, name: 'Sağlık ve Fitness', checked: false },
        { id: 9, name: 'Oyunlar', checked: false },
        { id: 10, name: 'Film ve Dizi', checked: false },
        { id: 11, name: 'Kitaplar', checked: false },
        { id: 12, name: 'Sanat', checked: false },
        { id: 13, name: 'Güzellik', checked: false },
        { id: 14, name: 'Eğitim', checked: false },
        { id: 15, name: 'Finans', checked: false },
        { id: 16, name: 'Otomobil', checked: false },
        { id: 17, name: 'Yazılım', checked: false },
        { id: 18, name: 'Fotoğrafçılık', checked: false },
        { id: 19, name: 'Yoga', checked: false },
        { id: 20, name: 'Bahçe', checked: false },
        // Daha fazla kategori eklenebilir
      ],

    };
  }

  handleCategoryToggle = (categoryId) => {
    const { categories } = this.state;
    const updatedCategories = categories.map((category) =>
      category.id === categoryId ? { ...category, checked: !category.checked } : category
    );
    this.setState({ categories: updatedCategories });
  };

  render() {
    const { titletext, descriptiontext, categories } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ margin: 15 }}>
          <Text style={{ fontSize: 15, fontWeight: 700, }}>
            {<Text style={{ color: "#8232E9" }}>Forum</Text>}'da bir tartışma konusu başlat...
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Konu başlığı"
            placeholderTextColor="#888"
            value={titletext}
            onChangeText={(titletext) => this.setState({ titletext })}
          />
        </View>
        <View style={styles.inputContainer2}>
          <TextInput
            style={styles.input}
            placeholder="Açıklama"
            placeholderTextColor="#888"
            value={descriptiontext}
            multiline={true}
            numberOfLines={14}
            onChangeText={(descriptiontext) => this.setState({ descriptiontext })}
          />
        </View>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <View key={category.id} style={styles.categoryItem}>
              <Switch
                value={category.checked}
                onValueChange={() => this.handleCategoryToggle(category.id)}
                thumbColor={category.checked ? '#8232E9' : '#8232E9'}
                trackColor={{ false: 'grey.100', true: '#d6afee' }}
              />
              <Text style={{ marginLeft: 5 }}>{category.name}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.categoryButton} onPress={() => {
          const selectedCategories = categories.filter((category) => category.checked);
          const categoryNames = selectedCategories.map((category) => category.name);

          firestore()
            .collection('forum')
            .add({
              title: titletext,
              description: descriptiontext,
              categories: categoryNames,
              shareUser: auth().currentUser.uid,
              createdAt: firestore.FieldValue.serverTimestamp()
            })
            .then((docRef) => {
              const docId = docRef.id; // Yeni oluşturulan belgenin doc.id değerini alır
              firestore().collection('forum').doc(docId).update({
                savedDocId: docId
              }).then(() => {
                Alert.alert(
                  'Uyarı!',
                  'Paylaşımın alındı. Teşekkürler...',
                  [
                    { text: 'Tamam', onPress: () => { this.props.navigation.goBack() } }
                  ],
                  { cancelable: false }
                );
              }).catch((error) => {
                console.log('Error saving docId:', error);
              });
            })
            .catch((error) => {
              console.log('Error creating document:', error);
            });


        }}>
          <Text style={styles.categoryText}>Paylaş</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  categoryButton: {
    backgroundColor: '#8232E9',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20
  },
  categoryText: {
    fontSize: 15,
    color: "white",
    margin: 10,
    fontWeight: "bold"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    margin: 10,
    borderRadius: 30,
    borderColor: 'grey',
    paddingHorizontal: 20,
  },
  inputContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    margin: 10,
    borderRadius: 30,
    borderColor: 'grey',
    paddingHorizontal: 20,
    height: 70
  },
  input: {
    flex: 1,
    height: 40,
    margin: 10,
    color: '#333',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 10,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
});
