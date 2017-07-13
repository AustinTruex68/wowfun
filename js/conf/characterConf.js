characterConfNS = {
    generateCharInfo: function(parsedData) {
        console.log('Generating Character Info Nicely');
        //set class values
        var classes = [{
            "id": 1,
            "name": "Warrior"
        }, {
            "id": 2,
            "name": "Paladin"
        }, {
            "id": 3,
            "name": "Hunter"
        }, {
            "id": 4,
            "name": "Rogue"
        }, {
            "id": 5,
            "name": "Priest"
        }, {
            "id": 6,
            "name": "Death Knight"
        }, {
            "id": 7,
            "name": "Shaman"
        }, {
            "id": 8,
            "name": "Mage"
        }, {
            "id": 9,
            "name": "Warlock"
        }, {
            "id": 10,
            "name": "Monk"
        }, {
            "id": 11,
            "name": "Druid"
        }, {
            "id": 12,
            "name": "Demon Hunter"
        }];

        //set race values
        var races = [{
            "id": 1,
            "name": "Human"
        }, {
            "id": 2,
            "name": "Orc"
        }, {
            "id": 3,
            "name": "Dwarf"
        }, {
            "id": 4,
            "name": "Night Elf"
        }, {
            "id": 5,
            "name": "Undead"
        }, {
            "id": 6,
            "name": "Tauren"
        }, {
            "id": 7,
            "name": "Gnome"
        }, {
            "id": 8,
            "name": "Troll"
        }, {
            "id": 9,
            "name": "Goblin"
        }, {
            "id": 10,
            "name": "Blood Elf"
        }, {
            "id": 11,
            "name": "Draenei"
        }, {
            "id": 12,
            "name": "Worgen"
        }, {
            "id": 13,
            "name": "Pandaren"
        }];

        //set faction values
        var factions = [{
            "id": 0,
            "name": "Alliance"
        }, {
            "id": 1,
            "name": "Horde"
        }];

        // //set gender values
        var genders = [{
            "id": 0,
            "name": "Male"
        }, {
            "id": 1,
            "name": "Female"
        }];


        // assign the character race
        //races are weird for some reason and some are messed up on the api for worgen and pandas
        if (parsedData.race === 22) {
            var charRaceName = "Worgen";
        } else if (parsedData.race === 24 || parsedData.race === 25 || parsedData.race === 26) {
            var charRaceName = "Pandaren";
        } else {
            var charRaceName = races[parsedData.race - 1].name;
        }
        //assign the character class
        var charClassName = classes[parsedData.class - 1].name;
        //assign the character faction
        var charFactionName = factions[parsedData.faction].name;
        //assign the character gender
        var charGenderName = genders[parsedData.gender].name;
        //assign the character name
        var charName = parsedData.name;
        //assign the character realm
        var charRealmName = parsedData.realm;
        //assignt the character thumbnail
        var charThumb = parsedData.thumbnail;
        //assign the character level
        var charLevel = parsedData.level;


        return [{"charLevel": charLevel, "charClass":charClassName, "charRace":charRaceName, "charFaction":charFactionName, "charGender":charGenderName, "charName":charName, "charRealm":charRealmName, "charThumb":charThumb}];
    }
}
