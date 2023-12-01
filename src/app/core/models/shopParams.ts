export class ShopParams {
    categoryId: string = "";
    category: string = "";
    brandId: string = "";
    typeId: string = "";
    sort: string = 'name';
    colorId: string = "";
    pattern: string = "";
    sizeId: string = "";
    material: string = "";
    price: string = "";
    style: string = "";
    season: string = "";
    pageNumber: number = 1;
    pageSize: number = 9;
    search: string;
    minPrice: string;
    maxPrice: string;

    nextPage() {
        this.pageNumber++;
    }

    previousPage() {
        if (this.pageNumber > 1) {
            this.pageNumber--;
        }
    }
}
