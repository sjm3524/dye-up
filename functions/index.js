const functions = require("firebase-functions");

const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

/*await admin.database().ref('games/').limitToLast(1).once('value', snap => {
		
		snap.forEach((childSnapshot) => {
			var value = childSnapshot.val();
			console.log(value);
			gameId=value.id;
			console.log(value.id);
		}
});*/



exports.addPoint = functions.database.ref('tables/{tableId}/games/{gameId}/points/{pointId}').onCreate( async (snapshot, context) => {
	
			var point = snapshot.val();
					
					console.log(point);
					
					console.log("adding point")
					if(point){
						console.log(point.id);
						if (point.type <1){
							admin.database().ref('users/' + point.id).update({points: admin.database.ServerValue.increment(1)});
						}
						else{
							admin.database().ref('users/' + point.id).update({plunks: admin.database.ServerValue.increment(1)});
							admin.database().ref('users/' + point.id).update({points: admin.database.ServerValue.increment(1)});
						}
						
						var game = await admin.database().ref('/tables/' + context.params.tableId+'/games/' + context.params.gameId).once('value');
						
						if(point.id === game.val().player1 || point.id === game.val().player2){
							admin.database().ref('/tables/' + context.params.tableId+'/games/' + context.params.gameId).update({t1Score: admin.database.ServerValue.increment(1)});
						}
						else{
							admin.database().ref('/tables/' + context.params.tableId+'/games/' + context.params.gameId).update({t2Score: admin.database.ServerValue.increment(1)});
						}
                    }		
		
});

exports.removePoint = functions.database.ref('tables/{tableId}/games/{gameId}/points/{pointId}').onDelete( async (snapshot, context) => {
	
			var point = snapshot.val();
	
					console.log(point);
					
					console.log("removing point")
					if(point){
						console.log(point.id);
						if (point.type <1){
							admin.database().ref('users/' + point.id).update({points: admin.database.ServerValue.increment(-1)});
						}
						else{
							admin.database().ref('users/' + point.id).update({plunks: admin.database.ServerValue.increment(-1)});
							admin.database().ref('users/' + point.id).update({points: admin.database.ServerValue.increment(-1)});
						}
						
						var game = await admin.database().ref('/tables/' + context.params.tableId+'/games/' + context.params.gameId).once('value');
							
						
						
						if(point.id === game.val().player1 || point.id === game.val().player2){
							admin.database().ref('/tables/' + context.params.tableId+'/games/' + context.params.gameId).update({t1Score: admin.database.ServerValue.increment(-1)});
						}
						else{
							admin.database().ref('/tables/' + context.params.tableId+'/games/' + context.params.gameId).update({t2Score: admin.database.ServerValue.increment(-1)});
						}
					}

});
    
	
exports.endGame = functions.database.ref('tables/{tableId}/games/{gameId}/isActive/').onUpdate( async (change, context) => {
	
			var isActive = change.after.val();
			var oldIsActive = change.before.val();

					console.log(isActive);
					console.log(oldIsActive);
					if(isActive == false && oldIsActive ==true){
						var snapshot = await admin.database().ref('/tables/'+context.params.tableId+'/games/' + context.params.gameId).once('value');
						var p1 = snapshot.val().player1;
						var p2 = snapshot.val().player2;
						var p3 = snapshot.val().player3;
						var p4 = snapshot.val().player4;
						var team1 = [p1, p2];
						var team2 = [p3, p4];
						
						team1.sort();
						team2.sort();
						
						
						admin.database().ref('teams/' + team1[0]+"-"+team1[1]).update({gamesPlayed: admin.database.ServerValue.increment(1)});
						admin.database().ref('teams/' + team2[0]+"-"+team2[1]).update({gamesPlayed: admin.database.ServerValue.increment(1)});
						
						
						if (snapshot.val().t1Score > snapshot.val().t2Score){
							admin.database().ref('/users/' + p1).update({wins: admin.database.ServerValue.increment(1)});
							admin.database().ref('users/' + p2).update({wins: admin.database.ServerValue.increment(1)});
							admin.database().ref('/users/' + p3).update({losses: admin.database.ServerValue.increment(1)});
							admin.database().ref('users/' + p4).update({losses: admin.database.ServerValue.increment(1)});
							admin.database().ref('teams/' + team1[0]+"-"+team1[1]).update({wins: admin.database.ServerValue.increment(1)});
						}
						else if(snapshot.val().t1Score < snapshot.val().t2Score){
							admin.database().ref('/users/' + p3).update({wins: admin.database.ServerValue.increment(1)});
							admin.database().ref('users/' + p4).update({wins: admin.database.ServerValue.increment(1)});
							admin.database().ref('/users/' + p1).update({losses: admin.database.ServerValue.increment(1)});
							admin.database().ref('users/' + p2).update({losses: admin.database.ServerValue.increment(1)});
							admin.database().ref('teams/' + team2[0]+"-"+team2[1]).update({wins: admin.database.ServerValue.increment(1)});
						}
						else if(snapshot.val().t1Score == 0 && snapshot.val().t2Score == 0){
							admin.database().ref('/users/' + p1).update({gamesPlayed: admin.database.ServerValue.increment(-1)});
							admin.database().ref('users/' + p2).update({gamesPlayed: admin.database.ServerValue.increment(-1)});
							admin.database().ref('/users/' + p3).update({gamesPlayed: admin.database.ServerValue.increment(-1)});
							admin.database().ref('users/' + p4).update({gamesPlayed: admin.database.ServerValue.increment(-1)});
							admin.database().ref('teams/' + team1[0]+"-"+team1[1]).update({gamesPlayed: admin.database.ServerValue.increment(-1)});
							admin.database().ref('teams/' + team2[0]+"-"+team2[1]).update({gamesPlayed: admin.database.ServerValue.increment(-1)});
						}

						// check for teacup
						if (snapshot.val().t1Score == 7 && snapshot.val().t2Score == 0){
							admin.database().ref('/users/' + p3).update({teacups: admin.database.ServerValue.increment(1)});
							admin.database().ref('/users/' + p4).update({teacups: admin.database.ServerValue.increment(1)});
						}
						else if (snapshot.val().t1Score == 0 && snapshot.val().t2Score == 7) {
							admin.database().ref('/users/' + p2).update({teacups: admin.database.ServerValue.increment(1)});
							admin.database().ref('/users/' + p1).update({teacups: admin.database.ServerValue.increment(1)});
						}
					}
});

