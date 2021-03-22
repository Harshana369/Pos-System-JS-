
$('#customerid,#customername,#customeraddress,#customerphone,#customernic').on('keydown',function (event){
    if (event.key=="Tab"){
        event.preventDefault();
    }
});


//Customer ID Genaration
function generateCustomerID() {
    try {
        let lastCustomerId = customerTable[customerTable.length-1].getCustomerID();

        let newID = parseInt(lastCustomerId.substring(5, 7)) + 1;
        if (newID < 10) {
            $("#customerid").val('C00-00'+newID);
        }else if (newID < 100) {
            $("#customerid").val('C00-0'+newID);
        } else {
            $("#customerid").val('C00-'+newID);
        }
    } catch (e) {
        $("#customerid").val('C00-001');
    }

}


$('#btnCustomer').click(function () {

let cusid = $('#customerid').val();
let cusname = $('#customername').val();
let cusaddress = $('#customeraddress').val();
let cusphn = $('#customerphone').val();
let cusnic = $('#customernic').val();

let res = saveCustomer(cusid,cusname,cusaddress,cusphn,cusnic);
if (res)clearAllCustomerText();

    generateCustomerID();
});



$('#btnCusDelete').click(function () {
    let cusID = $('#customerid').val();
    let option = confirm(`Do you want to delete ID:${cusID}`);
    if (option){
        let res=deleteCustomer(cusID);
        if (res){
            alert('Customer Delete')
        }else {
            alert('Delete Faild')
        }
    }
    loadAllCustomerToTheTable();
    clearAllCustomerText();
});

$('#btnUpdate').click(function () {
let cusID = $('#customerid').val();
let cusName = $('#customername').val();
let cusAddress = $('#customeraddress').val();
let cusPhn = $('#customerphone').val();
let cusNic = $('#customernic').val();

let option=confirm(`Do you want to Update Customer ID:${cusID}`);
    if (option){
        let res= updateCustomer(cusID, cusName, cusAddress, cusPhn,cusNic);
        if (res){
            alert("Customer Updated");
        }else{
            alert("Update Faild");
        }
    }
    loadAllCustomerToTheTable();
    clearAllCustomerText();
});


$('#customerid').on('keyup',function (eobj) {
    if (eobj.key == 'Enter'){
        let customer = searchCustomer($(this).val())
        if (customer != null) {
            $('#customerid').val(customer.getCustomerID());
            $('#customername').val(customer.getCustomerName());
            $('#customeraddress').val(customer.getCustomerAddress());
            $('#customerphone').val(customer.getCustomerPhn());
            $('#customernic').val(customer.getCustomerNic());
        } else {
            clearAllCustomerText();
        }

    }

});

$('#btn-clear').click(function () {
    clearAllCustomerText();
});

//======================


function saveCustomer(id,name,address,phn,nic) {
    $('#tblCustomer>tr').off('click');

    let customer = new CustomerDTO(id,name,address,phn,nic);
    customerTable.push(customer);

    //lode the table
    loadAllCustomerToTheTable()
    return true;
}

//get all Customer
function getAllCustomer() {
    return customerTable;
}

