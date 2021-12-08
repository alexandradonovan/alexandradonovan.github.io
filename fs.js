const fs = require('fs');

let ratSightings = [];

let peeps_csv = fs.readFileSync('ratSightings.csv', 'utf8');
let peeps = peeps_csv.split("\n");

let zipArray = ["10001", "10002", "10003", "10004", "10005", "10006", "10007", "10008", "10009", "10010", "10011"];
let singleZipData = [];

zipArray.forEach(function(zip){
  singleZipData.push([]);
});

peeps.forEach(function(peep) {
  let ratSightings_info = peep.split(',');
  let ratSighting = {};
  ratSighting['Incident_Zip'] = ratSightings_info[0];
  ratSighting['X Coordinate (State Plane)'] = ratSightings_info[1];
  ratSighting['Y Coordinate (State Plane)'] = ratSightings_info[2];
  ratSighting['Latitude'] = ratSightings_info[3];
  ratSighting['Longitude'] = ratSightings_info[4];
  ratSighting['Location'] = ratSightings_info[5];


  ratSightings.push(ratSighting);

  zipArray.forEach(function(zip,index){
    if(ratSightings_info[0] === zip){
      singleZipData[index].push(ratSighting);
    }
  });
});

fs.writeFileSync('ratSightings.json', JSON.stringify(ratSightings), 'utf8');
zipArray.forEach(function(zip,index){
  fs.writeFileSync(''+zip+'.json',JSON.stringify(singleZipData[index]),'utf8');
});
