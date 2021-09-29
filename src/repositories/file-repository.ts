import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_FILE_PREFIX } from "config/api-consts";
import { File, FileFilter } from 'models/File';
import { AppUser, AppUserFilter } from 'models/AppUser';

export class FileRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_FILE_PREFIX);
    }

    public count = (fileFilter?: FileFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), fileFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (fileFilter?: FileFilter): Observable<File[]> => {
        return this.httpObservable.post<File[]>(kebabCase(nameof(this.list)), fileFilter)
            .pipe(map((response: AxiosResponse<File[]>) => response.data));
    };

    public get = (id: number | string): Observable<File> => {
        return this.httpObservable.post<File>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<File>) => response.data));
    };

    public create = (file: File): Observable<File> => {
        return this.httpObservable.post<File>(kebabCase(nameof(this.create)), file)
            .pipe(map((response: AxiosResponse<File>) => response.data));
    };

    public update = (file: File): Observable<File> => {
        return this.httpObservable.post<File>(kebabCase(nameof(this.update)), file)
            .pipe(map((response: AxiosResponse<File>) => response.data));
    };

    public delete = (file: File): Observable<File> => {
        return this.httpObservable.post<File>(kebabCase(nameof(this.delete)), file)
            .pipe(map((response: AxiosResponse<File>) => response.data));
    };

    public save = (file: File): Observable<File> => {
        return file.id ? this.update(file) : this.create(file);
    };

    public singleListAppUser = (appUserFilter: AppUserFilter): Observable<AppUser[]> => {
        return this.httpObservable.post<AppUser[]>(kebabCase(nameof(this.singleListAppUser)), appUserFilter)
            .pipe(map((response: AxiosResponse<AppUser[]>) => response.data));
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

export const fileRepository = new FileRepository();
