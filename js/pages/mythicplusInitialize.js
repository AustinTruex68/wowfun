$("form").submit(function(e) {
    e.preventDefault();
    var $this = $(this);
    $.post(
        $this.attr("action"),
        $this.serialize(),
        function(data) {
            console.log(data);
            var parsedData = jQuery.parseJSON(data[0]);

            var charData = characterConfNS.generateCharInfo(parsedData, false);

            console.log(charData);
            firebaseNS.postNewCharacter(charData[0]);
            //inject char data
            $('#charName').text(charData[0].charName + ' - ' + charData[0].charRealm);
            $('#charImage').attr({
                src: 'http://us.battle.net/static-render/us/' + charData[0].charThumb,
                onerror: "characterConfNS.noAvailableCharImage(this)"
            });
            $('#charLevel').text(charData[0].charLevel);
            $('#charRace').text(charData[0].charRace);
            $('#charClass').text(charData[0].charClass);

            //adjust panel based on faction
            if (charData[0].charFaction === "Horde") {
                $('#characterData').addClass('panel-danger');
                $('#characterDungeonData').addClass('panel-danger');
            } else {
                $('#characterData').addClass('panel-info');
                $('#characterDungeonData').addClass('panel-info');
            }


            //show character panel
            $('#characterData').show();
            //show character dungeon data
            $('#characterDungeonData').show();

            //call the character achievement data
            $.post("/achieveData", { realm: charData[0].charRealm, character: charData[0].charName }, function(data) {
                var parseAchieve = jQuery.parseJSON(data[0]);
                var charMythicData = mythicPlusConfNS.generateMythicPlus(parseAchieve);

                if (typeof charMythicData[0].plusTwos === 'undefined') {
                    $('#plusTwos').text('0');
                    var twos = 0;
                } else {
                    $('#plusTwos').text(charMythicData[0].plusTwos);
                    var twos = charMythicData[0].plusTwos;
                }
                if (typeof charMythicData[0].plusFives === 'undefined') {
                    $('#plusFives').text('0');
                    var fives = 0;
                } else {
                    $('#plusFives').text(charMythicData[0].plusFives);
                    var fives = charMythicData[0].plusFives;
                }
                if (typeof charMythicData[0].plusTens === 'undefined') {
                    $('#plusTens').text('0');
                    var tens = 0;
                } else {
                    $('#plusTens').text(charMythicData[0].plusTens);
                    var tens = charMythicData[0].plusTens;
                }
                if (typeof charMythicData[0].plusFifteens === 'undefined') {
                    $('#plusFifteens').text('0');
                    var fifteens = 0;
                } else {
                    $('#plusFifteens').text(charMythicData[0].plusFifteens);
                    var fifteens = charMythicData[0].plusFifteens;
                }
                var total = twos + fives + tens + fifteens;

                $('#totalPlus').text(total);

            });
        },
        "json" // The format the response should be in
    );

});
