firebaseNS = {
    setDbRef: function() {
        var config = {
            apiKey: "AIzaSyD0KD6NbZM7S1LVbDszILBUYxriy8wDz0g",
            authDomain: "wowstatsfun.firebaseapp.com",
            databaseURL: "https://wowstatsfun.firebaseio.com",
            projectId: "wowstatsfun",
            storageBucket: "wowstatsfun.appspot.com",
            messagingSenderId: "585161740253"
        };
        firebase.initializeApp(config);

        return firebase.database();
    },
    postNewCharacter: function(charData) {
        var d = +new Date();
        firebase.database().ref('recentlyChecked').push({
            charName: charData.charName,
            charClass: charData.charClass,
            charFaction: charData.charFaction,
            charGender: charData.charGender,
            charLevel: charData.charLevel,
            charRace: charData.charRace,
            charRealm: charData.charRealm,
            charThumb: charData.charThumb,
            checkedAt: d
        });

    },
    postNewGuild: function(guildData) {
        var d = +new Date();
        firebase.database().ref('recentlyCheckedGuild').push({
            guildName: guildData.guildName,
            guildFaction: guildData.guildFaction,
            guildRealm: guildData.guildRealm,
            guildMemberCount: guildData.memberList.length,
            checkedAt: d
        });
    },
    getRecentPlayers: function() {
        return firebase.database().ref('/recentlyChecked').once('value').then(function(snapshot) {
            var recentPlayers = [];
            for (var key in snapshot.val()) {
                if (snapshot.val().hasOwnProperty(key)) {
                    recentPlayers.push(snapshot.val()[key])
                }
            }
            var timeChecked = [];
            var timeCheckedArray = [];
            for (var i = 0; i < recentPlayers.length; i++) {
                timeChecked.push({ time: recentPlayers[i].checkedAt, index: i });
                timeCheckedArray.push(recentPlayers[i].checkedAt);
            }
            var fiveMostRecent = [];
            while (fiveMostRecent.length <= 5) {
                //find the largest one
                for (var i = 0; i < timeCheckedArray.length; i++) {
                    if (Math.max.apply(Math, timeCheckedArray) === timeChecked[i].time) {
                        var mostRecent = timeChecked[i];
                        //remove it from array
                        timeCheckedArray.splice(i, 1);
                        timeChecked.splice(i, 1);
                        //add it to most recent
                        fiveMostRecent.push(mostRecent);
                    }
                }
                if (fiveMostRecent.length === 5) {
                    break;
                }
            }

            function findByMatchingProperties(set, properties) {
                return set.filter(function(entry) {
                    return Object.keys(properties).every(function(key) {
                        return entry[key] === properties[key];
                    });
                });
            }
            const finalRecentPlayers = [];
            for (var i = 0; i < fiveMostRecent.length; i++) {
                finalRecentPlayers.push(findByMatchingProperties(recentPlayers, { checkedAt: fiveMostRecent[i].time }));
            }
            return finalRecentPlayers;
        });

    },
    getRecentGuilds: function() {
        console.log('here');
        return firebase.database().ref('/recentlyCheckedGuild').once('value').then(function(snapshot) {
            console.log(snapshot.val());
            var recentGuilds = [];
            var recentGuilds = [];
            for (var key in snapshot.val()) {
                if (snapshot.val().hasOwnProperty(key)) {
                    recentGuilds.push(snapshot.val()[key])
                }
            }
            var timeChecked = [];
            var timeCheckedArray = [];
            for (var i = 0; i < recentGuilds.length; i++) {
                timeChecked.push({ time: recentGuilds[i].checkedAt, index: i });
                timeCheckedArray.push(recentGuilds[i].checkedAt);
            }
            var fiveMostRecent = [];
            while (fiveMostRecent.length <= 5) {
                //find the largest one
                for (var i = 0; i < timeCheckedArray.length; i++) {
                    if (Math.max.apply(Math, timeCheckedArray) === timeChecked[i].time) {
                        var mostRecent = timeChecked[i];
                        //remove it from array
                        timeCheckedArray.splice(i, 1);
                        timeChecked.splice(i, 1);
                        //add it to most recent
                        fiveMostRecent.push(mostRecent);
                    }
                }
                if (fiveMostRecent.length === 5) {
                    break;
                }
            }

            function findByMatchingProperties(set, properties) {
                return set.filter(function(entry) {
                    return Object.keys(properties).every(function(key) {
                        return entry[key] === properties[key];
                    });
                });
            }
            const finalRecentGuilds = [];
            for (var i = 0; i < fiveMostRecent.length; i++) {
                finalRecentGuilds.push(findByMatchingProperties(recentGuilds, { checkedAt: fiveMostRecent[i].time }));
            }
            return finalRecentGuilds;

        });
    }
}