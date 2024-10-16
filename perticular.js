import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Pressable, TextInput } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import Bottomsheet from './bottomsheet';
import { ipaddress } from './ipaddress';
import Updaterecord from './updaterecord';

const Perti = ({ navigation, route }) => {
  const { name_id, name } = route.params;
  const [isBox, setIsBox] = useState(false);
  const [showTextInput, setShowTextInput] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [records, setRecords] = useState([]);
  const [totalCredit, setTotalCredit] = useState(0);
  const [totalDebit, setTotalDebit] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [updateScr, setUpdateScr] = useState(false);
  const [tId, setTid] = useState(null);
  const [sumdata, setSumdata] = useState([])


  useEffect(() => {
    fetch(`${ipaddress}/find/${name_id}`)
      .then(res => res.json())
      .then(data => {
        setRecords(data.data);
      });
  }, [name_id]);

  useEffect(() => {
    let creditTotal = 0;
    let debitTotal = 0;

    records.forEach(record => {
      if (record.t_type && record.t_amt !== undefined) {
        if (record.t_type.toLowerCase() === 'credit') {
          creditTotal += record.t_amt;
        } else if (record.t_type.toLowerCase() === 'debit') {
          debitTotal += record.t_amt;
        }
      }
    });

    setTotalCredit(creditTotal);
    setTotalDebit(debitTotal);
  }, [records]); 


  const updatecreditdebit = async () => {
    if (totalCredit !== 0 || totalDebit !== 0) {
      fetch(`${ipaddress}/update/${name_id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          credit: totalCredit,
          debit: totalDebit,
        }),
      })
        .then(res => res.json())
        .then(data => console.log('Update Response:', data))
        .catch(err => console.error('Error updating sum record:', err));
    }
  }
  useEffect(() => {
    updatecreditdebit();
  }, [totalCredit, totalDebit]);


  const show = () => setIsBox(true);

  const closeBottomsheet = () => {


    updatecreditdebit();
    setIsBox(false);
    setUpdateScr(false)
    setSelectedRow(null);

    fetch(`${ipaddress}/find/${name_id}`)
      .then(res => res.json())
      .then(data => setRecords(data.data));
  };

  // Toggle search bar visibility
  const toggleSearchInput = () => {
    setShowTextInput(prevState => !prevState);
    setSearchText('');
  };

  // Toggle the selected row for showing Add/Cancel buttons
  const toggleRow = (index) => {
    setSelectedRow((prevIndex) => (prevIndex === index ? null : index));
  };

  // Close the button row without removing the record
  const handleCancel = async (id) => {
    try {
      const response = await fetch(`${ipaddress}/tdelete/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        console.log('Record deleted successfully');
        // Fetch updated records and update state
        fetch(`${ipaddress}/find/${name_id}`)
          .then(res => res.json())
          .then(data => {
            setRecords(data.data); // Update state with new records
          })
          .catch(error => {
            console.error('Error fetching user data:', error);
          });
      } else {
        console.error('Failed to delete item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };


  const updatescreen = (id) => {
    setUpdateScr(true);
    setTid(id)
  }

  // const offupdatescreen=()=>{
  //   setUpdateScr(false);
  // }
  // Filter records based on search text
  const filteredRecords = records.filter(record =>
    (record.t_particular && record.t_particular.toLowerCase().includes(searchText.toLowerCase())) ||
    (record.t_amt !== undefined && record.t_amt.toString().includes(searchText))
  );



  // Update the header options
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTitleAlign: 'center',
      headerLeft: () => (
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity>
            <Image source={require('./image/menu.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <Text style={styles.headerTitleText}>{name}</Text>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity onPress={show}>
            <Image source={require('./image/plus.png')} style={styles.menuIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchIcon} onPress={toggleSearchInput}>
            <Image
              source={showTextInput ? require('./image/cross.jpg') : require('./image/sea.webp')}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.moreIcon}>
            <Image source={require('./image/more.png')} style={styles.menuIcon} />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#6d21bf',
      },
    });
  }, [navigation, showTextInput]);

  return (
    <>
      <View style={styles.mainContainer}>
        {showTextInput && (
          <TextInput
            placeholder="Enter to search by name or amount"
            value={searchText}
            onChangeText={text => setSearchText(text)}
            style={styles.searchInput}
          />
        )}
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Date</Text>
          <Text style={styles.headerText}>Particular</Text>
          <Text style={styles.headerText}>Credit(₹)</Text>
          <Text style={styles.headerText}>Debit(₹)</Text>
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {filteredRecords.length > 0 ? (
            filteredRecords.map((record, index) => (
              <View key={record._id}>
                <Pressable style={styles.recordRow} onPress={() => toggleRow(index)}>
                  <View style={styles.recordRowInner}>
                    <Text style={[styles.cell, record.t_type.toLowerCase() === 'credit' ? styles.creditText : styles.debitText]}>{record.t_date}</Text>
                    <Text style={[styles.cell, record.t_type.toLowerCase() === 'credit' ? styles.creditText : styles.debitText]}>{record.t_particular}</Text>
                    <Text style={[styles.cell, record.t_type.toLowerCase() === 'credit' ? styles.creditText : null]}>
                      {record.t_type.toLowerCase() === 'credit' ? record.t_amt : '---'}
                    </Text>
                    <Text style={[styles.cell, record.t_type.toLowerCase() === 'debit' ? styles.debitText : null]}>
                      {record.t_type.toLowerCase() === 'debit' ? record.t_amt : '---'}
                    </Text>
                  </View>
                </Pressable>
                {selectedRow === index && (
                  <View style={styles.buttonContainer}>
                    <Pressable style={styles.cancelButton} onPress={() => handleCancel(record._id)}>
                      <Text style={styles.cancelButtonText}>Delete</Text>
                    </Pressable>
                    <Pressable style={styles.addButton} onPress={() => updatescreen(record._id)}>
                      <Text style={styles.addButtonText}>Update</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            ))
          ) : (
            <Text style={styles.noRecordsText}>No records found</Text>
          )}
        </ScrollView>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryBoxText}>Credit(+)</Text>
              <Text style={styles.summaryBoxText}>{totalCredit}</Text>
            </View>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryBoxText}>Debit(-)</Text>
              <Text style={styles.summaryBoxText}>{totalDebit}</Text>
            </View>
            <View style={styles.balanceBox}>
              <Text style={styles.balanceBoxText}>Balance</Text>
              <Text style={styles.balanceBoxText}>{totalCredit - totalDebit}</Text>
            </View>
          </View>
        </View>
      </View>
      {isBox && <Bottomsheet onCancel={closeBottomsheet} id={name_id} />}
      {updateScr && <Updaterecord onCancel={closeBottomsheet} id={tId} />}
    </>
  );
};

export default Perti;

const styles = StyleSheet.create({
  // Header styles
  headerLeftContainer: {
    flexDirection: 'row',
  },
  headerRightContainer: {
    flexDirection: 'row',
  },
  headerTitleText: {
    marginLeft: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
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

  // Main container and search bar
  mainContainer: {
    flex: 1,
    paddingBottom: '18%',
  },
  searchInput: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  // Record and row styles
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#6d21bf',
  },
  recordRow: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  recordRowInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
  },
  cell: {
    textAlign: 'center',
    width: '25%',
    fontSize: 14,
  },
  creditText: {
    color: 'green',
  },
  debitText: {
    color: 'red',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
  },
  cancelButton: {
    borderRadius: 20,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'red',
  },
  cancelButtonText: {
    color: 'red',
  },
  addButton: {
    borderRadius: 20,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'green',
  },
  addButtonText: {
    color: 'green',
  },

  // No records found message
  noRecordsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#6d21bf',
  },

  // Summary styles
  summaryContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryBox: {
    alignItems: 'center',
  },
  summaryBoxText: {
    color: '#6d21bf',
    fontWeight: 'bold',
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
});
