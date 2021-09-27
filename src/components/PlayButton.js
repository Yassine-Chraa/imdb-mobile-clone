import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import {View, StyleSheet, TouchableWithoutFeedback, Text} from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {orange, white} from '../helpers/Color';

class PlayButton extends Component {
  state = {
    isModalShown: false,
    videos: [],
  };
  getVideos = () => {
    const {type, id} = this.props;
    fetch(
      `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=dcc997409325c8732c5e7c4a287a4536`,
      {
        method: 'GET',
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          videos: responseJson.results,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  componentDidMount = () => {
    this.getVideos();
  };
  toggleModal = () => {
    this.setState(prevState => ({isModalShown: !prevState.isModalShown}));
  };
  onPressPlay = (key) => {
    this.toggleModal();
    this.props.navigation.navigate('WebView', { key });
  };
  render() {
    return (
      <>
        <TouchableWithoutFeedback onPress={this.toggleModal}>
          <View style={styles.wrapper}>
            <Icon
              type='font-awesome'
              name="play"
              size={20}
              color={white}
              style={styles.icon}
            />
          </View>
        </TouchableWithoutFeedback>
        <Modal
          isVisible={this.state.isModalShown}
          style={{justifyContent: 'flex-end', margin: 0}}
          swipeDirection={'down'}
          onBackButtonPress={this.toggleModal}
          onBackdropPress={this.toggleModal}
          onSwipeComplete={this.toggleModal}>
          <View style={styles.modalStyle}>
            <View style={styles.bar} />
            <Text style={styles.videoText}>Videos</Text>
            {this.state.videos.map(item => (
              <View
                key={item.key}
                style={{
                  marginBottom: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: '80%'}}>
                  <Text
                    style={{fontFamily: 'Montserrat-Regular', fontSize: 14}}>
                    {item.name}
                  </Text>
                  <Text style={{fontFamily: 'Montserrat-Light', fontSize: 12}}>
                    {item.type}
                  </Text>
                </View>
                <TouchableWithoutFeedback
                  onPress={() => this.onPressPlay(item.key)}>
                  <View
                    style={{
                      alignSelf: 'flex-start',
                      borderRadius: 6,
                      overflow: 'hidden',
                    }}>
                    <Text style={styles.playText}>Play</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            ))}
          </View>
        </Modal>
      </>
    );
  }
}

PlayButton.propTypes = {
  videoData: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    right: 0,
    top: -30,
    marginRight: 32,
    borderRadius: 12,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    paddingHorizontal:30,
    paddingVertical:25
  },
  modalStyle: {
    backgroundColor: white,
    paddingHorizontal: 24,
    paddingTop: 0,
    paddingBottom: 48,
    minHeight: '40%',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },

  bar: {
    width: 40,
    height: 5,
    backgroundColor: orange,
    marginBottom: 24,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
  },

  playText: {
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'right',
    backgroundColor: orange,
    color: white,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 14,
  },

  videoText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 18,
    paddingBottom: 12,
  },
});
export default PlayButton;
