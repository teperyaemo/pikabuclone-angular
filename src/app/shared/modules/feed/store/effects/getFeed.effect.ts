import { HttpErrorResponse } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { createEffect, ofType, Actions } from "@ngrx/effects"
import { switchMap, map, catchError, of } from "rxjs"
import { FeedService } from "../../services/feed.service"
import { GetFeedResponseInterface } from "../../types/getFeedResponse.interface"
import { getFeedAction, getFeedSuccessAction, getFeedFilureAction } from "../actions/getFeed.action"


@Injectable()
export class GetFeedEffect{
    getFeed$ = createEffect(()=> 
        this.actions$.pipe(
            ofType(getFeedAction),
            switchMap(({url})=> {                
                return this.feedService.getFeed(url).pipe(
                    map((feed: GetFeedResponseInterface) =>{
                        return getFeedSuccessAction({feed})
                }),
                catchError((errorResponse: HttpErrorResponse)=> {
                    return of(getFeedFilureAction())
                })
            )
        })  
    ))

    constructor(private actions$: Actions, private feedService: FeedService){}
} 