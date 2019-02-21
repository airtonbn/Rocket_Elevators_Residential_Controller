
class Elevators {
    constructor(numElevators, floorNumber) {
        this.numElevators = numElevators;
        this.currentFloor = 1;
        this.direction = null;
        this.status = "idle";
        this.floorList = [];
        this.internalBtnList = [];
        for (let j = 1; j <= floorNumber; j++) {
            this.internalBtnList.push(new RequestFloor(floorNumber, "off", j));
        }
    }

    movingDown() {
        if (this.status == "IDLE" || this.status == "STOPPED") {
            this.status = "MOVING";
            this.direction = "DOWN";
            console.log("elevator start moving", Elevator);
        }
        this.timer(2000);
        this.currentFloor--;
    }

    movingUp() {
        if (this.status == "IDLE" || this.status == "STOPPED") {
            this.status = "MOVING";
            this.direction = "UP";
            console.log("elevator start moving", Elevator);
        }
        this.timer(2000);
        this.currentFloor++;
    }
}

class Columns {
    constructor(numElevators, floorNumber) {
        this.numElevators = numElevators;
        this.floorNumber = floorNumber;
        this.elevators = [];
        for (let i = 0; i < this.numElevators; i++) {
            this.elevators.push(new Elevators(floorNumber));
        }
    }
}

class Button {
    constructor(direction, requestFloor) {
        this.direction = direction;
        this.requestFloor = requestFloor;
        this.status = status;
    }
}

class ExternalFloorBtn {
    constructor(direction, requestFloor, status) {
        this.requestFloor = requestFloor;
        this.direction = direction;
        this.status = status;
    }
}

class RequestedFloor {
    constructor(numElevators, status, requestFloor) {
        this.numElevators = numElevators;
        this.status = status;
        this.requestFloor = requestFloor;
    }
}

class ElevatorController {
    constructor(floorNumber, numElevators) {
        this.floorNumber = floorNumber;
        this.numElevators = numElevators;
        this.btnList = [];
        this.elevatorList = [];
        for (let i = 1; i < FloorNumber; i++) {
            this.btnList.push(new Button('UP', i, 'off'));
            this.btnList.push(new Button('DOWN', i + 1, 'off'));
        }
        for (let i = 1; i <= numElevators; i++) {
            this.elevatorList.push(new Elevators(i, floorNumber));
        }
        console.log(this.elevatorList)
        console.log(this.btnList)
    }

    findBestElevator(floorNumber, direction, elevList) {
        while (true) {
            for (var i = 0; i < elevList.length; i++) {
                var x = elevList[i];
                console.log(elevList)
                if (x.status === "STOPPED" && x.currentFloor === floorNumber && x.direction === direction) {
                    x.floorList.push(floorNumber);
                    return x;
                } else if (x.status === "IDLE" && x.currentFloor === floorNumber) {
                    x.floorList.push(floorNumber);
                    return x;
                } else if (x.currentFloor < floorNumber && (x.status === "MOVING" || "STOPPED") && x.direction === "UP" && direction === x.direction) {
                    x.floorList.push(floorNumber);
                    return x;
                } else if (x.currentFloor > floorNumber && (x.status === "MOVING" || "STOPPED") && x.direction === "DOWN" && direction === x.direction) {
                    x.floorList.push(floorNumber);
                    return x;
                } else if (x.status === "IDLE") {
                    x.floorList.push(floorNumber);
                    return x;
                }
                else {
                    var x = this.shortestList(elevList);
                    return x;
                }
            }
        }
    }

    requestElevator(FloorNumber, Direction) {
        var Elevator = this.findBestElevator(FloorNumber, Direction, this.elevatorList)
        console.log("Elevator choose to respond to the request:")
        console.log(Elevator);
        this.operateElevator(Elevator, direction)
    }

    requestFloor(Elevator, RequestedFloor) {
        var Elevator = this.requestElevator(RequestedFloor, direction, this.elevatorList)
        console.log("Floor choose to respond to the request:")
        console.log(Elevator);
        this.operateElevator(Elevator, direction)
    }

