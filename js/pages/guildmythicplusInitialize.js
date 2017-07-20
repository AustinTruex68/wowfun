$("form").submit(function(e) {
    e.preventDefault();
    var $this = $(this);
    $.post(
        $this.attr("action"),
        $this.serialize(),
        function(data) {
            var parsedData = jQuery.parseJSON(data[0]);
            var guildData = guildConfNS.generateGuildInfo(parsedData);

            $("#guildName").text('<' + guildData[0].guildName + '>' +
                ' - ' + guildData[0].guildRealm);

            $("#guildLevel").text(guildData[0].guildLevel);

            $("#guildAchieve").text(guildData[0].guildAchievePoints);

            $("#guildMemberCount").text(guildData[0].memberList.length);

            if (guildData[0].guildFaction === "Horde") {
                $("#guildImage").attr({
                    src: '../../assets/images/horde.png'
                });
                $("#guildData").addClass('panel-danger');
                $("#selectedCharacterMythicData").addClass('panel-danger');
            } else {
                $("#guildImage").attr({
                    src: '../../assets/images/alliance.png'
                });
                $("#guildData").addClass('panel-info');
                $("#selectedCharacterMythicData").addClass('panel-info');
            }

            $("#guildData").show();
            var generatedHTML = "";

            $.each(guildData[0].memberList, function(index, value) {
                console.log(index);
                var currentGuildie =
                    '<ul id="pagination-demo" class="pagination-sm"></ul>' +
                    '<a class="' + value[0].charName + ' ' + value[0].charRealm + ' guildMemberContainer">' +
                    '<div class="row guildMemberRow">' +
                    '<div class="col-xs-2">' +
                    '<img class="guildMemberImage" onerror="characterConfNS.noAvailableCharImage(this)" alt="guildy picture" src="http://us.battle.net/static-render/us/' + value[0].charThumb + '"></div>' +
                    '<div class="col-xs-2"><p><br>' + value[0].charName + '</p></div>' +
                    '<div class="col-xs-2"><p><br>' + value[0].charLevel + '</p></div>' +
                    '<div class="col-xs-2"><p><br>' + value[0].charRace + '</p></div>' +
                    '<div class="col-xs-2"><p><br>' + value[0].charClass + '</p></div>' +
                    '</div>' +
                    '</a>'

                generatedHTML += currentGuildie;
            });

            $("#guildMembers").html(generatedHTML);

        },
        "json" // The format the response should be in
    );
});

$(document).on('click', "a.guildMemberContainer", function() {
    //make next api call
    var selectedPlayersName = $(this).attr('class').split(' ')[0];
    var selectedPlayersRealm = $(this).attr('class').split(' ')[1];
    //make ajax call with selected character
    $.post("/getCharacterFeed", { realm: selectedPlayersRealm, character: selectedPlayersName }, function(data) {
        var parseSelected = jQuery.parseJSON(data[0]);
        //checks to see if they got any chest loot at all
        var checker = [];
        for (var i = 0; i < parseSelected.feed.length; i++) {
            if (parseSelected.feed[i].context === "challenge-mode-jackpot") {
                var chestItem = parseSelected.feed[i];
            } else {
                checker.push(i);
            }
        }
        if (checker.length === parseSelected.feed.length) {
            console.log("they did nothing!");
            $("#selectedCharMythicRan").text("No Key Found");
        } else {
            $.post("/getJackpotItem", { itemId: chestItem.itemId, bl1: chestItem.bonusLists[0], bl2: chestItem.bonusLists[1], bl3: chestItem.bonusLists[2] }, function(data) {
                var parseItem = jQuery.parseJSON(data[0]);
                $("#selectedCharMythicRan").text(parseItem.nameDescription.substring(0, 10));
            })
        }
        var selectedCharInfo = characterConfNS.generateCharInfo(parseSelected)[0];

        $("#selectedCharName").text(selectedCharInfo.charName);
        $("#selectedCharImage").attr({
            src: 'http://us.battle.net/static-render/us/' + selectedCharInfo.charThumb,
            onerror: "characterConfNS.noAvailableCharImage(this)"
        });
        $("#selectedCharLevel").text(selectedCharInfo.charLevel);
        $("#selectedCharRace").text(selectedCharInfo.charRace);
        $("#selectedCharClass").text(selectedCharInfo.charClass);
        $("#selectedCharacterMythicData").show();
    });
});