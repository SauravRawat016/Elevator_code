let currentFloor = 1;
let requestedFloors = [];
let isMoving = false;

function requestFloor(floor) {
  if (!requestedFloors.includes(floor)) {
    requestedFloors.push(floor);
    requestedFloors.sort((a, b) => a - b); 
    updateFloorButtons();
    moveElevator();
  }
}

function requestElevator(floor) {
  if (!requestedFloors.includes(floor)) {
    if(floor!=currentFloor)requestedFloors.push(floor);
    requestedFloors.sort((a, b) => a - b); 
    updateFloorButtons();
    moveElevator();
  }
}

function updateFloorButtons() {
  const floorButtons = document.querySelectorAll('.floor button');
  floorButtons.forEach((button, index) => {
    const floor = index + 1;
    if (requestedFloors.includes(floor)) {
      button.classList.add('requested');
    } else {
      button.classList.remove('requested');
    }
    if (currentFloor === floor) {
      button.classList.add('current');
    } else {
      button.classList.remove('current');
    }
  });
}

function moveElevator() {
  if (!isMoving) {
    isMoving = true;
    requestedFloors.sort((a, b) => a - b); // Sort requested floors in ascending order
    let nearestFloorAbove = requestedFloors.find(floor => floor > currentFloor); // Find nearest floor above current floor
    let nearestFloorBelow = requestedFloors.reverse().find(floor => floor < currentFloor); // Find nearest floor below current floor
    let nextFloor;
    
    if (nearestFloorAbove !== undefined && nearestFloorBelow !== undefined) {
      // Determine the direction based on the nearest floors
      nextFloor = Math.abs(currentFloor - nearestFloorAbove) <= Math.abs(currentFloor - nearestFloorBelow) ? nearestFloorAbove : nearestFloorBelow;
    } else if (nearestFloorAbove !== undefined) {
      nextFloor = nearestFloorAbove;
    } else if (nearestFloorBelow !== undefined) {
      nextFloor = nearestFloorBelow;
    } else {
      // No more requests
      isMoving = false;
      return;
    }
    
    let direction = nextFloor > currentFloor ? 'up' : 'down';
    let interval = setInterval(() => {
      if (direction === 'up') {
        currentFloor++;
        console.log(`Elevator moving up to floor ${currentFloor}`);
      document.getElementById('currentFloor').textContent = currentFloor;
      } else {
        currentFloor--;
        console.log(`Elevator moving down to floor ${currentFloor}`);
      document.getElementById('currentFloor').textContent = currentFloor;

      }
      if (currentFloor === nextFloor) {
        clearInterval(interval);
        console.log(`Elevator reached floor ${currentFloor}`);
      document.getElementById('currentFloor').textContent = currentFloor;

        setTimeout(() => {
          console.log(`Elevator serving floor ${currentFloor}`);
      document.getElementById('currentFloor').textContent = currentFloor;

          // Remove current floor from requestedFloors array
          requestedFloors = requestedFloors.filter(floor => floor !== currentFloor);
      document.getElementById('currentFloor').textContent = currentFloor;

          updateFloorButtons(); // Update buttons after serving the floor
          setTimeout(() => {
            console.log(`Elevator waiting at floor ${currentFloor}`);
      document.getElementById('currentFloor').textContent = currentFloor;

            setTimeout(() => {
              isMoving = false;
              if (requestedFloors.length > 0) {
                moveElevator();
              }
            }, 2000); // Wait for 2 seconds at the requested floor
          }, 1000); // Wait for 1 second before starting to wait at the floor
        }, 0); // Serve the floor immediately after reaching it
      }
      updateFloorButtons();
    }, 1000); // Move to the next floor every 1 second
  }
}

