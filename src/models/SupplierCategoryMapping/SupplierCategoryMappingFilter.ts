import { IdFilter } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class SupplierCategoryMappingFilter extends ModelFilter {
    public supplierId?: IdFilter = new IdFilter();
    public categoryId?: IdFilter = new IdFilter();
}
