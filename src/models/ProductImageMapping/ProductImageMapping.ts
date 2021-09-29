import { Model } from '@react3l/react3l/core';
import { Image } from 'models/Image';
import { Product } from 'models/Product';

export class ProductImageMapping extends Model
{
    public productId?: number;

    public imageId?: number;


    public image?: Image;

    public product?: Product;
}
