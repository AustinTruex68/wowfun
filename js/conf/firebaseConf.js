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
            charThumb: charData.charRealm,
            checkedAt: d
        });

    },
    getRecentPlayers: function() {
        firebase.database().ref('/recentlyChecked').once('value').then(function(snapshot) {
            var recentPlayers = [];
            for (var key in snapshot.val()) {
                if (snapshot.val().hasOwnProperty(key)) {
                    recentPlayers.push(snapshot.val()[key])
                }
            }

            console.log(recentPlayers[0].checkedAt);

            //push checked values into array
            // var timeCheck = [];
            // for (var i = 0; i < recentPlayers.length; i++) {
            //     timeCheck.push({ time: recentPlayers[i].checkedAt, index: i });
            // }

            // var fiveMostRecent = [];
            // while(fiveMostRecent.length <= 5){

            // }

            // var fiveMostRecent = [];
            // for (var i = 0; i < timeCheck.length; i++) {
            //     var largest = Math.max.apply(Math, timeCheck.map(function(o) {
            //         return o.time;
            //     }));

            // }

            var recentPlayers = snapshot.val();
        });




    }
}
