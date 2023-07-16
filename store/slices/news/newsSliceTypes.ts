import { IApiNews } from '../../api/apiTypes';

export interface INewsState {
    allNews: IApiNews[] | null;
}
