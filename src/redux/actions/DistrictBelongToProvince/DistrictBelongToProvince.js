import axios from 'common/Axios';
import { DISTRICTS_BELONGTO_PROVINCE_SUCCESS, DISTRICTS_BELONGTO_PROVINCE_ERROR, DISTRICTS_BELONGTO_PROVINCE } from 'redux/constans';
import { ReadCookie } from 'common';

const DistrictBelongToProvince = parentCode => async dispatch => {
    
    dispatch({type: DISTRICTS_BELONGTO_PROVINCE});

    try{
        const res = await axios({
            method: 'POST',
            url: 'admin/',
            headers: { Authorization: "Bearer " + ReadCookie()},
            data: {
                query: `{
                    districts: districtsBelongToProvince(parent_code: "${parentCode}"){
                        name_with_type
                        code
                    }
                }`,
                variables: {}
            }
            });
        dispatch( {
            type: DISTRICTS_BELONGTO_PROVINCE_SUCCESS,
            payload: {
                districts: res.data.data.districts
            }
        });
    }
    catch(e){
        dispatch( {
            type: DISTRICTS_BELONGTO_PROVINCE_ERROR,
            payload: {
                message: "Đã có lỗi xảy ra. status: 500",
            },
        });
    }

}

export default DistrictBelongToProvince;