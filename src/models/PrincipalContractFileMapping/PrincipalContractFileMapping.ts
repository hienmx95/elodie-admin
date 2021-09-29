import { Model } from '@react3l/react3l/core';
import { File } from 'models/File';
import { PrincipalContract } from 'models/PrincipalContract';

export class PrincipalContractFileMapping extends Model
{
    public fileId?: number;

    public principalContractId?: number;


    public file?: File;

    public principalContract?: PrincipalContract;
}
