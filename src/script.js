function calc() {
    var quantities = document.getElementsByName("quantity");
    var output = document.getElementById("output");
    var nameClient = document.getElementById("inputName").value;

    var totalGeral = 0;
    var listOrder = "";

    for (var input of quantities) {
        var quantity = parseInt(input.value);

        if (quantity > 0) {
            var card = input.closest(".optionCard");
            var titulo = card.querySelector(".dishTitle").innerText;
            var textPrice = card.querySelector(".dishPrice").innerText;

            var priceUnit = parseFloat(textPrice.replace("R$ ", "").replace(",", "."));
            var totalItem = priceUnit * quantity;
            totalGeral += totalItem;

            listOrder += `<li>Prato: ${titulo} - Preço unitário: R$ ${priceUnit} - Quantidade: ${quantity} - Total: R$ ${totalItem}.</li>`;
        }
    }
    var name = nameClient !== "" ? nameClient : "Cliente";

    output.innerHTML = `
      <p>Caro <strong>${name}</strong></p>
      <br>
      <p>Seguem os dados do seu pedido.</p>
      <br>
      <p>O seu pedido é:</p>
      <ul>
        ${listOrder}
      </ul>
      <br>
      <h3>Preço final R$ ${totalGeral}</h3>
    `;
}

function wcqib_refresh_quantity_increments() {
    jQuery("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").each(function (a, b) {
        var c = jQuery(b);
        c.addClass("buttons_added"), c.children().first().before('<input type="button" value="-" class="minus" />'), c.children().last().after('<input type="button" value="+" class="plus" />')
    })
}
String.prototype.getDecimals || (String.prototype.getDecimals = function () {
    var a = this,
        b = ("" + a).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return b ? Math.max(0, (b[1] ? b[1].length : 0) - (b[2] ? +b[2] : 0)) : 0
}), jQuery(document).ready(function () {
    wcqib_refresh_quantity_increments()
}), jQuery(document).on("updated_wc_div", function () {
    wcqib_refresh_quantity_increments()
}), jQuery(document).on("click", ".plus, .minus", function () {
    var a = jQuery(this).closest(".quantity").find(".qty"),
        b = parseFloat(a.val()),
        c = parseFloat(a.attr("max")),
        d = parseFloat(a.attr("min")),
        e = a.attr("step");
    b && "" !== b && "NaN" !== b || (b = 0), "" !== c && "NaN" !== c || (c = ""), "" !== d && "NaN" !== d || (d = 0), "any" !== e && "" !== e && void 0 !== e && "NaN" !== parseFloat(e) || (e = 1), jQuery(this).is(".plus") ? c && b >= c ? a.val(c) : a.val((b + parseFloat(e)).toFixed(e.getDecimals())) : d && b <= d ? a.val(d) : b > 0 && a.val((b - parseFloat(e)).toFixed(e.getDecimals())), a.trigger("change")
});

