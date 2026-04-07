

console.log("JS Loaded");
$(document).ready(function () {

    $.ajax({
        url: "https://fakestoreapi.com/products?limit=4",
        method: "GET",
        success: function (data) {
            console.log("Data received:", data);

            $("#featured-container").html(""); // ✅ FIXED ID

            data.forEach(function (product) {

                let card = `
                    <div class="featuredCard">
                        <img src="${product.image}" alt="">
                        <h4>${product.title.substring(0, 40)}...</h4>
                        <p>Rs. ${Math.round(product.price * 280)}</p>

                        <button class="quickViewBtn"
                            data-title="${product.title}"
                            data-description="${product.description}"
                            data-rating="${product.rating.rate}">
                            Quick View
                        </button>
                    </div>
                `;

                $("#featured-container").append(card); // ✅ FIXED ID
            });
        },
        error: function (err) {
            console.log("ERROR:", err);
        }
    });
$(document).on("click", ".quickViewBtn", function () {
    $("#fTitle").text($(this).data("title"));
    $("#fDesc").text($(this).data("description"));
    $("#fRating").text("Rating: " + $(this).data("rating") + " / 5");
    $("#featuredModal").fadeIn();
});

$("#closeModal").click(function () {
    $("#featuredModal").fadeOut();
});

$(window).click(function (e) {
    if ($(e.target).is("#featuredModal")) {
        $("#featuredModal").fadeOut();
    }
});

});
