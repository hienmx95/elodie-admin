import { Model } from '@react3l/react3l/core';
import { District } from 'models/District';
import { Organization } from 'models/Organization';
import { Province } from 'models/Province';
import { Status } from 'models/Status';
import { Ward } from 'models/Ward';

export class Warehouse extends Model
{
    public id?: number;

    public code?: string;

    public description?: string;

    public statusId?: number;

    public organizationId?: number;

    public address?: string;

    public provinceId?: number;

    public districtId?: number;

    public wardId?: number;




    public rowId?: string;


    public district?: District;

    public organization?: Organization;

    public province?: Province;

    public status?: Status;

    public ward?: Ward;
}
