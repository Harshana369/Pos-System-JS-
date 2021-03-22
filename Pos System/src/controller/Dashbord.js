var dashbord = document.getElementById("dashbord");


var customer = document.getElementById('customer');
customer.style.display='none';

var item = document.getElementById('item');
item.style.display='none';

var order = document.getElementById('order');
order.style.display='none';



var text1=document.getElementById('dashbordbtn');
text1.style.cursor='pointer';

var text2=document.getElementById('customersbtn');
text2.style.cursor='pointer';

var text3=document.getElementById('itemsbtn');
text3.style.cursor='pointer';

var text4=document.getElementById('ordersbtn');
text4.style.cursor='pointer';


text1.addEventListener("click", function () {
    dashbord.style.display='block';
    customer.style.display='none';
    item.style.display='none';
    order.style.display='none';

    Customercount();
    Itemcount();
    Ordercount;
});

text2.addEventListener("click", function () {
    dashbord.style.display='none';
    customer.style.display='block';
    item.style.display='none';
    order.style.display='none';

   generateCustomerID();
   $('#customerid').focus();


});

text3.addEventListener("click", function () {
    dashbord.style.display='none';
    customer.style.display='none';
    item.style.display='block';
    order.style.display='none';

    generateOrderId();
    $('#itemid').focus();

});

text4.addEventListener("click", function () {
    dashbord.style.display='none';
    customer.style.display='none';
    item.style.display='none';
    order.style.display='block';

    loadCustomer();
    loadItem();
});

