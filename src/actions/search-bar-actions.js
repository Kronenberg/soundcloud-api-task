import { delay } from 'redux-saga'
import { put, call, takeLatest, all, fork, select } from 'redux-saga/effects'
import { 
  GET_EMBED_TO_INITIAL,
  GET_EMBED_SUCCESS,
  GET_EMBED_REJECTED,
  GET_QUERY_ASYNC,
  GET_QUERY_TO_INITIAL,
  LOAD_MORE,
  LOAD_MORE_ASYNC,
  GET_TRACKS_SUCCESS,
  GET_TRACKS_REJECTED,
  DOWLOAD_EMBED_ASYNC
} from '../actionTypes/actionTypes';

import { getTracksByQuery, dowloadEmbed } from './api'

const getCurrentStore = (state) => state.searchTrackReducer;

function* dowloadEmbedByURIAsync(action) {

  yield put({ type: GET_EMBED_TO_INITIAL });

 const { payload } = action; 

 try { 
  const response = yield call(() => dowloadEmbed(payload));

  yield put({  type: GET_EMBED_SUCCESS,  payload: response });

} catch(error) {

  yield put({  type: GET_EMBED_REJECTED,  payload: error });

  }
}

function* dowloadEmbedByURI() {
    yield takeLatest(DOWLOAD_EMBED_ASYNC, dowloadEmbedByURIAsync);
}


function* getQueryAsync(action) {
 
 yield put({ type: GET_QUERY_TO_INITIAL });

 let { currentQuery, currentLimit, linked_partitioning } = yield select(getCurrentStore);
 yield delay(500);

 try { 
    const response = yield call(() => getTracksByQuery(currentQuery, currentLimit, linked_partitioning));
    yield put({ 
        type: GET_TRACKS_SUCCESS, 
        payload: response.collection,
        full_data: response
      });

  } catch(error) {
    yield put({ 
        type: GET_TRACKS_REJECTED, 
        payload: error
      });
  }
 }
 
function* getQuery() {
  yield takeLatest(GET_QUERY_ASYNC, getQueryAsync);
}


function* loadNextSixItems() {
  yield takeLatest(LOAD_MORE_ASYNC, loadNextSixItemsAsync);
}

function* loadNextSixItemsAsync(action) {

  yield delay(100);

  yield put({
    type: LOAD_MORE
  });

  let { currentQuery, currentLimit, linked_partitioning, offset } = yield select(getCurrentStore);

  try { 
    const response = yield call(() => getTracksByQuery(currentQuery, currentLimit, linked_partitioning, offset));
    // if no more pages to load
    // @TODO need to create redux action for this particular case
    if (!response.next_href) {
      return;
    }

    yield put({ 
        type: GET_TRACKS_SUCCESS, 
        payload: response.collection,
        full_data: response
      });
      

  } catch(error) {
    yield put({ 
        type: GET_TRACKS_REJECTED, 
        payload: error
      });
  }
}

export default function* rootSaga() {
  yield all([
    fork(getQuery),
    fork(loadNextSixItems),
    fork(dowloadEmbedByURI)
  ])
}