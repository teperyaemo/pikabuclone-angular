import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import queryString from "query-string";
import { Observable, Subscription } from "rxjs";
import { getFeedAction } from "../../store/actions/getFeed.action";
import { errorSelector, feedSelector, isLoadingSelector } from "../../store/selectors";
import { GetFeedResponseInterface } from "../../types/getFeedResponse.interface";

@Component({
    selector: 'pc-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy{
    @Input('apiUrl') apiUrlProps: string

    isLoading$ : Observable<boolean>
    error$: Observable<string | null>
    feed$: Observable<GetFeedResponseInterface | null>
    limit: number = 10
    baseUrl : string
    queryParamsSubscription: Subscription
    currentPage: number

    constructor(private store: Store, private router: Router, private route: ActivatedRoute){}

    ngOnInit(): void{
        this.initializeValues()
        this.initializeListeners()
    }

    ngOnDestroy(): void {
        this.queryParamsSubscription.unsubscribe()
    }

    initializeValues(): void{
        this.isLoading$ = this.store.pipe(select(isLoadingSelector))
        this.error$ = this.store.pipe(select(errorSelector))
        this.feed$ = this.store.pipe(select(feedSelector))
        this.baseUrl = this.router.url.split('?')[0]
    }

    fetchFeed():void{
        const offset = this.currentPage * this.limit - this.limit
        const parsedUrl = queryString.parseUrl(this.apiUrlProps)
        const stringifiedParams = queryString.stringify({
            limit: this.limit,
            offset,
            ...parsedUrl.query
        })
        const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
        this.store.dispatch(getFeedAction({url: apiUrlWithParams}))
    }

    initializeListeners() : void {
        this.queryParamsSubscription = this.route.queryParams.subscribe((params: Params)=>{
            this.currentPage = Number(params['page'] || '1')
            this.fetchFeed()
        })
    }
}