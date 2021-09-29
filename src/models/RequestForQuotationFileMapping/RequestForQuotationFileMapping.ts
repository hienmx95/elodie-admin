import { Model } from '@react3l/react3l/core';
import { File } from 'models/File';
import { RequestForQuotation } from 'models/RequestForQuotation';

export class RequestForQuotationFileMapping extends Model
{
    public requestForQuotationId?: number;

    public fileId?: number;


    public file?: File;

    public requestForQuotation?: RequestForQuotation;
}
