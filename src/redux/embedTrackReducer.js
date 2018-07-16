import {
   DOWLOAD_EMBED_ASYNC,
   GET_EMBED_TO_INITIAL,
   GET_EMBED_SUCCESS,
   GET_EMBED_REJECTED
} from '../actionTypes/actionTypes';

const initialEmbedState = {
    pending: false,
    success: false,
    rejected: false,
    response: []
}

function embedTrackReducer(state = initialEmbedState, action) {
    switch(action.type) {
        case DOWLOAD_EMBED_ASYNC: {
            return {
                ...state,
                pending: true
            }
        }
        case GET_EMBED_TO_INITIAL: {
            return {
                ...state,
                pending: false,
                success: false,
                rejected: false,
                response: []
             }
        }
        case GET_EMBED_SUCCESS: {
            return  {
                ...state,
                response: action.payload,
                success: true,
                rejected: false,
                pending: false
            }
        }
        case GET_EMBED_REJECTED: {
            return  {
                ...state,
                response: action.payload,
                success: false,
                rejected: true,
                pending: false
            }
        }
        default: {
            return state;
        }
    }

}

export default embedTrackReducer;