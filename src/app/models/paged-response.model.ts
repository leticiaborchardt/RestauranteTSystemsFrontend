export interface PagedResponse<DTO> {
    content: DTO[]
    pageable: {
        pageNumber: number
        pageSize: number
        sort: {
            empty: boolean
            sorted: boolean
            unsorted: boolean
        }
        offset: number
        paged: boolean
        unpaged: boolean
    }
    last: boolean
    totalPages: number
    totalElements: number
    size: number
    number: number
    sort: {
        empty: boolean
        sorted: boolean
        unsorted: boolean
    }
    numberOfElements: number
    first: boolean
    empty: boolean 
}