import 'whatwg-fetch';
import * as C from '~/constants/api';
// import employApi from "./employApi"
import {post, request, getDateOrTime} from "./apiMethod";


export default {
    getDateOrTime,
    // getLoginCaptcha: (params, headers) => request(C.GET_LOGIN_CAPTCHA, params, headers),
    login: (params) =>post(C.LOGIN, params),
    loginOut: (params) =>post(C.LOGIN_OUT, params),
    register: (params) =>post(C.REGISTER, params),
    sendVerifiCode: (params) =>post(C.SEND_VERIFI_CODE, params),
    forgetSendVerifiCode: (params) =>post(C.FORGET_SEND_VERIFI_CODE, params),
    getLeaderBoard: (params) =>post(C.GET_LEADER_BOARD, params),
    getUserMedal: (params) =>post(C.GET_USER_MEDAL, params),
    getUserInfo: (params) =>post(C.GET_USER_INFO, params),
    editUsername: (params) =>post(C.EDIT_USERNAME, params),
    coupon: (params) =>post(C.COUPON, params),
    createRoom: (params) =>post(C.CREATE_ROOM, params),
    joinRoomId: (params) =>post(C.JOIN_ROOM_ID, params),
    confirmRoomPass: (params) =>post(C.CONFIRM_ROOM_PASS, params),
    radomeJoinRoom: (params) =>post(C.RADOME_JOIN_ROOM, params),
    uploadMyHead: (params) =>post(C.UPLOAD_MY_HEAD, params),
    updateUserinfo: (params) =>post(C.UPDATE_USERINFO, params),
    addUserList: (params) =>post(C.ADD_USER_LIST, params),
    batchAddUser: (params) =>post(C.BATCH_ADD_USER, params),
    batchAgreeApply: (params) =>post(C.BATCH_AGREE_APPLY, params),
    otherUserInfo: (params) =>post(C.OTHER_USER_INFO, params),
    batchRefuseApply: (params) =>post(C.BATCH_REFUSE_APPLY, params),
    selfFriend: (params) =>post(C.SELF_FRIEND, params),
    beginGame: (params) =>post(C.BEGIN_GAME, params),
    gameOver: (params) =>post(C.CHALL_RES, params),
    leaderBoard: (params) =>post(C.LEADER_BOARD, params),
    areYouReady: (params) =>post(C.USER_READY, params),
    signList: (params) =>post(C.SIGN_LIST, params),
    userSign: (params) =>post(C.USER_SIGN, params),
    medalInfo: (params) =>post(C.MEDAL_INFO, params),
    watchGame: (params) =>post(C.WATCH_GAME, params),
    receiveGold: (params) =>post(C.RECEIVE_GOLD, params),
    dailyTaskList: (params) =>post(C.DAILY_TASK_LIST, params),
    achievementList: (params) =>post(C.ACHIEVEMENT_LIST, params),
    receiveAchievementTask: (params) =>post(C.RECEIVE_ACHIEVEMENT_TASK, params),
    receiveDailyTask: (params) =>post(C.RECEIVE_DAILY_TASK, params),
    onlineFriend: (params) =>post(C.ONLINE_FRIEND, params),
    inviteFriend: (params) =>post(C.INVITE_FRIEND, params),
    stranger: (params) =>post(C.STRANGER, params),
    inviteFriendJoin: (params) =>post(C.INVITE_FRIEND_JOIN, params),
    setMusic: (params) =>post(C.SET_MUSIC, params),
    setSoundEffect: (params) =>post(C.SET_SOUND_EFFECT, params),
    setShield: (params) =>post(C.SET_SHIELD, params),
    setWatch: (params) =>post(C.SET_WATCH, params),
    // indexWxlogin: (params) =>post(C.INDEX_WXLOGIN_LOGIN, params),
    onlineUser: (params) =>post(C.ONLINE_USER, params),
    shareGetSign: (params) =>post(C.SHARE_GETSIGN, params),
    setInfo: (params) =>post(C.SET_INFO, params),
    userReadyHome: (params) =>post(C.USER_READY_HOME, params),
    bindPhone: (params) =>post(C.BIND_PHONE, params),
    bindSendVerifiCode: (params) =>post(C.BIND_SEND_VERIFI_CODE, params),
    kickPeople: (params) =>post(C.KICK_PEOPLE, params),
    redEnvelope: (params) =>post(C.RED_ENVELOPE, params),
    rechargeActive: (params) =>post(C.RECHARGE_ACTIVE, params),
    delFriend: (params) =>post(C.DEL_FRIEND, params),
    forgetPassword: (params) =>post(C.FORGET_PASSWORD, params),
    getTime: (params) =>post(C.GET_TIME, params),
    sysSendMessage: (params) =>post(C.SYS_SEND_MESSAGE, params),
    isReciveActive: (params) =>post(C.IS_RECIVE_ACTIVE, params),
    signUserSign: (params) =>post(C.SIGN_USER_SIGN, params),
    editSign: (params) =>post(C.EDIT_SIGN, params),
    pushRoomSpeak: (params) =>post(C.PUSH_ROOM_SPEAK, params),
    receiveSilver: (params) =>post(C.RECEIVE_SILVER, params),
    isReceiveSilver: (params) =>post(C.IS_RECEIVE_SILVER, params),
    memberExpire: (params) =>post(C.MEMBER_EXPIRE, params),
    refundRequest: (params) =>post(C.REFUND_REQUEST, params),
    refundMoneyNum: (params) =>post(C.REFUNF_MONEY_NUM, params),
    buyVip: (params) =>post(C.BUY_VIP, params),
    treasureJoinGroup: (params) =>post(C.TREASURE_JOIN_GROUP, params),
    treasureGrabBag: (params) =>post(C.TREASURE_GRAB_BAG, params),

    // logout: (params) => post(C.LOGOUT, params),
    // register: (params) => post(C.REGISTER, params),
    // sendRandomCaptcha: (params) => post(C.SENDCAPTCHA, params),
    // forgetPassword: (params) => post(C.FORGETPASSWORD, params),
    // ...employApi,
}