    operateElevator(Elevator, direction) {
        console.log("next item on floor list : ", Elevator.floorList[0])
        while (Elevator.floorList.length > 0) {
            console.log("current floor : ", Elevator.currentFloor)
            if (Elevator.floorList[0] === Elevator.currentFloor) {
                Elevator.openDoor(Elevator, direction);
                Elevator.floorList.shift()
                console.log("new list : ", Elevator.floorList);
                console.log("next destination : ", Elevator.floorList[0])
            }
            if (Elevator.floorList[0] > Elevator.currentFloor) {
                Elevator.movingUp(Elevator);
            }
            if (Elevator.floorList[0] < Elevator.currentFloor) {
                Elevator.movingDown();
            }
        }
        if (Elevator.floorList.length < 1) {
            Elevator.status = "IDLE";
            Elevator.direction = null;
            console.log(Elevator);
        }
    }

    shortestList(elevlist) {
        var length = 9999
        for (var i = 0; i < elevlist.length; i++) {
            if (length > elevlist[i].floorList.length) {
                length = elevlist[i].floorList.length
                var y = elevlist[i]
            }
        }
        return y;
    }

    openDoor(status, direction) {
        if (status === "IDLE") {
            direction = direction;
        }
        status = "STOPPED";
        console.log("Elevator stopped :", Elevator);
        //TIMER
        this.timer(2000);
        console.log("DOOR OPENING");
        this.timer(2000);
        console.log("DOOR IS OPEN");
        this.timer(2000);
        this.closeDoor(Elevator);
    }

    closeDoor(Elevator) {
        console.log("DOOR IS CLOSING");
        this.timer(2000);
        console.log("DOOR IS CLOSE");
    }

    timer(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    };
}

function main(floorNumber, numElevators) {

    console.log("main");

    let elevatorController = new ElevatorController(floorNumber, numElevators);

    elevatorController.elevList[0].currentFloor = 3;
    elevatorController.elevList[0].direction = null;
    elevatorController.elevList[0].status = "IDLE";
    elevatorController.elevList[0].floorList = [];

    elevatorController.elevList[1].currentFloor = 10;
    elevatorController.elevList[1].direction = null;
    elevatorController.elevList[1].status = "IDLE";
    elevatorController.elevList[1].floorList = [];

    elevatorController.requestElevator(10, "DOWN");
    elevatorController.findFloorRequestBtn(1, 3);
    elevatorController.requestElevator(3, "DOWN");
    elevatorController.findFloorRequestBtn(1, 2);
}

console.log("main2");
let elevatorController = new ElevatorController(10, 2);
elevatorController.elevatorList[0].currentFloor = 3;
elevatorController.elevatorList[0].direction = null;
elevatorController.elevatorList[0].status = "IDLE";
elevatorController.elevatorList[0].floorList = [];

elevatorController.elevatorList[1].currentFloor = 10;
elevatorController.elevatorList[1].direction = null;
elevatorController.elevatorList[1].status = "IDLE";
elevatorController.elevatorList[1].floorList = [];

elevatorController.requestElevator(10, "DOWN");
/*
cénario 1:
Ascenseur 1 à l'étage 2
Ascenseur 2 à l'étage 6
Un utilisateur à l'étage 3 veut monter au 7e étage

Scénario 2:
Ascenseur 1 à l'Étage 10
Ascenseur 2 à l'étage 3
Un premier utilisateur au premier étage veut monter au 6e étage,
pendant qu'un 2e à l'étage 3 veut monter au 5. Tout de suite après,
une autre personne à l'étage 9 veut descendre à l'étage 2.

Scénario 3:
Ascenseur 1 à l'étage 10
Ascenseur 2 à l'étage 3
Un utilisateur à l'étage 10 veut descendre au 3e étage pendant
qu'un autre à l'étage 3 veut  descendre au 2e étage
 */