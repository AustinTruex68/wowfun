$(function() {
    var availableRealms = [
        "Tichondrius",
        "Darrowmere",
        "Wyrmrest Accord",
        "Moon Guard"
    ];
    $("#realms").autocomplete({
        source: availableRealms
    });
});
