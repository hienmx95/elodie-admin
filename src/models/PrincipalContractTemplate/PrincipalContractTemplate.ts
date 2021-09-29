import { Model } from '@react3l/react3l/core';
import { PrincipalContract } from 'models/PrincipalContract';

export class PrincipalContractTemplate extends Model {
    public id?: number;
    public name?: string;
    public content?: PrincipalContract;
}
