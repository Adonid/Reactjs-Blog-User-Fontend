import axios from 'common/Axios';
import { CREATE_USER_SUCCESS, CREATE_USER_ERROR, CREATE_USER, MESSAGE_MAIN } from 'redux/constans';
import { ReadCookie } from 'common';

const CreateUser = dataUser => async dispatch => {
    
    dispatch({type: CREATE_USER});

    try{
        const res = await axios({
            method: 'POST',
            url: 'admin/create-user',
            headers: { Authorization: "Bearer " + ReadCookie()},
            data: dataUser
            });
            
        dispatch( {type: CREATE_USER_SUCCESS});

        dispatch( {
            type: MESSAGE_MAIN,
            payload: {
                message: res.data.message,
            }
        });
    }
    catch(e){
        dispatch( {
            type: CREATE_USER_ERROR,
            payload: {
                message: "Địa chỉ email đã có người sử dụng hoặc không tồn tại!",
            },
        });
    }

}

export default CreateUser;