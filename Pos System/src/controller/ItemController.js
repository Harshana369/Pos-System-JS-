
$('#itemid,#itemname,#itemcategory,#itemprice,#itemqty').on('keydown',function (event){
    if (event.key=="Tab"){
        event.preventDefault();
    }
});



function generateOrderId() {
    try {
        let lastOrderId = itemTable[itemTable.length-1].getItemID();
        let newID = parseInt(lastOrderId.substring(5, 7)) + 1;

        if (newID < 10) {
            $("#itemid").val('I00-00'+newID);
        }else if (newID < 100) {
            $("#itemid").val('I00-0'+newID);
        } else {
            $("#itemid").val('I00-'+newID);
        }
    } catch (e) {
        $("#itemid").val('I00-001');
    }

}



$('#btnItem').click(function () {
    let itmid =$('#itemid').val();
    let itmname =$('#itemname').val();
    let itmcategory =$('#itemcategory').val();
    let itmprice =$('#itemprice').val();


    let res = saveItem(itmid,itmname,itmcategory,itmprice);
    if (res)clearAllItemText();

    generateOrderId();

});

//lode all Item


$('#btnItemDelete').click(function () {
    let itmID = $('#itemid').val();
    let option = confirm(`Do you want to delete ID:${itmID}`);
    if (option){
        let res=deleteItem(itmID);
        if (res){
            alert('Item Delete')
        }else {
            alert('Delete Faild')
        }
    }
    lodeAllItemToTheTable();
    clearAllItemText();
});

$('#btnItemUpdate').click(function () {
    let itmID = $('#itemid').val();
    let itmname = $('#itemname').val();
    let itmcategory = $('#itemcategory').val();
    let itmprice = $('#itemprice').val();


    let option=confirm(`Do you want to Update Item ID:${itmID}`);
    if (option){
        let res= updateItem(itmID,itmname,itmcategory,itmprice);
        if (res){
            alert("item Updated");
        }else{
            alert("Update Faild");
        }
    }
    lodeAllItemToTheTable();
    clearAllItemText();
});

$('#itemid').on('keyup',function (eobj) {
    if (eobj.key == 'Enter'){
        let item = searchItem($(this).val())
        if (item != null) {
            $('#itemid').val(item.getItemID());
            $('#itemname').val(item.getItemName());
            $('#itemcategory').val(item.getItemCategory());
            $('#itemprice').val(item.getItemPrice());

        } else {
            clearAllItemText();
        }

    }

});

$('#btn-Item-clear').click(function () {
    clearAllItemText();
});


//=======================
function saveItem(id,name,category,price,qty) {
    $('#tblItem>tr').off('click');

    let item = new ItemDTO(id,name,category,price);
    itemTable.push(item);

    //lode the table
    lodeAllItemToTheTable();
    return true;
}


//get all Item
function getAllItem() {
    return itemTable;
}

//Delete Item
function deleteItem(id) {
    let item = searchItem(id);
    if (item != null) {
        let indexNumber = itemTable.indexOf(item);
        itemTable.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

//search Item
function searchItem(id) {
    for (var i in itemTable) {
        if (itemTable[i].getItemID() == id) return itemTable[i];
    }
    return null;
}


function updateItem(id,name,category,price,qty) {
    let item = searchItem(id);
    if (item !=null){
        item.setItemName(name)
        item.setItemCategory(category)
        item.setItemPrice(price)
        return true;
    }else{
        return false;
    }
}


//========================
function lodeAllItemToTheTable() {
let allItem = getAllItem();
$('#tblItem').empty();
for (var i in allItem){
    let id = allItem[i].getItemID();
    let name = allItem[i].getItemName();
    let category = allItem[i].getItemCategory();
    let price = allItem[i].getItemPrice();

    var row = `<tr><td>${id}</td><td>${name}</td><td>${category}</td><td>${price}</td></tr>`;
    $('#tblItem').append(row);

    $('#tblItem>tr').click(function () {
        let itemid=$($(this).children().get(0)).text();
        let itemname=$($(this).children().get(1)).text();
        let itemcategory=$($(this).children().get(2)).text();
        let itemprice=$($(this).children().get(3)).text();



        $('#itemid').val(itemid);
        $('#itemname').val(itemname);
        $('#itemcategory').val(itemcategory);
        $('#itemprice').val(itemprice);


    });

    }
}
function clearAllItemText() {
    //$('#itemid').val('');
    $('#itemname').val('');
    $('#itemcategory').val('');
    $('#itemprice').val('');
    $('#itemqty').val('');

    $('#itemid').focus();
}

//================================

let itemid=/^(I00-)[0-9]{1,3}$/;


$("#itemid").on('keydown',function (event){
    var input=(event.key);
    let inputCode=$('#itemid').val();
    if (itemid.test(inputCode)){
        $('#lblItemid').text('');
        $('#itemid').css('border','2px solid lime');
        if (input=="Enter"){
            $('#itemname').focus();
        }
    }else {
        $('#itemid').css('border','2px solid red');
        $('#lblItemid').text('Your Input Data format Is Wrong(I00-001)');
        $('#itemid').focus();
    }
});
//============================

var ItemName=/^[A-Z]{1}[a-z]{1,15}$/;

$("#itemname").on('keydown',function (event){
    var input=(event.key);
    let inputName=$('#itemname').val();
    if (ItemName.test(inputName)){
        $('#lblItemName').text('');
        $('#itemname').css('border','2px solid lime');
        if (input=="Enter"){
            $('#itemcategory').focus();
        }
    }else {
        $('#itemname').css('border','2px solid red');
        $('#lblItemName').text('Your Input Data format Is Wrong(Ex:-Apple)');
        $('#itemname').focus();
    }
});

//=============================

var Itemqty=/^[0-9]{1,9}$/;

$("#itemcategory").on('keydown',function (event){
    var input=(event.key);
    let inputqty=$('#itemcategory').val();
    if (Itemqty.test(inputqty)){
        $('#lblItemCategory').text('');
        $('#itemcategory').css('border','2px solid lime');
        if (input=="Enter"){
            $('#itemprice').focus();
        }
    }else {
        $('#itemcategory').css('border','2px solid red');
        $('#lblItemCategory').text('Your Input Data format Is Wrong(Ex:-400)');
        $('#itemcategory').focus();
    }
});
//===============================

var Itemprice=/^[0-9]{1,9}(.)[0-9]{2}$/;


$("#itemprice").on('keydown',function (event){
    var input=(event.key);
    let inputprice=$('#itemprice').val();
    if (Itemprice.test(inputprice)){
        $('#lblItemPrice').text('');
        $('#itemprice').css('border','2px solid lime');
        if (input=="Enter"){
            $('#btnItem').focus();
        }
    }else {
        $('#itemprice').css('border','2px solid red');
        $('#lblItemPrice').text('Your Input Data format Is Wrong(Ex:-500.00)');
        $('#itemprice').focus();
    }
});

function Itemcount() {
    var input=itemTable.length;
    var text=document.getElementById('itmcount');
    text.innerText=input;
}

