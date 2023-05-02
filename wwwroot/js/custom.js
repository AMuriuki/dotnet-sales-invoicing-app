var products = []

$(function () {
    $.ajax({
        url: '/Sales/GetProducts',
        method: 'GET',
        success: function (response) {
            products = response;

            var productNames = $.map(products, function (product) {
                return product['name'] + " - " + product['sku'];
            });

            $("#selectProduct").autocomplete({
                source: productNames,
            });
        },
        error: function () {
            console.log("Failed to get products");
        }
    })
})

$("#selectProduct").on("autocompleteselect", function (event, ui) {
    var selectedValue = ui.item.value;
    var skuIndex = selectedValue.lastIndexOf(" - ") + 3;
    var selectedSku = selectedValue.substring(skuIndex);

    var selectedProduct = products.find(function (product) {
        return product.sku === selectedSku;
    });

    
});