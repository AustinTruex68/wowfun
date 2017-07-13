$("form").submit(function(e) {
    e.preventDefault();
    var $this = $(this);
    $.post(
        $this.attr("action"),
        $this.serialize(),
        function(data) {
            console.log(data);
            var parsedData = jQuery.parseJSON(data[0]);

            var charData = characterConfNS.generateCharInfo(parsedData);

            console.log(charData);

            //inject char data
            $('#charName').text(charData[0].charName + ' - ' + charData[0].charRealm);
            $('#charImage').attr({
                src: 'http://us.battle.net/static-render/us/' + charData[0].charThumb
            });
            $('#charLevel').text(charData[0].charLevel);
            $('#charRace').text(charData[0].charRace);
            $('#charClass').text(charData[0].charClass);

            //show character panel
            $('#characterData').show();
        },
        "json" // The format the response should be in
    );
});
