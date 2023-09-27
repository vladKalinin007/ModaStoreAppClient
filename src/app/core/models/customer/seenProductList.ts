import {ISeenProduct} from "./seen-product";
import { v4 as uuidv4 } from 'uuid';

export interface ISeenProductList {
  id: string;
  seenProducts: ISeenProduct[];
}

export class SeenProductList implements ISeenProductList {

  id: string;
  seenProducts: ISeenProduct[] = [];

  constructor() {
    this.id = uuidv4();
    this.seenProducts = [];
  }

}