exports.createGame = functions.https.onCall((data, context) => {
    const { players = [], tableId = "" } = data;

    createTeams(players, tableId);


    async function createTeams(playersName, tableId){
        var gameRef = await createGame(playersName, tableId);
        
        var gameId= gameRef.key;
        await admin.database().ref('tables/'+tableId+'/games/'+gameId).update({id:gameId});
        console.log(gameId);
        
        var playersId =[]
        for (i=0; i<4; i++){
            var snapshot = await admin.database().ref('/names/' + playersName[i]).once('value');
            if (snapshot.val() == null){
                return alert("The user " + playersName[i] +" does not exist");
            }
            else{
                playersId.push(snapshot.val().uid);
            }
        }
        
        
        admin.database().ref('/users/' + playersId[0]+"/games/").push(gameId);
        admin.database().ref('users/' + playersId[1]+"/games/").push(gameId);
        admin.database().ref('/users/' + playersId[2]+"/games/").push(gameId);
        admin.database().ref('users/' + playersId[3]+"/games/").push(gameId);
        
        var team1 = playersId.slice(0,2);
        var team2= playersId.slice(2);
        
        team1.sort();
        team2.sort();
        
        
        
        
        
        admin.database().ref('teams/' + team1[0]+"-"+team1[1]+"/games/").push(gameId);
        admin.database().ref('teams/' + team2[0]+"-"+team2[1]+"/games/").push(gameId);
    
    }
    async function createGame(playersName, tableId){
				
        var playersId =[]
        var playersObj = [];
    
        for (i=0; i<4; i++){
            var snapshot = await admin.database().ref('/names/' + playersName[i]).once('value');
            if (snapshot.val() == null){
                return alert("The user " + playersName[i] +" does not exist");
            }
            else{
                console.log(playersName[i]);
                console.log(snapshot.val().uid);
                playersId.push(snapshot.val().uid);
            }
        }
         console.log(playersId);
            
        /*for (i=0; i<4; i++){
        var snapshot = await firebase.database().ref('/users/' + playersId[i]).once('value');
            playersObj.push(snapshot.val());
        }
        console.log(playersObj);
        */
        
        admin.database().ref('/users/' + playersId[0]).update({gamesPlayed: admin.database.ServerValue.increment(1)});
        admin.database().ref('users/' + playersId[1]).update({gamesPlayed: admin.database.ServerValue.increment(1)});
        admin.database().ref('/users/' + playersId[2]).update({gamesPlayed: admin.database.ServerValue.increment(1)});
        admin.database().ref('users/' + playersId[3]).update({gamesPlayed: admin.database.ServerValue.increment(1)});
        
        var d = new Date();
        var startTime = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        
        admin.database().ref('tables/'+tableId).update({status: "live"});
        return gameRef = admin.database().ref('tables/'+tableId+'/games/').push({
            player1: playersId[0],
            player2: playersId[1],
            player3: playersId[2],
            player4: playersId[3],
            points: null,
            t1Score: 0,
            t2Score:0,
            isActive: true,
            id: null,
            start: startTime,
        //profile_picture : imageUrl
        });
        
        
    }
  

});
