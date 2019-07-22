import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Icon, Container, Content, List, ListItem, Body, Right, Badge, Thumbnail, Text, Footer, FooterTab, Button, View } from 'native-base';
import { string } from '../../locales/i18n'
import listtour from './ListTourController'
import HomeController from './../home/HomeController';

export default class ListTour extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataList: [],
            pushChatAll: [],
            pushChatAllInfo: [],
            pushChatIcon: 0,
            pushInfo: [],
            pushChatInfo: [],
            pushChatTip: [],
            pushChatTourGroup: [],
            pushChatTour: [],
            pushChatGroupDetail: [],
            pushChatPrivateAll: [],
            pushChatPrivateDetail: [],
            pushChatPrivateGuide: [],
        };
        this.db =  new HomeController();
        let listUser = this.db.getList().then((result)=>{
           console.log("result",result);
        });
        console.log("listUser",listUser);
    }
    async componentWillMount() {
        let data = await listtour.getList(this.props.companyid, this.props.id, this.props.password);
        let pushChatAll = [];
        let pushChatAllInfo = [];
        // let pushChatIcon = 0;
        let pushInfo = [];
        let pushChatInfo = [];
        let pushChatTip = [];
        let pushChatTourGroup = [];
        let pushChatTour = [];
        let pushChatGroupDetail = [];
        let pushChatPrivateAll = [];
        let pushChatPrivateDetail = [];
        let pushChatPrivateGuide = [];
        if (data.status) {
            this.setState({
                dataList: data.tours,
            })
            let unreadGuides = JSON.parse(this.props.unreadsum);
            if (unreadGuides) {
                for (i in unreadGuides) {
                    unreadGuide = unreadGuides[i];
                    if (unreadGuide.chatAll) {
                        pushChatAll[i] = unreadGuide.chatAll;
                    }
                    if (unreadGuide.chatAllInfo) {
                        pushChatAllInfo[i] = unreadGuide.chatAllInfo;
                        // $rootScope.pushChatIcon = $rootScope.pushChatIcon + unreadGuide.chatAllInfo;
                    }
                    if (unreadGuide.info) {
                        pushInfo[i] = unreadGuide.info;
                    }
                    if (unreadGuide.chatInfo) {
                        pushChatInfo[i] = unreadGuide.chatInfo;
                    }
                    if (unreadGuide.chatTip) {
                        pushChatTip[i] = unreadGuide.chatTip;
                    }
                    if (unreadGuide.chatTourGroup) {
                        pushChatTourGroup[i] = unreadGuide.chatTourGroup;
                    }
                    if (unreadGuide.chatTour) {
                        pushChatTour[i] = unreadGuide.chatTour;
                    }
                    if (unreadGuide.chatGroupDetail) {
                        pushChatGroupDetail[i] = unreadGuide.chatGroupDetail;
                    }
                    if (unreadGuide.chatPrivateAll) {
                        pushChatPrivateAll[i] = unreadGuide.chatPrivateAll;
                    }
                    if (unreadGuide.chatPrivateDetail) {
                        pushChatPrivateDetail[i] = unreadGuide.chatPrivateDetail;
                        if (unreadGuide.chatPrivateDetail.guide) {
                            var guideTotal = 0;
                            let privateGuide = Object.values(unreadGuide.chatPrivateDetail.guide);
                            privateGuide.forEach((value, key) => {
                                guideTotal += value;
                            });
                            pushChatPrivateGuide[i] = guideTotal;
                        }
                        //　プライベートチャット
                        if (unreadGuide.chatPrivateDetail.part) {
                            var guestTotal = 0;
                            var partiTotal = 0;
                            let privatePart = Object.values(unreadGuide.chatPrivateDetail.part);
                            privatePart.forEach((value, key) => {
                                // ApiObj.getParticipant(key, function (result) {
                                //     if (result.participanttype === is_participant_guest) {
                                //         guestTotal += value;
                                //     } else {
                                //         partiTotal += value;
                                //     }
                                //     pushChatGuest[result.tourid] = guestTotal;
                                //     pushChatParti[result.tourid] = partiTotal;
                                // });
                            });
                        }
                    }
                }
                // update icon number
                // if ($rootScope.push) {
                //     $rootScope.push.setApplicationIconBadgeNumber(function () {
                //     }, function () {
                //     }, $rootScope.pushChatIcon);
                // }
            }
            this.setState({
                pushChatAll: pushChatAll,
                pushChatAllInfo: pushChatAllInfo,
                pushInfo: pushInfo,
                pushChatInfo: pushChatInfo,
                pushChatTip: pushChatTip,
                pushChatTourGroup: pushChatTourGroup,
                pushChatTour: pushChatTour,
                pushChatGroupDetail: pushChatGroupDetail,
                pushChatPrivateAll: pushChatPrivateAll,
                pushChatPrivateDetail: pushChatPrivateDetail,
                pushChatPrivateGuide: pushChatPrivateGuide,
            });
        }
    }
    renderpush = (pushinfo) => {
        if (pushinfo) {
            return (
                <Right>
                    <View  style={styles.right}>
                        <Badge style={styles.Badge}><Text>{pushinfo}</Text></Badge>
                        <Icon style={styles.iconArrow} name="arrow-forward" />
                    </View>
                </Right>
            );
        } else {
            return (
                <Right>
                    <Icon style={styles.iconArrow} name="arrow-forward" />
                </Right>
            );
        }
    }
    renderList = (dataList) => {
        if (dataList.length > 0) {
            return (
                <List>
                    {
                        dataList.map((item, index) => (
                            <ListItem itemHeader key={index} style={styles.item}>
                                <Thumbnail source={{ uri: item.logoimg }} />
                                <Body >
                                    <Text>{item.tourname}</Text>
                                    <Text note style={styles.Itemtext}>{item.datefromlbl}~{item.datetolbl}</Text>
                                </Body>
                                {this.renderpush(this.state.pushChatAllInfo[item.id])}
                            </ListItem>
                        ))
                    }
                </List>
            );
        } else {
            return (
                <List>
                    {
                        <ListItem itemHeader style={styles.item}>
                            <Body >
                                <Text>{string('list_tour.TOUR_NO')}</Text>
                            </Body>
                        </ListItem>
                    }
                </List>
            );
        }

    }
    render() {
        return (
            <Container>
                <Content>
                    {this.renderList(this.state.dataList)}
                </Content>
                <Footer >
                    <FooterTab >
                        <Right>
                            <Button style={styles.Button} vertical transparent dark>
                                <Icon name='cog' style={styles.ButtonIcon} />
                                <Text note>{string('list_tour.settting')}</Text>
                            </Button>
                        </Right>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    Itemtext: {
        paddingVertical: 3,
        color: "black",
    },
    right: {
        flexDirection: 'row',
    },
    ButtonIcon: {
        fontSize: 35,
        color: "#8c8c8c",
        margin: 0,
        padding: 0,
    },
    item: {
        borderBottomWidth: 1,
        borderColor: "#8c8c8c"
    },
    Badge: {
        padding: 3,
        margin: 3,
    },
    iconArrow: {
        color:'#8c8c8c',
        fontSize:26,
    }
});