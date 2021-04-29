import { createStore, applyMiddleware, compose, combineReducers} from 'redux'
import penderMiddleware from 'redux-pender'
import * as modules from './modules_x'

const reducers = combineReducers(modules)
const middlewares = [penderMiddleware()]

//개발 모드일 때만 devTools 적용
const isDev = process.env.NODE_ENV ==='development'
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const composeEnhancers = devtools || compose

// preloadedState: 서버사이드 렌더링 시 전달받는 초기 상태
const configure = (preloadedState) => createStore(reducers, preloadedState, composeEnhancers(applyMiddleware(...middlewares)));

export default configure