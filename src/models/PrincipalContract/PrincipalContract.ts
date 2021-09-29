import { Model } from '@react3l/react3l/core';
import { AppUser } from 'models/AppUser';
import { Organization } from 'models/Organization';
import { PrincipalContractAppUserMapping } from 'models/PrincipalContractAppUserMapping';
import { PrincipalContractContent } from 'models/PrincipalContractContent';
import { PrincipalContractFileMapping } from 'models/PrincipalContractFileMapping';
import { Status } from 'models/Status';
import { Supplier } from 'models/Supplier';
import { Moment } from 'moment';

export class PrincipalContract extends Model {
    public id?: number;

    public code?: string;

    public name?: string;

    public description?: string;

    public managerId?: number;

    public supplierId?: number;

    public supplierAddress?: string;

    public supplierEmail?: string;

    public supplierTaxCode?: string;

    public organizationId?: number;

    public organizationAddress?: string;

    public organizationEmail?: string;

    public organizationTaxCode?: string;

    public statusId?: number;

    public startedAt?: Moment;

    public remindedAt?: Moment;

    public expiredAt?: Moment;

    public creatorId?: number;




    public rowId?: string;

    public used?: boolean;


    public creator?: AppUser;

    public manager?: AppUser;

    public organization?: Organization;

    public status?: Status;

    public supplier?: Supplier;

    public principalContractAppUserMappings?: PrincipalContractAppUserMapping[];

    public principalContractContents?: PrincipalContractContent[];

    public principalContractFileMappings?: PrincipalContractFileMapping[];
    public supplierRepresentative?: string;
    public organizationRepresentative?: string;

}
