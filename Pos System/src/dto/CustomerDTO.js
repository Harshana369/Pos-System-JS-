function CustomerDTO(id,name,address,phn,nic) {
    var __id = id;
    var __name = name;
    var __address = address;
    var __phn = phn;
    var __nic = nic;

    this.getCustomerID = function () {
        return __id;
    }
    this.getCustomerName = function () {
        return __name;
    }
    this.getCustomerAddress = function () {
        return __address;
    }
    this.getCustomerPhn = function () {
        return __phn;
    }
    this.getCustomerNic = function () {
        return __nic;
    }


    this.setCustomerID = function (newID) {
        __id = newID;
    }
    this.setCustomerName = function (newName) {
        __name = newName;
    }
    this.setCustomerAddress = function (newAddress) {
        __address = newAddress;
    }
    this.setCustomerPhn = function (newPhn) {
        __phn = newPhn;
    }
    this.setCustomerNic = function (newNic) {
        __nic = newNic;
    }

}