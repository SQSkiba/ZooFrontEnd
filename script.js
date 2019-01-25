var animalPopulation = 0;
var allAnimals = [];


$(document).ready(function(){
    var tigger = new Tiger ("Tigger");
    var pooh = new Bear("Pooh");
    var rarity = new Unicorn("Rarity");
    var gemma = new Giraffe("Gemma");
    var stinger = new Bee("Stinger");

    allAnimals.push(tigger, pooh, rarity,gemma,stinger);
    console.log(allAnimals);

    listAnimals();

    $("#feed").click(function(){
        feedAnimals();
    });
    $("#createAnimal").click(function(){
        createAnimal();
    });
    $("#" + allAnimals.name).click(function(){
        allAnimals.splice()
    });
});


function createAnimal() {
    var animalType = $("#animalSelector").val();
    var animal;
    var bank = $("#animalName").val();
    switch (parseInt(animalType)) {
        case 0:
            $("#myDiv").append("Please Select Animal Type" + '<br>');
            break;
        case 1:
            animal = new Tiger(bank);
            break;
        case 2:
            animal = new Giraffe(bank);
            break;
        case 3:
            animal = new Unicorn(bank);
            break;
        case 4:
            animal = new Bee(bank);
            break;
        case 5:
            animal = new Bear(bank);
            break;
    }
    allAnimals.push(animal);
    if (animal.name == "") {
        $("#log").append("Error. Please choose a name" + "<br>")
    } else {
        $("#log").append(animal.name + " was created" + "<br>");
    }
    listAnimals();
}

function deleteAnimals(name){
    for(var i=0; i<allAnimals.length; i++){
        if(allAnimals[i].name == name){
            $("#log").append(allAnimals[i].name + " was deleted " + "<br>");
            allAnimals.splice(i,1);

        }
    }
    listAnimals();
}

function feedAnimals(){
    $("#myDiv").empty();
    //var food = $("#food").val();
    var food = $("#foods option:selected").text();
    for(var i=0; i<allAnimals.length;i++){
        if(food!==0){
            allAnimals[i].eat(food);
        } else {
            $("#myDiv").append("error; please select meal")
        }
    }


}
function listAnimals(){
    $("#table").empty();
    $("#table").append("<tr><td>" + "Name:" + "</td><td>" + "Species: " + "</td><td>" +"Favorite Food:" + "</td></tr>");

    for(var i=0; i<allAnimals.length; i++){
        console.log(allAnimals[i]);
        $("#table").append("<tr onclick='deleteAnimals(this.id)' id='" + allAnimals[i].name + "'><td> " + allAnimals[i].name + " </td>" + " <td>" + allAnimals[i].constructor.name + "</td><td>" + allAnimals[i].favoriteFood +"</td></tr>");
    }
}

class Zookeeper {
    constructor(name) {
        this.name = name;
    }
    feedAnimals(animals,food) {
        //console.log(this.name + " is feeding " + food + " to " + animals.length + " animals out of " + animalPopulation + " total animals");
        $("#myDiv").append(this.name + " is feeding " + food + " to " + animals.length + " animals out of " + animalPopulation + " total animals" + "<br>");
        for (var i=0; i<animals.length; i++) {
            animals[i].eat(food);
        }
    }
}
class Animal {
    constructor(name, favoriteFood) {
        this.name = name;
        this.favoriteFood=favoriteFood;
        animalPopulation++;
    }
    sleep(){
        //console.log(this.name + " sleeps for 8 hours")
        $("#myDiv").append(this.name + " sleeps for 8 hours" + "<br>")
    }
    eat(food){
        $("#myDiv").append(this.name + " eats "+ food + "<br>");
        food==this.favoriteFood ? $("#myDiv").append(" YUM!!! " + this.name + " wants more " + food + "<br>"): this.sleep();
    }
    static getPopulation(){
        return animalPopulation;
    }

}

class Tiger extends Animal {
    constructor(name) {
        super(name,"meat");
    }
}

class Bear extends Animal{
    constructor(name) {
        super(name, "fish");
    }
    sleep(){
        $("#myDiv").append(this.name + " hibernates for 4 months" + "<br>");
    }
}
class Unicorn extends Animal {
    constructor(name) {
        super(name,"marshmallows");
    }
    sleep(){
        $("#myDiv").append((this.name + " sleeps in a cloud" + "<br>"));
    }
    eat(food){
        if (food==this.favoriteFood ){
            $("#myDiv").append("YUM!!! " + this.name + " wants more " + food + "<br>");
            this.sleep();
        } else {
            super.eat(food);
        }
    }
}

class Giraffe extends Animal {
    constructor(name) {
        super(name,"leaves");
    }
    eat(food){
        if(food!== this.favoriteFood){
            $("#myDiv").append(" YUCK!!! " + this.name + " will not eat " + food + "<br>");
        } else {
            super.eat("leaves");
        }
    }
}

class Bee extends Animal {
    constructor(name) {
        super(name,"pollen");
    }

    eat(food) {
        if (food !== this.favoriteFood) {
            $("#myDiv").append(" YUCK!!! " + this.name + " will not eat " + food + "<br>")
        } else {
            super.eat("pollen");
            this.sleep();
        }
    }
    sleep(){
        $("#myDiv").append(this.name + " never sleeps" + "<br>");
    }
}