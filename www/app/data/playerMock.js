// playerMock.js
(function() {
    'use strict';

    angular
        .module('eligcalc.data')
        .service('PlayerMock', playerMock);
	
	function playerMock() {
		var players;
		
		_init();
		return {
			players: players
		};
			
		function _init() {
			players = [
	{
        "ACL": {
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Riverside",
        "CoachEmail": "dbrown@rusd.k12.ca.us",
        "CoachFirstName": "Dennis",
        "CoachLastName": "Brown",
        "CoachPhone": "",
        "Email": "pbsk13@yahoo.com",
        "FirstName": "Ykili",
        "GradYr": 2015,
        "LastName": "Ross",
        "Mobile": "909-287-1494",
        "Phone": "951-241-6900",
        "School": "Riverside Polytech High School",
        "State": "CA",
		"type": "Player",
        "createdAt": "2014-05-22T23:13:03.220Z",
        "objectId": "1bVzlxfe85",
        "updatedAt": "2014-11-03T19:41:19.628Z"
    },
	{
        "ACL": {
            "role:Admin": {
                "read": true,
                "write": true
            }
        },
        "City": "Cerritos",
        "Email": "none",
        "FirstName": "John",
        "GradYr": 2014,
        "LastName": "Lee",
        "School": "El Cerritos HS",
        "State": "CA",
		"type": "Player",
        "createdAt": "2014-10-17T20:39:20.728Z",
        "objectId": "2ApDdg6MQP",
        "updatedAt": "2014-11-03T23:58:55.301Z"
    },
	{
        "ACL": {
            "J6lIB9KGSX": {
                "read": true,
                "write": true
            },
            "role:LongBeachPoly Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Long Beach",
        "FirstName": "De'Andre",
        "GradYr": 2016,
        "LastName": "Pierce",
        "School": "LBP",
        "State": "CA",
		"type": "Player",
        "createdAt": "2015-02-11T17:57:28.344Z",
        "objectId": "2YxXf0Zxwo",
        "updatedAt": "2015-02-17T18:29:23.182Z"
    },
	{
        "ACL": {
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Jacksonville",
        "Email": "@vwayne006",
        "FirstName": "Victor",
        "GradYr": 2015,
        "LastName": "Alexander",
        "School": "Trinity Christian Acadmey",
        "State": "FL",
		"type": "Player",
        "createdAt": "2014-10-22T14:42:35.278Z",
        "objectId": "59BwBjtqqj",
        "testFormat": "SAT",
        "testScore": "780",
        "updatedAt": "2014-11-11T16:42:27.837Z"
    },
	{
        "ACL": {
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Long Beach",
        "Email": "jjwicker@yahoo.com",
        "FirstName": "Joseph",
        "GradYr": 2015,
        "LastName": "Wicker",
        "School": "Long Beach Poly",
        "State": "CA",
		"type": "Player",
        "createdAt": "2014-10-29T17:42:19.576Z",
        "objectId": "5ZPDQlLJTa",
        "updatedAt": "2014-11-10T22:27:42.655Z"
    },
	{
        "ACL": {
            "lypVoBrVnk": {
                "read": true,
                "write": true
            },
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Harbor City",
        "FirstName": "Alexander",
        "GradYr": 2016,
        "LastName": "Akingbulu",
        "School": "Narbonne Sr",
        "State": "CA",
		"type": "Player",
        "createdAt": "2015-03-13T17:37:51.726Z",
        "objectId": "7sahyugUP8",
        "testFormat": "SAT",
        "testScore": "720",
        "updatedAt": "2015-03-16T15:03:15.144Z"
    },
	{
        "ACL": {
            "J6lIB9KGSX": {
                "read": true,
                "write": true
            },
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Long beach",
        "Email": "efesili@lbp.edu",
        "Facebook": "Emmanuel-Fesili",
        "FirstName": "Emmanuel",
        "GradYr": 2016,
        "LastName": "Fesili",
        "Mobile": "562-123-4567",
        "Phone": "562-321-4567",
        "School": "LBP",
        "State": "CA",
        "Twitter": "@samoanguy562",
		"type": "Player",
        "createdAt": "2014-12-09T05:24:39.067Z",
        "isDeleted": false,
        "objectId": "8ir2zBQjpd",
        "testFormat": "ACT",
        "testScore": "78",
        "updatedAt": "2015-04-01T16:03:51.825Z"
    },
	{
        "ACL": {
            "role:Admin": {
                "read": true,
                "write": true
            }
        },
        "City": "",
        "CoachEmail": "",
        "CoachFirstName": "",
        "CoachLastName": "",
        "CoachPhone": "",
        "Email": "",
        "FirstName": "Breland",
        "GradYr": 2016,
        "LastName": "Brandt",
        "Mobile": "",
        "Phone": "",
        "School": "Windward School ",
        "State": "CA",
		"type": "Player",
        "createdAt": "2014-05-22T23:13:02.991Z",
        "objectId": "8vWjc8PW8e",
        "updatedAt": "2014-11-03T23:57:06.668Z"
    },
	{
        "ACL": {
            "XxsCbWgu1S": {
                "read": true,
                "write": true
            },
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "",
        "Email": "jeffleus@gmail.com",
        "FirstName": "Jeff",
        "GradYr": 2015,
        "LastName": "Leininger",
		"type": "Player",
        "createdAt": "2014-11-11T16:37:52.908Z",
        "isDeleted": true,
        "objectId": "92iSwakNJK",
        "updatedAt": "2014-11-11T16:38:18.536Z"
    },
	{
        "ACL": {
            "role:Admin": {
                "read": true,
                "write": true
            }
        },
        "City": "Las Vegas",
        "CoachEmail": "tsanchez@bishopgorman.org",
        "CoachFirstName": "Tony",
        "CoachLastName": "Sanchez",
        "CoachPhone": "(702) 556-7237",
        "Email": "Channel21TuneIn@gmail.com",
        "FirstName": "Cordell",
        "GradYr": 2015,
        "LastName": "Broadus",
        "Mobile": "310-926-3884",
        "Phone": "310-617-5986",
        "School": "Bishop Gorman High School",
        "State": "NV",
		"type": "Player",
        "createdAt": "2014-05-22T23:13:02.993Z",
        "objectId": "BDBdmPW6OL",
        "updatedAt": "2014-11-03T23:58:10.119Z"
    },
	{
        "ACL": {
            "lypVoBrVnk": {
                "read": true,
                "write": true
            },
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "la",
        "Email": "none",
        "FirstName": "Jim",
        "GradYr": 2015,
        "LastName": "Bruin",
        "School": "la hs",
        "State": "ca",
		"type": "Player",
        "createdAt": "2014-11-11T05:54:31.156Z",
        "isDeleted": true,
        "objectId": "BRaV0xsuzd",
        "updatedAt": "2014-11-11T05:54:57.418Z"
    },
	{
        "ACL": {
            "role:UCLA Users": {
                "read": true,
                "write": true
            },
            "yvOX311Ywv": {
                "read": true,
                "write": true
            }
        },
        "City": "La Puente",
        "FirstName": "Tyler",
        "GradYr": 2016,
        "LastName": "Vaughns",
        "School": "Bishop Amat",
        "State": "CA",
		"type": "Player",
        "createdAt": "2015-03-16T16:29:42.177Z",
        "objectId": "Chvz6tdE0l",
        "updatedAt": "2015-03-16T16:30:26.585Z"
    },
	{
        "ACL": {
            "RCtpOlcocx": {
                "read": true,
                "write": true
            },
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Agoura",
        "Email": "none@nowhere.com",
        "FirstName": "Jeff",
        "GradYr": 2015,
        "LastName": "Leininger",
        "School": "aghs",
        "State": "CA",
		"type": "Player",
        "createdAt": "2015-01-12T20:05:24.148Z",
        "isDeleted": true,
        "objectId": "HuHEuqWJLt",
        "updatedAt": "2015-01-12T20:36:56.501Z"
    },
	{
        "ACL": {
            "role:Demo Users": {
                "read": true
            },
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Danville",
        "Email": "N/A",
        "FirstName": "Drury",
        "GradYr": 2015,
        "LastName": "Samia Jr.",
        "School": "San Ramon Valley HS",
        "State": "Ca",
		"type": "Player",
        "createdAt": "2014-10-29T23:23:08.696Z",
        "objectId": "KBhLZyw9yP",
        "updatedAt": "2014-11-02T21:53:02.377Z"
    },
	{
        "ACL": {
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "South Jordan",
        "Email": "",
        "FirstName": "Marcus",
        "GradYr": 2015,
        "LastName": "James",
        "School": "Herriman High School",
        "State": "UT",
		"type": "Player",
        "createdAt": "2014-11-06T22:35:13.642Z",
        "objectId": "KoniMAtYfE",
        "updatedAt": "2014-11-08T06:22:49.096Z"
    },
	{
        "ACL": {
            "lypVoBrVnk": {
                "read": true,
                "write": true
            },
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Pittsburg",
        "FirstName": "Devin",
        "GradYr": 2016,
        "LastName": "Asiasi",
        "School": "De La Salle HS",
        "State": "CA",
		"type": "Player",
        "createdAt": "2015-03-12T18:36:43.810Z",
        "objectId": "Lrc5AiBvXT",
        "updatedAt": "2015-03-12T20:07:16.752Z"
    },
	{
        "ACL": {
            "XxsCbWgu1S": {
                "read": true,
                "write": true
            },
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Agoura",
        "Email": "none",
        "FirstName": "Joe",
        "GradYr": 2015,
        "LastName": "Bruin",
        "School": "AHHS",
        "State": "CA",
		"type": "Player",
        "createdAt": "2014-11-08T05:59:47.505Z",
        "isDeleted": true,
        "objectId": "NPwfpI0Z0z",
        "updatedAt": "2014-11-08T06:21:41.973Z"
    },
	{
        "ACL": {
            "J6lIB9KGSX": {
                "read": true,
                "write": true
            },
            "role:LongBeachPoly Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Long Beach",
        "Email": "none",
        "FirstName": "Jospeh",
        "GradYr": 2015,
        "LastName": "Wicker",
        "School": "Long Beach Poly",
        "State": "CA",
		"type": "Player",
        "createdAt": "2015-01-14T14:15:17.440Z",
        "isDeleted": true,
        "objectId": "PQBSYvyHY9",
        "updatedAt": "2015-01-14T19:38:00.340Z"
    },
	{
        "ACL": {
            "RCtpOlcocx": {
                "read": true,
                "write": true
            },
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Chandler",
        "Email": "cassiuspeat@yahoo.com",
        "FirstName": "Cassius",
        "GradYr": 2015,
        "LastName": "Peat",
        "School": "Corona Del Sol High School",
        "State": "AZ",
		"type": "Player",
        "createdAt": "2014-12-05T19:36:35.969Z",
        "objectId": "QALFWiQcDb",
        "testFormat": "ACT",
        "testScore": "80",
        "updatedAt": "2014-12-05T21:05:06.126Z"
    },
	{
        "ACL": {
            "role:Admin": {
                "read": true,
                "write": true
            },
            "role:Coach": {
                "read": true
            }
        },
        "City": "Hoover",
        "CoachEmail": "jniblett@hoover.k12.al.us",
        "CoachFirstName": "Josh",
        "CoachLastName": "Niblett",
        "CoachPhone": "2052966101",
        "Email": "cbell0316@gmail.com",
        "FirstName": "Christian",
        "GradYr": 2014,
        "LastName": "Bell",
        "Mobile": "205-396-4881",
        "Phone": "",
        "School": "Hoover High School",
        "State": "AL",
		"type": "Player",
        "createdAt": "2014-05-22T23:13:02.985Z",
        "objectId": "RA569lRPNo",
        "updatedAt": "2014-11-03T23:17:20.499Z"
    },
	{
        "ACL": {
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Jacksonville",
        "CoachEmail": "vdorminey@tbc.edu",
        "CoachFirstName": "Verlon",
        "CoachLastName": "Dorminey",
        "CoachPhone": "904-616-5921",
        "Email": "@holland_jeffery",
        "FirstName": "Jeffrey",
        "GradYr": 2015,
        "LastName": "Holland",
        "Mobile": "904-377-1084",
        "Phone": "",
        "School": "Trinity Christian Academy",
        "State": "FL",
		"type": "Player",
        "createdAt": "2014-05-22T23:13:03.059Z",
        "objectId": "SDcOLmOHHe",
        "updatedAt": "2014-10-23T16:52:49.600Z"
    },
	{
        "ACL": {
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Mission Hills",
        "Email": "",
        "FirstName": "Dominic",
        "GradYr": 2015,
        "LastName": "Davis",
        "School": "Bishop Alemany HS",
        "State": "CA",
		"type": "Player",
        "createdAt": "2014-11-07T20:42:40.120Z",
        "objectId": "Uf5yDe5mak",
        "testFormat": "ACT",
        "testScore": "41",
        "updatedAt": "2014-11-11T04:26:10.764Z"
    },
	{
        "ACL": {
            "role:UCLA Users": {
                "read": true,
                "write": true
            },
            "yvOX311Ywv": {
                "read": true,
                "write": true
            }
        },
        "City": "Los Angeles",
        "FirstName": "Tre",
        "GradYr": 2016,
        "LastName": "Polamalu",
        "School": "Loyola high school",
        "State": "CA",
		"type": "Player",
        "createdAt": "2015-04-01T01:13:27.017Z",
        "objectId": "V7Wao7f0vY",
        "updatedAt": "2015-04-01T01:13:27.017Z"
    },
	{
        "ACL": {
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Dupont",
        "CoachEmail": "dmiller@cloverpark.k12.wa.us",
        "CoachFirstName": "Dave",
        "CoachLastName": "Miller",
        "CoachPhone": "253-230-0785",
        "Email": "sherryaleki@yahoo.com",
        "FirstName": "Benning",
        "GradYr": 2015,
        "LastName": "Potoa'e",
        "Mobile": "253-753-5164",
        "Phone": "253-573-5164",
        "School": "Lakes High School",
        "State": "WA",
		"type": "Player",
        "createdAt": "2014-05-22T23:13:03.198Z",
        "objectId": "VXw0hKjha3",
        "updatedAt": "2014-10-23T16:52:33.587Z"
    },
	{
        "ACL": {
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Lakeland",
        "CoachEmail": "wpeace@lcsonline.org",
        "CoachFirstName": "Wayne",
        "CoachLastName": "Peace",
        "CoachPhone": "863-712-2637",
        "Email": "",
        "FirstName": "T.J.",
        "GradYr": 2015,
        "LastName": "Simmons",
        "Mobile": "863-808-3148",
        "Phone": "",
        "School": "Lakeland Christian School",
        "State": "FL",
		"type": "Player",
        "createdAt": "2014-05-22T23:13:03.233Z",
        "objectId": "YX5HNLVvTS",
        "updatedAt": "2014-11-03T19:40:06.265Z"
    },
	{
        "ACL": {
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Elk Grove",
        "CoachEmail": "",
        "CoachFirstName": "",
        "CoachLastName": "",
        "CoachPhone": "",
        "Email": "ltrain15@gmail.com",
        "FirstName": "L.J.",
        "GradYr": 2015,
        "LastName": "Reed",
        "Mobile": "916-877-1712",
        "Phone": "916-585-1932",
        "School": "Cosumnes Oaks High School",
        "State": "CA",
		"type": "Player",
        "createdAt": "2014-05-22T23:13:03.203Z",
        "isDeleted": true,
        "objectId": "ZA2tQcCXuO",
        "updatedAt": "2014-11-11T16:21:30.250Z"
    },
	{
        "ACL": {
            "role:UCLA Users": {
                "read": true,
                "write": true
            },
            "yvOX311Ywv": {
                "read": true,
                "write": true
            }
        },
        "City": "La Puente",
        "FirstName": "Trevon",
        "GradYr": 2016,
        "LastName": "Sidney",
        "School": "Bishop Amat",
        "State": "California",
		"type": "Player",
        "createdAt": "2015-03-16T17:13:37.593Z",
        "objectId": "ZanICOl8W2",
        "updatedAt": "2015-03-16T17:13:37.593Z"
    },
	{
        "ACL": {
            "XxsCbWgu1S": {
                "read": true,
                "write": true
            },
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Lodi",
        "FirstName": "LJ",
        "GradYr": 2015,
        "LastName": "Reed",
        "School": "Lodi",
        "State": "CA",
		"type": "Player",
        "createdAt": "2015-02-06T04:02:01.783Z",
        "objectId": "ZjEzEOnqpI",
        "testFormat": "ACT",
        "updatedAt": "2015-02-06T04:05:27.149Z"
    },
	{
        "ACL": {
            "RCtpOlcocx": {
                "read": true,
                "write": true
            },
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Agoura",
        "Email": "test@test.com",
        "FirstName": "Jeff",
        "GradYr": 2015,
        "LastName": "Leininger",
        "School": "Agoura HS",
        "State": "CA",
		"type": "Player",
        "createdAt": "2015-01-12T20:40:21.501Z",
        "isDeleted": true,
        "objectId": "ab73xMSPj3",
        "updatedAt": "2015-01-12T20:40:25.269Z"
    },
	{
        "ACL": {
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "g",
        "Email": "none",
        "FirstName": "Jeff",
        "GradYr": 2015,
        "LastName": "Leininger",
        "School": "none",
        "State": "ca",
		"type": "Player",
        "createdAt": "2014-11-03T20:48:37.036Z",
        "isDeleted": true,
        "objectId": "bOPTZuLpY0",
        "updatedAt": "2014-11-03T23:05:50.751Z"
    },
	{
        "ACL": {
            "RCtpOlcocx": {
                "read": true,
                "write": true
            },
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "FirstName": "Jeff",
        "GradYr": 2015,
        "LastName": "Leininger",
		"type": "Player",
        "createdAt": "2015-01-12T20:55:52.468Z",
        "isDeleted": true,
        "objectId": "d94QJ3C9v0",
        "updatedAt": "2015-01-12T20:55:57.464Z"
    },
	{
        "ACL": {
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Jacksonville",
        "CoachEmail": "vdorminey@tbc.edu",
        "CoachFirstName": "Verlon",
        "CoachLastName": "Dorminey",
        "CoachPhone": "904-616-5921",
        "Email": "deontai_williiams@ymail.com",
        "FirstName": "Joseph",
        "GradYr": 2015,
        "LastName": "Williams",
        "Mobile": "904-444-1587",
        "Phone": "",
        "School": "Trinity Christian Academy",
        "State": "FL",
		"type": "Player",
        "createdAt": "2014-05-22T23:13:03.317Z",
        "objectId": "eL11Ge6zhu",
        "updatedAt": "2014-10-29T23:22:29.112Z"
    },
	{
        "FirstName": "Garrett",
        "LastName": "Leininger",
        "createdAt": "2015-10-16T05:01:41.231Z",
        "objectId": "f5IYuhNool",
        "updatedAt": "2015-10-16T05:01:41.231Z"
    },
	{
        "ACL": {
            "role:Admin": {
                "read": true,
                "write": true
            }
        },
        "City": "Pembroke Pines",
        "CoachEmail": "rocco.casullo@aquinas-sta.org",
        "CoachFirstName": "Rocco",
        "CoachLastName": "Casullo",
        "CoachPhone": "954-655-2626",
        "Email": "rashardcausey@yahoo.com",
        "FirstName": "Rashard",
        "GradYr": 2015,
        "LastName": "Causey",
        "Mobile": "786-375-1719",
        "Phone": "",
        "School": "Saint Thomas Aquinas School",
        "State": "FL",
		"type": "Player",
        "createdAt": "2014-05-22T23:13:03.012Z",
        "objectId": "hDIukCjw9S",
        "updatedAt": "2014-11-03T23:58:34.308Z"
    },
	{
        "ACL": {
            "J6lIB9KGSX": {
                "read": true,
                "write": true
            },
            "role:LongBeachPoly Users": {
                "read": true,
                "write": true
            }
        },
        "City": "LB",
        "Email": "None",
        "FirstName": "Omar",
        "GradYr": 2015,
        "LastName": "Lyles",
        "School": "LBP",
        "State": "CA",
		"type": "Player",
        "createdAt": "2015-01-14T15:38:46.542Z",
        "isDeleted": true,
        "objectId": "iTKYhe4VHa",
        "updatedAt": "2015-01-14T19:38:08.428Z"
    },
	{
        "ACL": {
            "role:Admin": {
                "read": true,
                "write": true
            }
        },
        "FirstName": "Matt",
        "GradYr": 2015,
        "LastName": "Adamson",
        "createdAt": "2014-06-05T19:09:37.908Z",
        "objectId": "jUfXMNibL5",
        "updatedAt": "2014-11-03T23:19:49.182Z"
    },
	{
        "ACL": {
            "role:Admin": {
                "read": true,
                "write": true
            }
        },
        "City": "",
        "CoachEmail": "saltenberg@serrahighschool.com",
        "CoachFirstName": "Scott",
        "CoachLastName": "Altenberg",
        "CoachPhone": "",
        "Email": "",
        "FirstName": "Brandon",
        "GradYr": 2016,
        "LastName": "Burton",
        "Mobile": "",
        "Phone": "",
        "School": "Junipero Serra High School",
        "State": "CA",
		"type": "Player",
        "createdAt": "2014-05-22T23:13:03.004Z",
        "objectId": "jZx3lcSpxH",
        "updatedAt": "2014-11-03T23:58:23.739Z"
    },
	{
        "ACL": {
            "lypVoBrVnk": {
                "read": true,
                "write": true
            },
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Long Beach",
        "FirstName": "Jackie",
        "GradYr": 2016,
        "LastName": "Jones",
        "School": "Long Beach Poly",
        "State": "CA",
		"type": "Player",
        "createdAt": "2015-03-12T18:02:08.916Z",
        "objectId": "k4Ub5BV7PM",
        "updatedAt": "2015-03-12T18:06:36.466Z"
    },
	{
        "ACL": {
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Valencia",
        "Email": "jays12packofwinsos@yahoo.com",
        "FirstName": "Jay Jay",
        "GradYr": 2014,
        "LastName": "Wilson",
        "School": "Valencia HS",
        "State": "CA",
		"type": "Player",
        "createdAt": "2014-10-23T04:10:16.067Z",
        "objectId": "mv7NypepVD",
        "updatedAt": "2014-10-31T05:22:11.057Z"
    },
	{
        "FirstName": "Garrett",
        "LastName": "Leininger",
        "createdAt": "2015-10-16T05:00:08.172Z",
        "objectId": "nghTO5X5fB",
        "updatedAt": "2015-10-16T05:00:08.172Z"
    },
	{
        "ACL": {
            "RCtpOlcocx": {
                "read": true,
                "write": true
            },
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "LA",
        "Email": "none",
        "FirstName": "Joe",
        "GradYr": 2015,
        "LastName": "Bruin",
        "School": "LA HS",
        "State": "CA",
		"type": "Player",
        "createdAt": "2014-11-11T15:08:55.375Z",
        "isDeleted": true,
        "objectId": "ohylR6yvgn",
        "updatedAt": "2014-11-11T16:21:20.726Z"
    },
	{
        "ACL": {
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Desoto",
        "Email": "icegod34@gmail.com",
        "FirstName": "Bryce",
        "GradYr": 2015,
        "LastName": "English",
        "School": "DeSoto High School",
        "State": "TX",
		"type": "Player",
        "createdAt": "2014-10-23T04:08:18.944Z",
        "objectId": "sZqmQeKO7t",
        "updatedAt": "2014-11-03T18:29:39.498Z"
    },
	{
        "ACL": {
            "lypVoBrVnk": {
                "read": true,
                "write": true
            },
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "test",
        "Email": "none",
        "FirstName": "Joe",
        "GradYr": 2015,
        "LastName": "Bruin",
        "School": "test hs",
        "State": "CA",
		"type": "Player",
        "createdAt": "2014-11-11T05:44:10.824Z",
        "isDeleted": true,
        "objectId": "tmhaGZinyj",
        "updatedAt": "2014-11-11T05:54:58.205Z"
    },
	{
        "ACL": {
            "role:Admin": {
                "read": true,
                "write": true
            }
        },
        "City": "Terrytown",
        "CoachEmail": "jroth@rummelraiders.com",
        "CoachFirstName": "Jay",
        "CoachLastName": "Roth",
        "CoachPhone": "",
        "Email": "krisfulton24@gmail.com",
        "FirstName": "Kristian",
        "GradYr": 2016,
        "LastName": "Fulton",
        "Mobile": "504-729-8993",
        "Phone": "",
        "School": "Archbishop Rummel",
        "State": "LA",
        "createdAt": "2014-05-22T23:13:03.036Z",
        "objectId": "uvtotFjnUo",
        "updatedAt": "2014-11-03T23:58:42.858Z"
    },
	{
        "ACL": {
            "J6lIB9KGSX": {
                "read": true,
                "write": true
            },
            "role:LongBeachPoly Users": {
                "read": true,
                "write": true
            }
        },
        "City": "LB",
        "Email": "None",
        "FirstName": "Jackie",
        "GradYr": 2016,
        "LastName": "Jones",
        "School": "LBP",
        "State": "CA",
		"type": "Player",
        "createdAt": "2015-01-14T18:51:58.707Z",
        "objectId": "vnhBRllAdZ",
        "updatedAt": "2015-01-14T18:51:58.707Z"
    },
	{
        "ACL": {
            "lypVoBrVnk": {
                "read": true,
                "write": true
            },
            "role:UCLA Users": {
                "read": true,
                "write": true
            }
        },
        "City": "Honolulu",
        "FirstName": "Michael",
        "GradYr": 2016,
        "LastName": "Elitise",
        "School": "Kaiser HS",
        "State": "HI",
		"type": "Player",
        "createdAt": "2015-03-12T17:09:56.330Z",
        "objectId": "y7lRmMScDw",
        "updatedAt": "2015-03-12T17:51:57.163Z"
    },
	{
        "FirstName": "Garrett",
        "LastName": "Leininger",
        "createdAt": "2015-10-16T05:00:09.764Z",
        "objectId": "z0B1MtcEb2",
        "updatedAt": "2015-10-16T05:00:09.764Z"
    } ]; 
		}
	}
})();