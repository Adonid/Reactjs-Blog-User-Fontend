import axios from 'common/Axios';
import { ADMIN_PROFILE_SUCCESS, ADMIN_PROFILE_ERROR, ADMIN_PROFILE } from 'redux/constans';
import { ReadCookie } from 'common';

const AdminProfile = () => async dispatch => {
    
    dispatch({type: ADMIN_PROFILE});

    const res = await axios({
        method: 'POST',
        url: 'admin/',
        headers: { Authorization: "Bearer " + ReadCookie()},
        data: {
            query: `{
                adminProfile{
                    userName
                    avatar{
                        url
                        token
                    }
                }
            }`,
            variables: {}
        }
        })
        .then( res => {
            dispatch( {
                type: ADMIN_PROFILE_SUCCESS,
                payload: {
                    profile: res.data.data.adminProfile,
                }
            });
        })
        .catch( error => {
            dispatch( {
                type: ADMIN_PROFILE_ERROR,
                payload: {
                    message: "Đã có lỗi xảy ra. status: 500",
                },
            });
    });

}

export default AdminProfile;