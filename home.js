import { StyleSheet, Text, View, Image, Pressable, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ipaddress } from './ipaddress';
import Bottomsheet1 from './addname';
import UpdateName from './updatename';

const Home = ({ navigation }) => {
    const [name, setName] = useState([]);
    const [uid, setUid] = useState(null);
    const [isBox, setIsBox] = useState(false);
    const [updateScreen, setUpdateScreen] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [showTextInput, setShowTextInput] = useState(false);


    // const [totalCredit, setTotalCredit] = useState([]);
    // const [totalDebit, setTotalDebit] = useState([]);
    // const [name_id, setName_id] = useState([])
    const [selectedId, setSelectedId] = useState(null);
    const [sumData, setsumData] = useState([]);


    const getid = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                setUid(value);
                console.log("UID retrieved and set:", value);
                fetch(`${ipaddress}/showuser/${value}`)
                    .then(res => res.json())
                    .then(data => {
                        setName(data.data);
                    })
                    .catch(error => {
                        console.error('Error fetching user data:', error);
                    });
            } else {
                console.log('ID not found');
            }
        } catch (error) {
            console.log("Error retrieving UID:", error);
        }
    };

    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            getid();
        });
        return () => {
            focusListener();
        };
    }, [navigation]);

    useEffect(() => {
        if (uid !== null) {


        }
    }, [uid]);



    useEffect(() => {
        const focusListener = navigation.addListener('focus', () => {
            getid();
        });
        return () => {
            focusListener();
        };
    }, [navigation]);


    const deleteName = async (id) => {
        const response = await fetch(`${ipaddress}/delete/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Item deleted successfully');
            fetch(`${ipaddress}/showuser/${uid}`)
                .then(res => res.json())
                .then(data => {
                    setName(data.data);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        } else {
            console.error('Failed to delete item:', response.statusText);
        }
    };

    const updateName = (id) => {
        setSelectedId(id);
        setUpdateScreen(true);
    };
    const closeUpdateScreen = () => {
        setUpdateScreen(false);
        fetch(`${ipaddress}/showuser/${uid}`)
            .then(res => res.json())
            .then(data => {
                setName(data.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    const boxclick = (id, name) => {
        navigation.navigate('pert', { name_id: id, name: name });
    };

    const showBottomSheet = () => {
        setIsBox(true);
    };

    const closeBottomSheet = () => {
        setIsBox(false);
        fetch(`${ipaddress}/showuser/${uid}`)
            .then(res => res.json())
            .then(data => {
                setName(data.data);
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };
    const toggleSearchInput = () => {
        setShowTextInput(prevState => !prevState);
        setSearchText('');
    };


    useEffect(() => {
        navigation.setOptions({
            title: 'Dashboard',
            headerTitleAlign: 'center',
            headerLeft: () => (
                <TouchableOpacity>
                    <Image source={require('./image/menu.png')} style={styles.menu} />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.searchIcon} onPress={toggleSearchInput}>
                        <Image
                            source={showTextInput ? require('./image/cross.jpg') : require('./image/sea.webp')}
                            style={styles.menuIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 15 }}>
                        <Image source={require('./image/more.png')} style={styles.menu} />
                    </TouchableOpacity>
                </View>
            ),
            headerStyle: {
                backgroundColor: 'white',
            },
        });
    }, [navigation]);

    return (
        <>
            <View style={styles.container}>
                {showTextInput && (
                    <TextInput
                        placeholder="Enter to search by name or amount"
                        value={searchText}
                        onChangeText={text => setSearchText(text)}
                        style={styles.searchInput}
                    />
                )}
                <ScrollView contentContainerStyle={styles.maincont}>
                    {name.map((item, index) => {

                        return (
                            <Pressable style={styles.box} onPress={() => boxclick(item._id, item.name)} key={index || item._id}>
                                <View style={{ flexDirection: 'column' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={styles.txtname}>{item.name}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row' }}>
                                            <Pressable onPress={() => updateName(item._id)}>
                                                <Image source={require('./image/edit.webp')} style={styles.icon} />
                                            </Pressable>
                                            <Pressable onPress={() => deleteName(item._id)}>
                                                <Image source={require('./image/delete.png')} style={styles.icon} />
                                            </Pressable>
                                        </View>
                                    </View>
                                    <View style={styles.summaryContainer}>
                                        <View style={styles.summaryRow}>
                                            <View style={styles.summaryBox}>
                                                <Text style={styles.summaryBoxText}>Credit(+)</Text>
                                                <Text style={styles.summaryBoxText}>{item.credit}</Text>
                                            </View>
                                            <View style={styles.summaryBox}>
                                                <Text style={styles.summaryBoxText}>Debit(-)</Text>
                                                <Text style={styles.summaryBoxText}>{item.debit}</Text>
                                            </View>
                                            <View style={styles.balanceBox}>
                                                <Text style={styles.balanceBoxText}>Balance</Text>
                                                <Text style={styles.balanceBoxText}>{item.credit - item.debit}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </Pressable>
                        );
                    })}
                </ScrollView>

                <Pressable style={styles.fab} onPress={showBottomSheet}>
                    <Image source={require('./image/fab2.png')} style={{ height: 60, width: 60 }} />
                </Pressable>
            </View>
            {isBox && <Bottomsheet1 onCancel={closeBottomSheet} />}
            {updateScreen && <UpdateName onCancel={closeUpdateScreen} id={selectedId} />}
        </>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        alignItems: 'center',
    },
    maincont: {
        flexGrow: 1,
    },
    txtname: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 7,
    },
    menu: {
        height: 25,
        width: 25,
    },
    box: {
        width: 320,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 5,
        shadowColor: 'black',
        elevation: 10,
        marginBottom: 20,
    },
    fab: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        shadowColor: 'black',
        borderRadius: 30,
        padding: 15,
    },
    icon: {
        height: 30,
        width: 30,
        marginRight: 10,
    },
    summaryContainer: {
        // paddingHorizontal: 20,
        marginTop: 20,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',

    },
    summaryBox: {
        alignItems: 'center',
        backgroundColor: 'grey',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    summaryBoxText: {
        color: '#6d21bf',
        fontWeight: 'bold',
    },
    menuIcon: {
        height: 25,
        width: 25,
    },
    searchIcon: {
        marginLeft: 15,
    },
    moreIcon: {
        marginLeft: 15,
    },
    balanceBox: {
        alignItems: 'center',
        backgroundColor: '#6d21bf',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    balanceBoxText: {
        color: 'white',
        fontWeight: 'bold',
    },

    searchInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        width: "90%"
    },
});
