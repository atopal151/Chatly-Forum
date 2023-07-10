import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { withNavigation } from '@react-navigation/compat';
import firestore from "@react-native-firebase/firestore";
import ItemCard from '../component/ItemCard';
import UserStore from '../component/UserStore';



class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchVisible: false,
            searchQuery: '',
            forumData: [],
            filteredItemCardData: []
        };
    }

    handleSearchButtonPress = () => { //arama butonu görünürlüğünü aktif-pasif yapar
        const { searchVisible } = this.state;
        this.setState({
            searchVisible: !searchVisible,
            searchQuery: ''
        });
    };

    handleSearchQueryChange = (text) => { //arama yapılacak metni yazdığımız andan itibaren filtre uygular
        const { forumData } = this.state;
        const filteredData = forumData.filter(item =>
            item.title.toLowerCase().includes(text.toLowerCase()));
        this.setState({
            searchQuery: text,
            filteredItemCardData: filteredData
        });
    };


    loadForumData = () => { //paylaşılmış olan forum verilerini getiren fonksiyon
        firestore()
            .collection('forum')
            .orderBy('createdAt', 'asc')
            .onSnapshot((snapshot) => {
                const forumData = snapshot.docs.map(doc => doc.data()).reverse();
                this.setState({ forumData });
                console.log(forumData);
            }, (error) => {
                console.log('Error loading forum data:', error);
            });
    };

    handleCategoryFilter = (category) => { //kategorilere göre filtreler
        if (category === 'Tümü') {
            this.loadForumData();
            this.setState({
                searchQuery: '',
                filteredItemCardData: []
            });
        } else {
            const { forumData } = this.state;
            const filteredData = forumData.filter(item =>
                item.categories && item.categories.includes(category));
            this.setState({
                searchQuery: category,
                filteredItemCardData: filteredData
            });
        }
    };


    componentDidMount() { //ilk sayfa yüklenince verileri çeker
        this.loadForumData();
    }


    render() {
        const { searchVisible, searchQuery, filteredItemCardData, forumData } = this.state;
        const { navigation } = this.props;
        const displayedItemCardData = searchQuery ? filteredItemCardData : forumData;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../../assets/pp.png')} style={styles.logo} />
                    {searchVisible && (
                        <TextInput
                            style={styles.input}
                            placeholder="Arama yapın..."
                            placeholderTextColor="#888"
                            value={searchQuery}
                            onChangeText={this.handleSearchQueryChange}
                            onBlur={() => this.setState({ searchVisible: false })}
                        />
                    )}
                    {!searchVisible && (
                        <Text style={styles.userTitle} ellipsizeMode="tail"
                            numberOfLines={1}>Hoşgeldin {
                                <Text style={{ fontWeight: 700 }} >{UserStore.user}</Text>
                            }</Text>
                    )}
                    <TouchableOpacity style={styles.searchButton}
                        onPress={this.handleSearchButtonPress}>
                        <Icon name="search" size={24} color="#888" style={styles.searchIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addButton}
                        onPress={() => navigation.navigate('AddForum')}>
                        <Icon name="add" size={24} color="#fff" style={styles.addIcon} />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal
                    contentContainerStyle={styles.categoriesContainer}
                    showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Tümü')}>
                        <Text style={styles.categoryText}>Tümü</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Teknoloji')}>
                        <Text style={styles.categoryText}>Teknoloji</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Spor')}>
                        <Text style={styles.categoryText}>Spor</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Moda')}>
                        <Text style={styles.categoryText}>Moda</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Yemek')}>
                        <Text style={styles.categoryText}>Yemek</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Seyahat')}>
                        <Text style={styles.categoryText}>Seyahat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Müzik')}>
                        <Text style={styles.categoryText}>Müzik</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Evcil Hayvanlar')}>
                        <Text style={styles.categoryText}>Evcil Hayvanlar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Sağlık ve Fitness')}>
                        <Text style={styles.categoryText}>Sağlık ve Fitness</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Oyunlar')}>
                        <Text style={styles.categoryText}>Oyunlar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Film ve Dizi')}>
                        <Text style={styles.categoryText}>Film ve Dizi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Kitaplar')}>
                        <Text style={styles.categoryText}>Kitaplar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Sanat')}>
                        <Text style={styles.categoryText}>Sanat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Güzellik')}>
                        <Text style={styles.categoryText}>Güzellik</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Eğitim')}>
                        <Text style={styles.categoryText}>Eğitim</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Finans')}>
                        <Text style={styles.categoryText}>Finans</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Otomobil')}>
                        <Text style={styles.categoryText}>Otomobil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Yazılım')}>
                        <Text style={styles.categoryText}>Yazılım</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Fotoğrafçılık')}>
                        <Text style={styles.categoryText}>Fotoğrafçılık</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Yoga')}>
                        <Text style={styles.categoryText}>Yoga</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}
                        onPress={() => this.handleCategoryFilter('Bahçe')}>
                        <Text style={styles.categoryText}>Bahçe</Text>
                    </TouchableOpacity>

                </ScrollView>
                <View style={styles.body}>
                    <ScrollView>
                        {displayedItemCardData.map((item, index) => (
                            <ItemCard
                                key={index}
                                title={item.title}
                                description={item.description}
                                onPress={() =>
                                    navigation.navigate('ForumDetail', {
                                        itemTitle: item.title,
                                        itemDescription: item.description,
                                    })}
                            />
                        ))}
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
        paddingBottom: 20,
        borderBottomColor: '#888',
        width: '100%',
    },
    body: {
        flex: 25,
        margin: 5
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 15,
        padding: 10,
        width: "40%",
    },
    searchButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    searchIcon: {
        marginRight: 10,
    },
    logo: {
        width: 50,
        height: 50,
        alignSelf: 'flex-end',
    },
    categoriesContainer: {
        marginTop: 20,
        paddingHorizontal: 10,
    },
    categoryButton: {
        backgroundColor: '#eaeaea',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#888',
    },
    addButton: {
        borderRadius: 50,
        backgroundColor: "#d6afee",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addIcon: {
        marginRight: 0,
    },
    userTitle: {
        fontSize: 15,
        maxWidth: 200, overflow: 'hidden'
    }
});

export default withNavigation(HomeScreen);


