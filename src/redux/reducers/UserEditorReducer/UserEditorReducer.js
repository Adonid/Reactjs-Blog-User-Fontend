import mockData from './data';

const dataUserEditor = {
    dataUser: mockData,
    alert: {
        type: "info",
        content: "Hello you"
    }
}

const UserEditorReducer = (state = dataUserEditor, action) => {
    switch (action.type) {
        case 'UPDATE_USER':
            const dataNewUser = action.data;
            /** api cap nhat thong tin user */
                // dataNewUser.img != null ==> cho phep cap nhat avatar
                // dataNewUser.emailVerify === false ==> email chua xac nhan va gui email yeu cau xac thuc lai
            /** end */
            // sau khi api xong dua ra thong bao. vd:
            state = { ...state, alert: {...state.alert, type: "success", content: "Cập nhật thông tin thành công!"}}
            return state
        
        default:
            return state
    }
}

export default UserEditorReducer;