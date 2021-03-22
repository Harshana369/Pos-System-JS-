function OrderDTO(oId,code,name,price,qty,tot) {
    var __oId=oId;
    var __code=code;
    var __name=name;
    var __price=price;
    var __qty=qty;
    var __tot=tot;

    this.getOrderID=function () {
        return __oId;
    }
    this.getOrderCode=function () {
        return __code;
    }
    this.getOrderName=function () {
        return __name;
    }
    this.getOrderPrice=function () {
        return __price;
    }
    this.getOrderQty=function () {
        return __qty;
    }
    this.getOrderTot=function () {
        return __tot;
    }


    this.setOderID=function (newOID) {
        __oId=newOID;
    }
    this.setOderCode=function (newCode) {
        __code=newCode;
    }
    this.setOderName=function (newName) {
        __name=newName;
    }
    this.setOderPrice=function (newPrice) {
        __price=newPrice;
    }
    this.setOderQty=function (newQty) {
        __qty=newQty;
    }
    this.setOderTot=function (newTot) {
        __tot=newTot;
    }

}