// delete customer
function deleteCustomer(id) {
    let customer = searchCustomer(id);
    if (customer != null) {
        let indexNumber = customerTable.indexOf(customer);
        customerTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

// search customer
function searchCustomer(id) {
    for (var i in customerTable) {
        if (customerTable[i].getCustomerID() == id) return customerTable[i];
    }
    return null;
}

function updateCustomer(id,name,address,phn,nic) {
    let customer = searchCustomer(id);
    if (customer !=null){
        customer.setCustomerName(name)
        customer.setCustomerAddress(address)
        customer.setCustomerPhn(phn)
        customer.setCustomerNic(nic);
        return true;
    }else{
        return false;
    }
}
//=====================================
function loadAllCustomerToTheTable() {
let allCustomer = getAllCustomer();
$('#tblCustomer').empty();
for (var i in allCustomer){
    let id = allCustomer[i].getCustomerID();
    let name = allCustomer[i].getCustomerName();
    let address = allCustomer[i].getCustomerAddress();
    let phn = allCustomer[i].getCustomerPhn();
    let nic = allCustomer[i].getCustomerNic();

    var row = `<tr><td>${id}</td><td>${name}</td><td>${address}</td><td>${phn}</td><td>${nic}</td></tr>`;
    $('#tblCustomer').append(row);


    $('#tblCustomer>tr').click(function () {
        let customerid=$($(this).children().get(0)).text();
        let customername=$($(this).children().get(1)).text();
        let customeraddress=$($(this).children().get(2)).text();
        let customerphn=$($(this).children().get(3)).text();
        let customernic=$($(this).children().get(4)).text();


        $('#customerid').val(customerid);
        $('#customername').val(customername);
        $('#customeraddress').val(customeraddress);
        $('#customerphone').val(customerphn);
        $('#customernic').val(customernic);

    });

    }
}

function clearAllCustomerText() {
 //   $('#customerid').val('');
    $('#customername').val('');
    $('#customeraddress').val('');
    $('#customerphone').val('');
    $('#customernic').val('');

    $('#customerid').focus();

}


//===========================

let custid=/^(C00-)[0-9]{1,3}$/;

$("#customerid").on('keydown',function (event){
    var input=(event.key);
    let inputID=$('#customerid').val();
    if (custid.test(inputID)){
        $('#lblCustomerID').text('');
        $('#customerid').css('border','2px solid lime');
        if (input=="Enter"){
            $('#customername').focus();
        }
    }else {
        $('#customerid').css('border','2px solid red');
        $('#lblCustomerID').text('Your Input Data format Is Wrong(C00-001)');
        $('#customerid').focus();
    }
});


//========================
var CustName=/^[A-Z]{1}[a-z]{1,9}( )[A-Z]{1}[a-z]{1,9}$/;

$("#customername").on('keydown',function (event){
    var input=(event.key);
    let inputName=$('#customername').val();
    if (CustName.test(inputName)){
        $('#lblCustomerName').text('');
        $('#customername').css('border','2px solid lime');
        if (input=="Enter"){
            $('#customeraddress').focus();
        }
    }else {
        $('#customername').css('border','2px solid red');
        $('#lblCustomerName').text('Your Input Data format Is Wrong(Ex:-Harshana Weerasingha)');
        $('#customername').focus();
    }
});

//=========================

var CustAddress=/^[A-Z]{1}[a-z]{1,15}$/;

$("#customeraddress").on('keydown',function (event){
    var input=(event.key);
    let inputAddress=$('#customeraddress').val();
    if (CustAddress.test(inputAddress)){
        $('#lblCustomerAddress').text('');
        $('#customeraddress').css('border','2px solid lime');
        if (input=="Enter"){
            $('#customerphone').focus();
        }
    }else {
        $('#customeraddress').css('border','2px solid red');
        $('#lblCustomerAddress').text('Your Input Data format Is Wrong(Ex:-Gampaha)');
        $('#customeraddress').focus();
    }
});

//=================================

var Custphn=/^[0-9]{3}(-)[0-9]{7}$/;

$("#customerphone").on('keydown',function (event){
    var input=(event.key);
    let inputphn=$('#customerphone').val();
    if (Custphn.test(inputphn)){
        $('#lblCustomerPhn').text('');
        $('#customerphone').css('border','2px solid lime');
        if (input=="Enter"){
            $('#customernic').focus();
        }
    }else {
        $('#customerphone').css('border','2px solid red');
        $('#lblCustomerPhn').text('Your Input Data format Is Wrong(Ex:-075-6974718)');
        $('#customerphone').focus();
    }
});

//=================================

var CustNic=/^[0-9]{8,16}(V)$/;

$("#customernic").on('keydown',function (event){
    var input=(event.key);
    let inputNic=$('#customernic').val();
    if (CustNic.test(inputNic)){
        $('#lblCustomerNic').text('');
        $('#customernic').css('border','2px solid lime');
        if (input=="Enter"){
            $('#btnCustomer').focus();        }
    }else {
        $('#input_nic').css('border','2px solid red');
        $('#lblCustomerNic').text('Your Input Data format Is Wrong(Ex:-19985678V)');
        $('#customernic').focus();
    }
});


function Customercount() {
    var input=customerTable.length;
    var text=document.getElementById('custCount');
    text.innerText=input;
}











