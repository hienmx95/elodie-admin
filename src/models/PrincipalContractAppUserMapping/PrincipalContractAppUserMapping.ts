import { Model } from '@react3l/react3l/core';
import { AppUser } from 'models/AppUser';
import { PrincipalContract } from 'models/PrincipalContract';

export class PrincipalContractAppUserMapping extends Model
{
    public appUserId?: number;

    public principalContractId?: number;


    public appUser?: AppUser;

    public principalContract?: PrincipalContract;
}
