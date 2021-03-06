import {getAvatarUrl} from 'helpers';
import { 
    CREATE_USER_SUCCESS, CREATE_USER_ERROR, CREATE_USER, OPEN_FORM_ADD_USER, CLOSE_FORM_ADD_USER,
    GET_ALL_USER_SUCCESS, GET_ALL_USER_ERROR, GET_ALL_USER,
    UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER,
    LOCK_USERS_SUCCESS, LOCK_USERS_ERROR, LOCK_USERS,
    GET_USER_DETAIL_SUCCESS, GET_USER_DETAIL_ERROR, GET_USER_DETAIL,
    GET_USER_EDIT_SUCCESS, GET_USER_EDIT_ERROR, GET_USER_EDIT,
    SEND_ACTION_SUCCESS, SEND_ACTION_ERROR, SEND_ACTION,
    UPLOAD_AVATAR_COMPLATE,
 } from 'redux/constans';

const dataMannegerUser = {
    // FORM THEM USER
    openForm: false,
    loadingCreate: false,
    messageCreate:"",

    // LAY DANH SACH USER
    users: [],
    loadingPage: true,

    // LAY CHI TIET USER
    loadingDetail: true,
    userDetail: {account:{}, userStorage: {address:{}, receives: {}}},
    loadingButtonSend: false,

    // LAY USER RA SUA
    accountEdit: {},
    addressEdit: {},
    avatarEdit: {},
    loadingEdit: false,
    loadingButtonSave: false
}

const MannegerUserReducer = (state = dataMannegerUser, action) => {
    
    switch (action.type) {

        // THEM MOI 1 NGUOI DUNG
        
        case OPEN_FORM_ADD_USER:
            return { ...state, openForm: true };
        
        case CLOSE_FORM_ADD_USER:
            return { ...state, openForm: false };

        case CREATE_USER:
            return { ...state, loadingCreate: true };

        case CREATE_USER_SUCCESS:
            return { ...state, loadingCreate: false, openForm: false };

        case CREATE_USER_ERROR:
            return { ...state, loadingCreate: false, messageCreate: action.payload.message };

        // LAY DANH SACH TAT CA NGUOI DUNG
        
        case GET_ALL_USER:
            return { ...state, loadingPage: true };

        case GET_ALL_USER_SUCCESS:
            return { ...state, loadingPage: false, users: action.payload.users };

        case GET_ALL_USER_ERROR:
            return { ...state, loadingPage: false };

        // KHOA NGUOI DUNG

        case LOCK_USERS:
            return { ...state, loadingPage: true };

        case LOCK_USERS_SUCCESS:
            return { ...state, loadingPage: false, users: action.payload.users };

        case LOCK_USERS_ERROR:
            return { ...state, loadingPage: false };

        
        // LAY THONG TIN CHI TIET NGUOI DUNG

        case GET_USER_DETAIL:
            return { ...state, loadingDetail: true };

        case GET_USER_DETAIL_SUCCESS:
            return { ...state, loadingDetail: false, userDetail:{ account: action.payload.account, userStorage: action.payload.userStorage } };

        case GET_USER_DETAIL_ERROR:
            return { ...state, loadingDetail: true };

        
        // THAO TAC GUI EMAIL, THONG BAO CHO NGUOI DUNG

        case SEND_ACTION:
            return { ...state, loadingButtonSend: true };

        case SEND_ACTION_SUCCESS:
            return { ...state, loadingButtonSend: false };

        case SEND_ACTION_ERROR:
            return { ...state, loadingButtonSend: false };

        
        // LAY THONG TIN NGUOI DUNG RA DE SUA

        case GET_USER_EDIT:
            return { ...state, loadingEdit: true };

        case GET_USER_EDIT_SUCCESS:
            return { ...state, loadingEdit: false, accountEdit: action.payload.account, addressEdit: action.payload.address, avatarEdit: action.payload.avatarDraft };

        case GET_USER_EDIT_ERROR:
            return { ...state, loadingEdit: false };
        
        case UPLOAD_AVATAR_COMPLATE:
            return { ...state, accountEdit: {...state.accountEdit, photoURL: getAvatarUrl(action.payload.token)} };  // Anh tai vi tri trang sua user
        
        
        // CAP NHAT USER

        case UPDATE_USER:
            return { ...state, loadingButtonSave: true };

        case UPDATE_USER_SUCCESS:
            return { ...state, loadingButtonSave: false };

        case UPDATE_USER_ERROR:
            return { ...state, loadingButtonSave: false };

        default:
            return state
    }
}



export default MannegerUserReducer;