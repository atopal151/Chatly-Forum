import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemCard from '../component/ItemCard';
import { withNavigation } from '@react-navigation/compat';
import UserStore from '../component/UserStore';


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchVisible: false,
            searchQuery: '',
            filteredItemCardData: []
        };
    }

    handleSearchButtonPress = () => {
        const { searchVisible } = this.state;
        this.setState({
            searchVisible: !searchVisible,
            searchQuery: ''
        });
    };

    handleSearchQueryChange = (text) => {
        const { itemCardData } = this.props;
        const filteredData = itemCardData.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));
        this.setState({
            searchQuery: text,
            filteredItemCardData: filteredData
        });
    };

    render() {
        const itemCardData = [
            {
                title: "Yeni Ürün Lansmanı",
                description: "Son ürünümüz, benzersiz özellikleriyle dikkat çekiyor.",
                image: "https://img.freepik.com/free-vector/abstract-badge-design-purple_53876-34936.jpg?size=626&ext=jpg&ga=GA1.1.1931602112.1687200178&semt=sph",
                onPress: () => { console.log("ddd"); }
            },
            {
                title: "Kampanya Fırsatları",
                description: "Sınırlı süreli indirimlerle avantajlı alışveriş yapın.",
                image: "https://img.freepik.com/free-vector/abstract-badge-design-purple_53876-34936.jpg?size=626&ext=jpg&ga=GA1.1.1931602112.1687200178&semt=sph",
                onPress: () => { console.log("ddd"); }
            },
            {
                title: "Yeni Özellikler Keşfedin",
                description: "Ürünümüzün güncellemesiyle gelen yeni özellikleri deneyin.",
                image: "https://img.freepik.com/free-vector/abstract-badge-design-purple_53876-34936.jpg?size=626&ext=jpg&ga=GA1.1.1931602112.1687200178&semt=sph",
                onPress: () => { console.log("ddd"); }
            },
            {
                title: "Önerilen Ürünler",
                description: "Kişiselleştirilmiş önerilerimizi keşfedin ve en iyi ürünleri bulun.",
                image: "https://img.freepik.com/free-vector/abstract-badge-design-purple_53876-34936.jpg?size=626&ext=jpg&ga=GA1.1.1931602112.1687200178&semt=sph",
                onPress: () => { console.log("ddd"); }
            },
            {
                title: "Kullanıcı Yorumları",
                description: "Müşterilerimizin deneyimlerini okuyun ve ürünümüz hakkında daha fazla bilgi edinin.",
                image: "https://img.freepik.com/free-vector/abstract-badge-design-purple_53876-34936.jpg?size=626&ext=jpg&ga=GA1.1.1931602112.1687200178&semt=sph",
                onPress: () => { console.log("ddd"); }
            }
        ];
        const { searchVisible, searchQuery, filteredItemCardData } = this.state;
        const { navigation } = this.props;
        const displayedItemCardData = searchQuery ? filteredItemCardData : itemCardData;
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
                        <Text style={styles.userTitle} ellipsizeMode="tail" numberOfLines={1}>Hoşgeldin {<Text style={{fontWeight:700}} >{UserStore.user}</Text>
                    }</Text>
                        )}
                    <TouchableOpacity style={styles.searchButton} onPress={this.handleSearchButtonPress}>
                        <Icon name="search" size={24} color="#888" style={styles.searchIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddForum')}>
                        <Icon name="add" size={24} color="#fff" style={styles.addIcon} />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal
                    contentContainerStyle={styles.categoriesContainer}
                    showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Elektronik</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Moda</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Ev & Yaşam</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Spor & Fitness</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Kitaplar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Oyun & Eğlence</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Güzellik & Bakım</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Müzik & Film</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Yiyecek & İçecek</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryButton}>
                        <Text style={styles.categoryText}>Otomotiv</Text>
                    </TouchableOpacity>
                </ScrollView>
                <View style={styles.body}>
                    <ScrollView>
                        {displayedItemCardData.map((item, index) => (
                            <ItemCard
                                key={index}
                                title={item.title}
                                description={item.description}
                                image={item.image}
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
        backgroundColor: 'blue',
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
        fontSize:15,
        maxWidth: 200, overflow: 'hidden' 
    }
});

export default withNavigation(HomeScreen);


