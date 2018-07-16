import {
    GET_QUERY_ASYNC,
    GET_QUERY_TO_INITIAL,
    GET_TRACKS_SUCCESS,
    GET_TRACKS_REJECTED,
    LOAD_MORE
} from '../actionTypes/actionTypes';

const initialSearchState = {
    pending: false,
    success: false,
    rejected: false,
    currentQuery: '',
    currentLimit: 6,
    offset: 0,
    linked_partitioning: 1,
    tracks: [],
    history: [],
    full_data: null,
    allowLoadMore: true
}

function searchTrackReducer(state = initialSearchState, action) {
    switch(action.type) {
        case GET_QUERY_ASYNC: {
            return {
                ...state,
                pending: true,
                currentQuery: action.payload
            }
        }
        case GET_TRACKS_SUCCESS: {
            return {
                ...state,
                success: true,
                pending: false,
                tracks: action.payload,
                history: state.history.concat(state.tracks).reverse()
            }
        }
        case GET_TRACKS_REJECTED: {
            return {
                ...state,
                success: false,
                rejected: true,
                tracks: action.payload
            }
        }
        case GET_QUERY_TO_INITIAL: {
            return {
                ...state,
                success: false,
                rejected: false,
                linked_partitioning: 1,
                offset: 0
            }
        }
        case LOAD_MORE: {
            return {
                ...state,
                allowLoadMore: true,
                offset: state.offset += 6
                }
            }   
        default: {
            return state;
        }
    }

}

export default searchTrackReducer;