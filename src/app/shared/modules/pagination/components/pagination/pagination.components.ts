import { Component, Input, OnInit } from "@angular/core";
import { UtilService } from "src/app/shared/services/utils.service";

@Component({
    selector: 'pc-pagination',
    templateUrl: './pagination.components.html',
    styleUrls: ['./pagination.components.scss']
})
export class PaginationComponent implements OnInit{

    constructor(private utilService : UtilService){}

    @Input('total') totalProps: number
    @Input('limit') limitProps: number
    @Input('currentPage') currentPageProps: number
    @Input('url') urlProps: string

    pagesCount: number
    pages: number[]

    ngOnInit(): void {
       this.pagesCount = Math.ceil(this.totalProps / this.limitProps)
       this.pages = this.utilService.range(1, this.pagesCount)
    }
}