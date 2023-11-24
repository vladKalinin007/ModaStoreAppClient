import {ISeenProduct} from "./seen-product";
import { v4 as uuidv4 } from 'uuid';

export interface ISeenProductList {
  id: string;
  seenProductsIds: string[];
}

export class SeenProductList implements ISeenProductList {

  id: string;
  seenProductsIds: string[] = [];

  constructor() {
    this.id = uuidv4();
    this.seenProductsIds = [];
  }

}
