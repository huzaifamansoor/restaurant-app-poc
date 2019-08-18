import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text
} from "native-base";
import styles from './Styles/HeaderBarStyle';



export default class HeaderBar extends Component {
  constructor(props){
    super(props);

  }

  render() {
    return (
      <Header>
        <Left>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Resturant App</Title>
        </Body>
        <Right>
          <Button transparent onPress={() => this.props.navigation.goBack()}>
          {/* <Button transparent onPress={() => this.setState({modalVisible: true})}> */}
            <Icon name="menu" />
          </Button>
        </Right>
      </Header>      
    );
  }
}
