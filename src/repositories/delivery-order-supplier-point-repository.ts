import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_DELIVERY_ORDER_SUPPLIER_POINT_PREFIX } from "config/api-consts";
import { DeliveryOrderSupplierPoint, DeliveryOrderSupplierPointFilter } from 'models/DeliveryOrderSupplierPoint';
import { Criterion, CriterionFilter } from 'models/Criterion';
import { Point, PointFilter } from 'models/Point';
import { DeliveryOrder, DeliveryOrderFilter } from 'models/DeliveryOrder';
import { Image, ImageFilter } from 'models/Image';
import { Supplier, SupplierFilter } from 'models/Supplier';

export class DeliveryOrderSupplierPointRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_DELIVERY_ORDER_SUPPLIER_POINT_PREFIX);
    }

    public count = (deliveryOrderSupplierPointFilter?: DeliveryOrderSupplierPointFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), deliveryOrderSupplierPointFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (deliveryOrderSupplierPointFilter?: DeliveryOrderSupplierPointFilter): Observable<DeliveryOrderSupplierPoint[]> => {
        return this.httpObservable.post<DeliveryOrderSupplierPoint[]>(kebabCase(nameof(this.list)), deliveryOrderSupplierPointFilter)
            .pipe(map((response: AxiosResponse<DeliveryOrderSupplierPoint[]>) => response.data));
    };

    public get = (id: number | string): Observable<DeliveryOrderSupplierPoint> => {
        return this.httpObservable.post<DeliveryOrderSupplierPoint>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<DeliveryOrderSupplierPoint>) => response.data));
    };

    public create = (deliveryOrderSupplierPoint: DeliveryOrderSupplierPoint): Observable<DeliveryOrderSupplierPoint> => {
        return this.httpObservable.post<DeliveryOrderSupplierPoint>(kebabCase(nameof(this.create)), deliveryOrderSupplierPoint)
            .pipe(map((response: AxiosResponse<DeliveryOrderSupplierPoint>) => response.data));
    };

    public update = (deliveryOrderSupplierPoint: DeliveryOrderSupplierPoint): Observable<DeliveryOrderSupplierPoint> => {
        return this.httpObservable.post<DeliveryOrderSupplierPoint>(kebabCase(nameof(this.update)), deliveryOrderSupplierPoint)
            .pipe(map((response: AxiosResponse<DeliveryOrderSupplierPoint>) => response.data));
    };

    public delete = (deliveryOrderSupplierPoint: DeliveryOrderSupplierPoint): Observable<DeliveryOrderSupplierPoint> => {
        return this.httpObservable.post<DeliveryOrderSupplierPoint>(kebabCase(nameof(this.delete)), deliveryOrderSupplierPoint)
            .pipe(map((response: AxiosResponse<DeliveryOrderSupplierPoint>) => response.data));
    };

    public save = (deliveryOrderSupplierPoint: DeliveryOrderSupplierPoint): Observable<DeliveryOrderSupplierPoint> => {
        return deliveryOrderSupplierPoint.id ? this.update(deliveryOrderSupplierPoint) : this.create(deliveryOrderSupplierPoint);
    };

    public singleListCriterion = (criterionFilter: CriterionFilter): Observable<Criterion[]> => {
        return this.httpObservable.post<Criterion[]>(kebabCase(nameof(this.singleListCriterion)), criterionFilter)
            .pipe(map((response: AxiosResponse<Criterion[]>) => response.data));
    };
    public singleListPoint = (pointFilter: PointFilter): Observable<Point[]> => {
        return this.httpObservable.post<Point[]>(kebabCase(nameof(this.singleListPoint)), pointFilter)
            .pipe(map((response: AxiosResponse<Point[]>) => response.data));
    };
    public singleListDeliveryOrder = (deliveryOrderFilter: DeliveryOrderFilter): Observable<DeliveryOrder[]> => {
        return this.httpObservable.post<DeliveryOrder[]>(kebabCase(nameof(this.singleListDeliveryOrder)), deliveryOrderFilter)
            .pipe(map((response: AxiosResponse<DeliveryOrder[]>) => response.data));
    };
    public singleListImage = (imageFilter: ImageFilter): Observable<Image[]> => {
        return this.httpObservable.post<Image[]>(kebabCase(nameof(this.singleListImage)), imageFilter)
            .pipe(map((response: AxiosResponse<Image[]>) => response.data));
    };
    public singleListSupplier = (supplierFilter: SupplierFilter): Observable<Supplier[]> => {
        return this.httpObservable.post<Supplier[]>(kebabCase(nameof(this.singleListSupplier)), supplierFilter)
            .pipe(map((response: AxiosResponse<Supplier[]>) => response.data));
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

export const deliveryOrderSupplierPointRepository = new DeliveryOrderSupplierPointRepository();
