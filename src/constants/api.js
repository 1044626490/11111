/**
 * @module  api
 * api请求的地址常量
 * */

export const GET_LOGIN_CAPTCHA = '/login/captcha';
export const LOGIN = '/login';//登录
export const REGISTER = '/register';//注册
export const SEND_VERIFI_CODE = '/send_verifi_code';//获取验证码
export const BIND_SEND_VERIFI_CODE = '/bind_send_verifi_code';//获取验证码
export const GET_LEADER_BOARD = '/leaderboard';//查看排行榜
export const GET_USER_MEDAL = '/user_medal';//个人勋章列表
export const GET_USER_INFO = '/user_info';//个人勋章列表
export const EDIT_USERNAME = '/edit_username';//个人勋章列表
export const COUPON = '/coupon';//活动页优惠券
export const JOIN_ROOM_ID = '/join_room_id';//加入房间
export const CREATE_ROOM = '/create_room';//创建房间
export const CONFIRM_ROOM_PASS = '/confirm_room_pass';//验证房间密码
export const RADOME_JOIN_ROOM = '/join_room';//加入房间
export const UPLOAD_MY_HEAD = '/upload';//上传头像
export const UPDATE_USERINFO = '/update_userinfo';//更新用户信息
export const ADD_USER_LIST = '/add_user_list';//添加好友列表
export const BATCH_AGREE_APPLY = '/batch_agree_apply';//同意添加好友
export const OTHER_USER_INFO = '/other_user_info';//好友信息
export const BATCH_REFUSE_APPLY = '/batch_refuse_apply';//拒绝添加好友
export const BATCH_ADD_USER = '/batch_add_user';//申请添加好友
export const SELF_FRIEND = '/self_friend';//好友列表
export const BEGIN_GAME = '/begin_game';//开始游戏
export const CHALL_RES = '/chall_res';//游戏结果
export const LOGIN_OUT = '/logout';//登出
export const LEADER_BOARD = '/leaderboard';//总排行榜
export const USER_READY = '/user_ready';//总排行榜
export const SIGN_LIST = '/sign_list';//签到
export const USER_SIGN = '/user_sign';//签到
export const MEDAL_INFO = '/medal_info';//勋章单个信息
export const WATCH_GAME = '/watch_game';//勋章单个信息
export const RECEIVE_GOLD = '/receive_gold';//勋章单个信息
export const DAILY_TASK_LIST = '/daily_task_list';//勋章单个信息
export const ACHIEVEMENT_LIST = '/achievement_list';//勋章单个信息
export const RECEIVE_ACHIEVEMENT_TASK = '/receive_achievement_task';//勋章单个信息
export const RECEIVE_DAILY_TASK = '/receive_daily_task';//勋章单个信息
export const ONLINE_FRIEND = '/online_friend';//勋章单个信息
export const INVITE_FRIEND = '/invite_friend';//勋章单个信息
export const STRANGER = '/stranger';//勋章单个信息
export const INVITE_FRIEND_JOIN = '/invite_friend_join';//勋章单个信息
export const SET_MUSIC = '/set_music';//设置音乐
export const SET_SOUND_EFFECT = '/set_sound_effect';//设置音乐
export const SET_SHIELD = '/set_shield';//设置音乐
export const SET_WATCH = '/set_watch';//设置音乐
export const INDEX_WXLOGIN_LOGIN = '/index/wxlogin/login';//设置音乐
export const ONLINE_USER = '/online_user';//设置音乐
export const SHARE_GETSIGN = '/index/Share/getSignPackage';//设置音乐
export const SET_INFO = '/set_info';//设置音乐
export const USER_READY_HOME = '/user_ready_home';//设置音乐
export const BIND_PHONE = '/bind_phone';//设置音乐
export const KICK_PEOPLE = '/kick_people';//设置音乐
export const RED_ENVELOPE = '/red_envelope';//踢人
export const RECHARGE_ACTIVE = '/recharge_active';//踢人
export const DEL_FRIEND = '/del_friend';//踢人
export const FORGET_PASSWORD = '/forget_password';//踢人
export const GET_TIME = '/get_time';//踢人
export const SYS_SEND_MESSAGE = '/sys_send_message';//踢人
export const FORGET_SEND_VERIFI_CODE = '/forget_send_verifi_code';//获取验证码
export const IS_RECIVE_ACTIVE = '/index/task/is_recive_active';//踢人
export const SIGN_USER_SIGN = '/index/signature/user_sign';//踢人
export const EDIT_SIGN = '/index/signature/edit_sign';//踢人
export const PUSH_ROOM_SPEAK = '/push/room/speak';//踢人
export const RECEIVE_SILVER = '/receive_silver';//踢人
export const IS_RECEIVE_SILVER = '/is_recive_silver';//踢人
export const MEMBER_EXPIRE = '/member_expire';//会员信息
export const REFUND_REQUEST = '/refund_request';//退款
export const REFUNF_MONEY_NUM = '/refund_money_num';//退款
export const BUY_VIP = '/buy_vip';//购买续费vip
export const TREASURE_JOIN_GROUP = '/treasure/group/join_group';//加入宝箱房间
export const TREASURE_GRAB_BAG = '/treasure/group/grab_bag';//加入宝箱房间
export const USER_GOLD = '/index/user/user_gold';//加入宝箱房间

