import { routerNavigatedAction } from "@ngrx/router-store";
import { Action, createReducer, on } from "@ngrx/store";
import { FeedStateInterface } from "../types/feedState.interface";
import { getFeedAction, getFeedFilureAction, getFeedSuccessAction } from "./actions/getFeed.action";

const initialState : FeedStateInterface = {
    isLoading: false, 
    error: null, 
    data: null
}

const feedReduces = createReducer(
    initialState,
    on(getFeedAction,
        (state): FeedStateInterface =>({
        ...state,
        isLoading: true,
        data: null
    })),
    on(getFeedSuccessAction,
        (state, action): FeedStateInterface =>({
        ...state,
        isLoading: false,
        data: action.feed
    })),
    on(getFeedFilureAction,
        (state, action): FeedStateInterface =>({
        ...state,
        isLoading: false
    })),
    on(routerNavigatedAction, 
        (): FeedStateInterface => initialState)
)

export function reducers(state: FeedStateInterface, action: Action){
    return feedReduces(state, action)
}