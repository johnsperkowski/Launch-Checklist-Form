// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/


window.onload = init;
function init() {
   let form = document.getElementById("launchForm");
   form.addEventListener("submit", function(event){
      let pilotName = document.querySelector("input[name=pilotName]");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel");
      let cargoMass = document.querySelector("input[name=cargoMass]");

      if(pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === ""){
         alert("All fields required!");
         event.preventDefault();
      }
      else if(!isNaN(pilotName.value) || !isNaN(copilotName.value) || /\D/.test(fuelLevel.value) || /\D/.test(cargoMass.value)){
         alert("Please enter valid data.");
         event.preventDefault();
      }

      document.getElementById("pilotStatus").innerHTML = `${pilotName.value} Ready`;
      document.getElementById("copilotStatus").innerHTML = `${copilotName.value} Ready`;
      let faulty = document.getElementById("faultyItems");
      if(fuelLevel.value < 10000){
         faulty.style.visibility = "visible";
         document.getElementById("fuelStatus").innerHTML = "NOT enough fuel for journey";
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";
      }
      if(cargoMass.value > 10000){
         faulty.style.visibility = "visible";
         document.getElementById("cargoStatus").innerHTML = "Too much mass for shuttle take off!";
         document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
         document.getElementById("launchStatus").style.color = "red";
      }
      if(fuelLevel.value > 10000 && cargoMass.value < 10000){
         document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch";
         document.getElementById("launchStatus").style.color = "green";
      }

      


      event.preventDefault();
   });

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         const mission = document.getElementById("missionTarget");
         let i = Math.floor(Math.random() * json.length);
         mission.innerHTML = `
         <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[i].name}</li>
               <li>Diameter: ${json[i].diameter}</li>
               <li>Star: ${json[i].star}</li>
               <li>Distance from Earth: ${json[i].distance}</li>
               <li>Number of Moons: ${json[i].moons}</li>
            </ol>
         <img src="${json[i].image}">
         `;
      });
   });

}

