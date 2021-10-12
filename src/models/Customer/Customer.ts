import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { AppUser } from 'models/AppUser';
import { CodeGeneratorRule } from 'models/CodeGeneratorRule';
import { CustomerSource } from 'models/CustomerSource';
import { District } from 'models/District';
import { Nation } from 'models/Nation';
import { Organization } from 'models/Organization';
import { Profession } from 'models/Profession';
import { Province } from 'models/Province';
import { Ward } from 'models/Ward';
import { Sex } from 'models/Sex';

export class Customer extends Model
{
    public id?: number;

    public code?: string;

    public codeDraft?: string;

    public name?: string;

    public phone?: string;

    public address?: string;

    public nationId?: number;

    public provinceId?: number;

    public districtId?: number;

    public wardId?: number;

    public birthday?: Moment;

    public email?: string;

    public professionId?: number;

    public customerSourceId?: number;

    public sexId?: number;

    public statusId?: number;

    public appUserId?: number;

    public creatorId?: number;

    public organizationId?: number;




    public used?: boolean;

    public rowId?: string;

    public codeGeneratorRuleId?: number;


    public appUser?: AppUser;

    public codeGeneratorRule?: CodeGeneratorRule;

    public creator?: AppUser;

    public customerSource?: CustomerSource;

    public district?: District;

    public nation?: Nation;

    public organization?: Organization;

    public profession?: Profession;

    public province?: Province;

    public ward?: Ward;

    public sex?: Sex;

}
