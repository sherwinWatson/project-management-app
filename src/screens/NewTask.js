import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleProvider, Container, Button, Content, Form, Item, Label, Input, Picker, Icon, List, Thumbnail } from 'native-base'
import theme from './../styles/theme'
import color from './../styles/color'
import margin from './../styles/margin'
import { headerConfig } from '../config/headerConfig';
import moment from 'moment';
import { Text, View, Alert, TouchableOpacity, FlatList } from 'react-native';
import { addTask, getOneSection } from '../redux/storyboard/actions';
import LoadingView from '../components/LoadingView';
import { Map } from 'immutable'
import CalendarPicker from 'react-native-calendar-picker';
import IconDropdown from '../img/IconDropdown'
import DialogView from './../components/DialogView'

class NewTask extends Component {
  static navigationOptions = headerConfig('', true);

  constructor(props) {
    super(props)
    this.state = {
      datePickerVisible: false,
      selectedDate: 1,
      name: '',
      startDate: moment(),
      finishDate: moment().add(1, 'month'),
      status: 'start',
      selectedUsers: [],
      member: [],
    }
    this.handleUserSelected.bind(this)
  }

  componentWillMount(){
    const { task, users } = this.props.navigation.state.params ? this.props.navigation.state.params : { task: null, users: [] }
  
    console.log('component will mount')
    console.log(task.start_date)

    
    if (task) {
      this.setState({ 
        name: task.name, 
        // startDate: start_date,
        // finishDate: finish_date,
        status: task.status,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { error, task, refreshing, navigation, section } = this.props

    //CEK ERROR AND DISPLAY IT
    if (nextProps.error !== error) {
      if (nextProps.error && nextProps.error.message) {
        if (nextProps.error && nextProps.error.response && nextProps.error.response.data && nextProps.error.response.data.errors) {
          const key = Object.keys(nextProps.error.response.data.errors)[0];
          const message = nextProps.error.response.data.errors[key][0];
          Alert.alert( 'Cannot create Task', message)
        } else {
          Alert.alert( 'Cannot create Task', nextProps.error.message)
        }
      }
    }

    if (!nextProps.refreshing && !nextProps.error) {
      // if success
      navigation.goBack(null)
      navigation.state.params.updateTask({ task: nextProps.task  });
    }
  }

  render() {
    const { navigation, dispatchAddTask, task, error, refreshing } = this.props
    const { sectionId, sectionUsers } = navigation.state.params
    const { containerStyle, formStyle, listItemStyle, listStyle, userStyles, footerMenuStyle, thumbnailStyle, listSelectedStyle, labelStyle }  = styles
    const { name, startDate, finishDate, status, selectedUsers, member, selectedDate, datePickerVisible } = this.state

    const getThumbnail = (item) => {
      return item.imageUrl
        ? { uri: item.imageUrl }
        : require('./../img/no_avatar.png')
    }

    // const renderSelectedUser = () => {
      
    // }

    // const renderRowAvailableUser = (data, s, index) => {
    //   return (
    //     <ListItem 
    //       style={{ margin: margin.s12, borderBottomColor: color.darkText }} 
    //       onPress={() => {
    //         this.setState({member: [...member, {...data}]})
    //         const newValues2 = sectionUsers.slice(parseInt(index, 10) + 1)
    //         const newValues1 = sectionUsers.slice(0, parseInt(index, 10))
    //         sectionUsers = newValues1.concat(newValues2)
    //       }} 
    //       avatar>
    //       <Left>
    //         <Thumbnail small source={getThumbnail(data)} />
    //       </Left>
    //       <View style={{
    //         flexDirection: 'row',
    //         flexShrink: 1,
    //         justifyContent: 'space-between',
    //         marginLeft: 10,
    //       }}>
    //         <Body style = {{
    //           flexShrink: 1,
    //           justifyContent: 'space-between'
    //         }}>
    //           <Text style={{ 
    //             fontSize: 21,
    //             marginBottom: margin.s8,
    //             alignSelf: 'flex-start', 
    //           }}>{data.name}</Text>
    //         </Body>
    //       </View>
    //     </ListItem>
    //   )
    // }

    // const renderAvailableUser = () => {
    //   <List
    //     contentContainerStyle={{ flexGrow: 1 }}
    //     removeClippedSubviews={false}
    //     dataArray={sectionUsers}
    //     renderRow={renderRowAvailableUser}
    //   />
    // }

    const handleButtonFinish = () => {
      if (moment(startDate.toISOString()).isAfter(moment(finishDate.toISOString()))) {
        this.dialog._show(null, 'Start date must earlier than end date')
      } else { 
        dispatchAddTask(sectionId, name, startDate, finishDate, status, member);        
      }
    }

    return (
      <StyleProvider style={theme}>
        <Container style={containerStyle}>
          <LoadingView isShown={refreshing} noBack isModal={false} />
          <DialogView  ref={(ref) => {this.dialog = ref}}/>
          <Content contentContainerStyle={{ flexGrow: 1 }} >
            <Form style={formStyle}>

              <View style={listStyle}>
                <Text>Task Name</Text>
                <Input style={{fontSize: 18}} value={name} onChangeText={(name) => this.setState({name})}/>
              </View>

              <View style={listStyle}>
                <View style={{flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text>Start Date</Text>
                    <TouchableOpacity style={styles.dateInput} onPress={() => {
                      this.setState({
                        datePickerVisible: true,
                        selectedDate: 1,
                      })
                    }}>
                      <Text>{startDate.format('DD MMM YYYY')}</Text>
                      <IconDropdown color={color.space_grey}/>
                    </TouchableOpacity>
                  </View>
                  <View style={{width: margin.s8}}/>
                  <View style={{ flex: 1 }}>
                    <Text>End Date</Text>
                    <TouchableOpacity style={styles.dateInput} onPress={() => {
                      this.setState({
                        datePickerVisible: true,
                        selectedDate: 2,
                      })
                    }}>
                      <Text>{finishDate.format('DD MMM YYYY')}</Text>
                      <IconDropdown color={color.space_grey}/>
                    </TouchableOpacity>
                  </View>
                  
                </View>
              </View>

              <View style={listItemStyle}>
                <Text>Status</Text>
                <Picker
                  mode="dropdown"
                  iosHeader="pilih jenis kelamin"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={{ width: undefined }}
                  selectedValue={status}
                  onValueChange={status => this.setState({status})}
                >
                  <Picker.Item label="START" value="start" />
                  <Picker.Item label="INPROGRESS" value="inprogress" />
                  <Picker.Item label="DONE" value="done" />
                </Picker>
              </View>

              <View style={{margin: margin.s16}}>
                <Text>Choose Person</Text>
                {renderSelectedUser()}
                {renderAvailableUser()}
              </View>
            </Form>

            <View style={footerMenuStyle}>
              <Button
                transparent onPress={() => navigation.goBack(null)}>
                <Text style={{fontSize: 18, color: color.green}}>CANCEL</Text>
              </Button>
              <Button
                transparent onPress={() => handleButtonFinish() }>
                <Text style={{fontSize: 18, color: color.green}}>FINISH</Text>
              </Button>
            </View>
            
            {
              datePickerVisible &&
              <CalendarPicker
                onDateChange={(date) => {
                  if (selectedDate === 1) {
                    this.setState({
                      startDate: date,
                      datePickerVisible: false,
                    })
                  } else {
                    this.setState({
                      finishDate: date,
                      datePickerVisible: false,
                    })
                  }
                }}
                minDate={selectedDate !== 1 ? moment(startDate.toISOString()) : moment()}
              />
            }

          </Content>
        </Container>
      </StyleProvider>
    )
  }
}

const styles = {
  containerStyle: {
    backgroundColor: color.white,
  },
  formStyle: {
    marginHorizontal: margin.s12
  },
  userStyles: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.black,
    margin: margin.s16,
    flex: 1
  },
  listItemStyle: {
    borderBottomWidth: 1,
    borderColor: color.border,
    marginHorizontal: margin.s16,
    marginVertical: margin.s8,
    height: 80
  },
  listStyle: {
    marginHorizontal: margin.s16,
    marginVertical: margin.s8,
    height: 80
  },
  footerMenuStyle:{
    margin: margin.s16,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  listSelectedStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: margin.s8
  },
  thumbnailStyle: {
    width: 50,
    height: 50,
    margin: margin.s4
  },
  dateInput: {
    paddingHorizontal: margin.s8,
    marginTop: margin.s8,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: margin.s8,
    borderColor: color.green,
    flexDirection: 'row',
  },
  labelStyle: {
    color: color.green,
  },
};

const mapStateToProps = (state) => ({
  task: state.storyboard.addTask.result.data,
  refreshing: state.storyboard.addTask.refreshing,
  error: state.storyboard.addTask.error,
  section: state.storyboard.getOneSection.result.data,
});

const mapDispatchToProps = (dispatch, props) => ({
  dispatchAddTask(sectionId, name, startDate, finishDate, status, member) {
    dispatch(addTask(sectionId, name, startDate, finishDate, status, member))
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTask);