import { post } from './post';

class PostList {
    list: Array<any> = new Array<any>();
    dir: string[] = ['asc', 'des'];
    filter: string[] = ['date', 'popular'];

    constructor() {
        let sortedList = this.list;
        const sortFn = function () { a: post };
        // post.createdDate sort TODO
        //TODO sort or filter ASC DESC
        sortedList.sort();
    };
}
export const postList = () => new PostList();

