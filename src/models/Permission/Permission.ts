import { Model } from '@react3l/react3l/core';
import { Menu } from 'models/Menu';
import { PermissionActionMapping } from 'models/PermissionActionMapping';
import { PermissionContent } from 'models/PermissionContent';
import { Role } from 'models/Role';
import { Status } from 'models/Status';

export class Permission extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public roleId?: number;

    public menuId?: number;

    public statusId?: number;


    public menu?: Menu;

    public role?: Role;

    public status?: Status;
    public permissionContents?: PermissionContent[];
    public permissionActionMappings?: PermissionActionMapping[];


}
