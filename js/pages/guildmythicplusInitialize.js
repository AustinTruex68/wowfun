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
            //set up pagination
            var pagePageCount = Math.ceil(guildData[0].memberList.length / 10)

            if (pagePageCount <= 10) {
                var pageVisiblePages = pagePageCount;
            } else {
                var pageVisiblePages = 10;
            }

            $('#guildPagination').twbsPagination({
                totalPages: pagePageCount,
                visiblePages: pageVisiblePages,
                onPageClick: function(event, page) {
                    generatedHTML = "";
                    switch (page) {
                        case 1:
                            var slicer1 = 0;
                            var slicer2 = 10;
                            break;
                        case 2:
                            var slicer1 = 10;
                            var slicer2 = 20;
                            break;
                        case 3:
                            var slicer1 = 20;
                            var slicer2 = 30;
                            break;
                        case 4:
                            var slicer1 = 30;
                            var slicer2 = 40;
                            break;
                        case 5:
                            var slicer1 = 40;
                            var slicer2 = 50;
                            break;
                        case 6:
                            var slicer1 = 50;
                            var slicer2 = 60;
                            break;
                        case 7:
                            var slicer1 = 60;
                            var slicer2 = 70;
                            break;
                        case 8:
                            var slicer1 = 70;
                            var slicer2 = 80;
                            break;
                        case 9:
                            var slicer1 = 80;
                            var slicer2 = 90;
                            break;
                        case 10:
                            var slicer1 = 90;
                            var slicer2 = 100;
                            break;
                    }
                    $.each(guildData[0].memberList.slice(slicer1, slicer2), function(index, value) {
                        var currentGuildie =
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
                }
            });

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