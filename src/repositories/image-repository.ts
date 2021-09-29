import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_IMAGE_PREFIX } from "config/api-consts";
import { Image, ImageFilter } from 'models/Image';

export class ImageRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_IMAGE_PREFIX);
    }

    public count = (imageFilter?: ImageFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), imageFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (imageFilter?: ImageFilter): Observable<Image[]> => {
        return this.httpObservable.post<Image[]>(kebabCase(nameof(this.list)), imageFilter)
            .pipe(map((response: AxiosResponse<Image[]>) => response.data));
    };

    public get = (id: number | string): Observable<Image> => {
        return this.httpObservable.post<Image>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Image>) => response.data));
    };

    public create = (image: Image): Observable<Image> => {
        return this.httpObservable.post<Image>(kebabCase(nameof(this.create)), image)
            .pipe(map((response: AxiosResponse<Image>) => response.data));
    };

    public update = (image: Image): Observable<Image> => {
        return this.httpObservable.post<Image>(kebabCase(nameof(this.update)), image)
            .pipe(map((response: AxiosResponse<Image>) => response.data));
    };

    public delete = (image: Image): Observable<Image> => {
        return this.httpObservable.post<Image>(kebabCase(nameof(this.delete)), image)
            .pipe(map((response: AxiosResponse<Image>) => response.data));
    };

    public save = (image: Image): Observable<Image> => {
        return image.id ? this.update(image) : this.create(image);
    };

    

    public bulkDelete = (idList: number[] | string[]): Observable<void> => {
        return this.httpObservable.post(kebabCase(nameof(this.bulkDelete)), idList)
            .pipe(map((response: AxiosResponse<void>) => response.data));
    };

    public import = (file: File, name: string = nameof(file)): Observable<void> => {
        const formData: FormData = new FormData();
        formData.append(name, file as Blob);
        return this.httpObservable.post<void>(kebabCase(nameof(this.import)), formData)
            .pipe(map((response: AxiosResponse<void>) => response.data));
    };

    public export = (filter: any): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post('export', filter, {
          responseType: 'arraybuffer',
        });
    };

    public exportTemplate = (): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post('export-template', {}, {
          responseType: 'arraybuffer',
        });
    };
    
}

export const imageRepository = new ImageRepository();
