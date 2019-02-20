

class ElevatorController {
    constructor(numFloor, numElevators) {
        this.numFloor = numFloor;
        this.numElevators = numElevators;
        this.btnList = [];
        this.elevatorList = [];
        for (let i = 1; i < numFloor; i++) {
            this.btnList.push(new Button('UP', i, 'off'));
            this.btnList.push(new Button('DOWN', i + 1, 'off'));
        }
        for (let i = 1; i <= numElevators; i++) {
            this.elevatorList.push(new Elevator(i, numFloor));
        }
        console.log(this.elevatorList)
        console.log(this.btnList)
        requestElevBtn(numFloor, direction); {
            var Elevator = this.findElevator(numFloor, direction, this.elevatorList)
            console.log("Elevator choose to respond to the request:")
            console.log(Elevator);
            this.operateElevator(Elevator, direction)
        }
    }

    operateElevator(Elevator, direction) {
        console.log("next item on floor list : ", Elevator.floorList[0])
        while (Elevator.floorList.length > 0) {
            console.log("current floor : ", Elevator.currentFloor)
            if (Elevator.floorList[0] === Elevator.currentFloor) {
                this.openDoor(Elevator, direction);
                Elevator.floorList.shift()
                console.log("new list : ", Elevator.floorList);
                console.log("next destination : ", Elevator.floorList[0])
            }
            if (Elevator.floorList[0] > Elevator.currentFloor) {
                this.movingUp(Elevator);
            }
            if (Elevator.floorList[0] < Elevator.currentFloor) {
                this.movingDown(Elevator);
            }
        }
        if (Elevator.floorList.length < 1) {
            Elevator.status = "IDLE";
            Elevator.direction = null;
            console.log(Elevator);
        }
    }

    findBestElevator(numFloor, direction, elevList) {
        while (true) {
            for (var i = 0; i < elevList.length; i++) {
                var x = elevList[i];
                console.log(elevList)
                if (x.status === "STOPPED" && x.currentFloor === numFloor && x.direction === direction) {
                    x.floorList.push(numFloor);
                    return x;
                } else if (x.status === "IDLE" && x.currentFloor === numFloor) {
                    x.floorList.push(numFloor);
                    return x;
                } else if (x.currentFloor < numFloor && (x.status === "MOVING" || "STOPPED") && x.direction === "UP" && direction === x.direction) {
                    x.floorList.push(numFloor);
                    return x;
                } else if (x.currentFloor > numFloor && (x.status === "MOVING" || "STOPPED") && x.direction === "DOWN" && direction === x.direction) {
                    x.floorList.push(numFloor);
                    return x;
                } else if (x.status === "IDLE") {
                    x.floorList.push(numFloor);
                    return x;
                }
                else {
                    var x = this.shortestList(elevList);
                    return x;
                }
            }
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

class Button {
    constructor(direction, floor, status) {
        this.floor = floor;
        this.direction = direction;
        this.status = status;
    }
}

class ExternalFloorBtn {
    constructor(floor, direction, status) {
        this.floor = floor;
        this.direction = direction;
        this.status = status;
    }
}

class InternalBtnRequestFloor {
    constructor(numElevators, status, floor) {
        this.numElevators = numElevators;
        this.status = status;
        this.floor = floor;
    }
}

class Columns {
    constructor(numElevators, numFloor) {
        this.numElevators = numElevators;
        this.numFloor = numFloor;
        this.elevators = [];
        for (let i = 0; i < this.numElevators; i++) {
            this.elevators.push(new Elevators(numFloor));
        }
    }
}

class Elevators {
    constructor(numElevators, numFloor) {
        this.numElevators = numElevators;
        this.currentFloor = 1;
        this.direction = null;
        this.status = "idle";
        this.floorList = [];
        this.internalBtnList = [];
        for (let j = 1; j <= numFloor; j++) {
            this.internalBtnList.push(new findFloorRequestBtn(numFloor, "off", j));
        }
    }

    movingDown(status, Elevator) {
        if (status == "IDLE" || status == "STOPPED") {
            status = "MOVING";
            direction = "DOWN";
            console.log("elevator start moving", Elevator);
        }
        this.timer(2000);
        Elevator.currentFloor--;
    }

    movingUp(status, Elevator) {
        if (status == "IDLE" || Elevator.status == "STOPPED") {
            status = "MOVING";
            direction = "UP";
            console.log(Elevator);
        }
        Elevator.currentFloor++;
    }
}

function main(numFloor, numElevators) {

    console.log("main");

    let elevatorController = new ElevatorController(numFloor, numElevators);

    elevatorController.elevList[0].currentFloor = 3;
    elevatorController.elevList[0].direction = null;
    elevatorController.elevList[0].status = "IDLE";
    elevatorController.elevList[0].floorList = [];

    elevatorController.elevList[1].currentFloor = 10;
    elevatorController.elevList[1].direction = null;
    elevatorController.elevList[1].status = "IDLE";
    elevatorController.elevList[1].floorList = [];

    elevatorController.requestElevBtn(10, "DOWN");
    elevatorController.findFloorRequestBtn(1, 3);
    elevatorController.requestElevBtn(3, "DOWN");
    elevatorController.findFloorRequestBtn(1, 2);
}

console.log("main2");
