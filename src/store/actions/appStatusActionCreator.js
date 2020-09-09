import {CHANGE_APP_STATUS} from "../../constants/actionTypes";

export  function changeAppStatus(status) {
    return {
        type: CHANGE_APP_STATUS,
        payload:{
            isPending: status
        }
    }
}