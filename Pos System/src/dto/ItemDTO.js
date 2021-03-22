function ItemDTO(id,name,category,price,qty) {
    var __id = id;
    var __name = name;
    var __category = category;
    var __price = price;



    this.getItemID = function () {
        return __id;
    }
    this.getItemName = function () {
        return __name;
    }
    this.getItemCategory = function () {
        return __category;
    }
    this.getItemPrice = function () {
        return __price;
    }




    this.setItemID = function (newID) {
        __id = newID;
    }
    this.setItemName = function (newName) {
        __name = newName;
    }
    this.setItemCategory = function (newCategory) {
        __category = newCategory;
    }
    this.setItemPrice = function (newPrice) {
        __price = newPrice;
    }

}