// export const GET_LOGIN_CAPTCHA = '/api/login/captcha';
// export const LOGIN = '/api/login';//登录
// export const REGISTER = '/api/register';//注册
// export const SEND_VERIFI_CODE = '/api/send_verifi_code';//获取验证码
// export const BIND_SEND_VERIFI_CODE = '/api/bind_send_verifi_code';//获取验证码
// export const FORGET_SEND_VERIFI_CODE = '/api/forget_send_verifi_code';//获取验证码
// export const GET_LEADER_BOARD = '/api/leaderboard';//查看排行榜
// export const GET_USER_MEDAL = '/api/user_medal';//个人勋章列表
// export const GET_USER_INFO = '/api/user_info';//个人勋章列表
// export const EDIT_USERNAME = '/api/edit_username';//个人勋章列表
// export const COUPON = '/api/coupon';//活动页优惠券
// export const JOIN_ROOM_ID = '/api/join_room_id';//加入房间
// export const CREATE_ROOM = '/api/create_room';//创建房间
// export const CONFIRM_ROOM_PASS = '/api/confirm_room_pass';//验证房间密码
// export const RADOME_JOIN_ROOM = '/api/join_room';//加入房间
// export const UPLOAD_MY_HEAD = '/api/upload';//上传头像
// export const UPDATE_USERINFO = '/api/update_userinfo';//更新用户信息
// export const ADD_USER_LIST = '/api/add_user_list';//添加好友列表
// export const BATCH_AGREE_APPLY = '/api/batch_agree_apply';//同意添加好友
// export const OTHER_USER_INFO = '/api/other_user_info';//好友信息
// export const BATCH_REFUSE_APPLY = '/api/batch_refuse_apply';//拒绝添加好友
// export const BATCH_ADD_USER = '/api/batch_add_user';//申请添加好友
// export const SELF_FRIEND = '/api/self_friend';//好友列表
// export const BEGIN_GAME = '/api/begin_game';//开始游戏
// export const CHALL_RES = '/api/chall_res';//游戏结果
// export const LOGIN_OUT = '/api/logout';//登出
// export const LEADER_BOARD = '/api/leaderboard';//总排行榜
// export const USER_READY = '/api/user_ready';//总排行榜
// export const SIGN_LIST = '/api/sign_list';//签到
// export const USER_SIGN = '/api/user_sign';//签到
// export const MEDAL_INFO = '/api/medal_info';//勋章单个信息
// export const WATCH_GAME = '/api/watch_game';//勋章单个信息
// export const RECEIVE_GOLD = '/api/receive_gold';//勋章单个信息
// export const DAILY_TASK_LIST = '/api/daily_task_list';//勋章单个信息
// export const ACHIEVEMENT_LIST = '/api/achievement_list';//勋章单个信息
// export const RECEIVE_ACHIEVEMENT_TASK = '/api/receive_achievement_task';//勋章单个信息
// export const RECEIVE_DAILY_TASK = '/api/receive_daily_task';//勋章单个信息
// export const ONLINE_FRIEND = '/api/online_friend';//勋章单个信息
// export const INVITE_FRIEND = '/api/invite_friend';//勋章单个信息
// export const STRANGER = '/api/stranger';//勋章单个信息
// export const INVITE_FRIEND_JOIN = '/api/invite_friend_join';//勋章单个信息
// export const SET_MUSIC = '/api/set_music';//设置音乐
// export const SET_SOUND_EFFECT = '/api/set_sound_effect';//设置音乐
// export const SET_SHIELD = '/api/set_shield';//设置音乐
// export const SET_WATCH = '/api/set_watch';//设置音乐
// export const INDEX_WXLOGIN_LOGIN = '/api/index/wxlogin/login';//设置音乐
// export const ONLINE_USER = '/api/online_user';//设置音乐
// export const SHARE_GETSIGN = '/api/index/Share/getSignPackage';//设置音乐
// export const SET_INFO = '/api/set_info';//个人设置信息
// export const USER_READY_HOME = '/api/user_ready_home';//房主返回房间查看准备
// export const BIND_PHONE = '/api/bind_phone';//绑定手机
// export const KICK_PEOPLE = '/api/kick_people';//踢人
// export const RED_ENVELOPE = '/api/red_envelope';//踢人
// export const RECHARGE_ACTIVE = '/api/recharge_active';//踢人
// export const DEL_FRIEND = '/api/del_friend';//踢人
// export const FORGET_PASSWORD = '/api/forget_password';//踢人
// export const GET_TIME = '/api/get_time';//踢人
// export const SYS_SEND_MESSAGE = '/api/sys_send_message';//踢人
// export const IS_RECIVE_ACTIVE = '/api/index/task/is_recive_active';//踢人
// export const SIGN_USER_SIGN = '/api/index/signature/user_sign';//踢人
// export const EDIT_SIGN = '/api/index/signature/edit_sign';//编辑二维码信息
// export const PUSH_ROOM_SPEAK = '/api/push/room/speak';//说话
// export const RECEIVE_SILVER = '/api/receive_silver';//领取银币
// export const IS_RECEIVE_SILVER = '/api/is_recive_silver';//是否已经领取银币
// export const MEMBER_EXPIRE = '/api/member_expire';//会员信息
// export const REFUND_REQUEST = '/api/refund_request';//退款
// export const REFUNF_MONEY_NUM = '/api/refund_money_num';//退款
// export const BUY_VIP = '/api/buy_vip';//购买续费vip
// export const TREASURE_JOIN_GROUP = '/api/treasure/group/join_group';//加入宝箱房间
// export const TREASURE_GRAB_BAG = '/api/treasure/group/grab_bag';//加入宝箱房间
// export const USER_GOLD = '/index/user/user_gold';//加入宝箱房间

