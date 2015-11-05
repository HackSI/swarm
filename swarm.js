var Swarm = require('rolling-spider').Swarm;
var keypress = require('keypress');

var villians = ['Octavius', 'Venom', 'Sandman', 'Goblin'];
var heros = ['PeterParker', 'AuntMay', 'UncleBen', 'MaryJane'];
var test = ['PeterParker', 'AuntMay', 'UncleBen', 'Octavius', 'Goblin'];
var swarm1 = new Swarm({timeout: 50, membership: test});

var ACTIVE = false;
var STEPS = 2;

keypress(process.stdin);
process.stdin.setRawMode(true);
process.stdin.resume();

swarm1.assemble();

swarm1.on('assembled', function() {
    swarm1.flatTrim();

    console.log('Swarm assembled: ');
    this.members.forEach(function(drone) {
        console.log(drone.name + ' ' + drone.uuid);
    });

    ACTIVE = true;
});

process.stdin.on('keypress', function(ch, key) {
    if (ACTIVE && key) {
        console.log(key.name);
        if (key.name === 'l') {
            swarm1.flatTrim();
            swarm1.takeOff();
        }
        else if (key.name === 'd') {
            swarm1.land();
        }
        else if (key.name === 'up') {
            swarm1.up({steps: STEPS});
        }
        else if (key.name === 'down') {
            swarm1.down({steps: STEPS});
        }
        else if (key.name === 'left') {
            swarm1.turnLeft({steps: STEPS});
        }
        else if (key.name === 'right') {
            swarm1.turnRight({steps: STEPS});
        }
        else if (key.name === 'u') {
            swarm1.forward({steps: STEPS});
        }
        else if (key.name === 'e') {
            swarm1.backward({steps: STEPS});
        }
        else if (key.name === 'g') {
            swarm1.at(villians[0]).up({steps: STEPS});
            swarm1.at(villians[1]).up({steps: STEPS});
            swarm1.at(villians[2]).up({steps: STEPS});
            swarm1.at(villians[3]).up({steps: STEPS});
            swarm1.at(heros[0]).down({steps: STEPS});
            swarm1.at(heros[1]).down({steps: STEPS});
            swarm1.at(heros[2]).down({steps: STEPS});
            swarm1.at(heros[3]).down({steps: STEPS});
        }
        else if (key.name === 'h') {
            swarm1.at(villians[0]).down({steps: STEPS});
            swarm1.at(villians[1]).down({steps: STEPS});
            swarm1.at(villians[2]).down({steps: STEPS});
            swarm1.at(villians[3]).down({steps: STEPS});
            swarm1.at(heros[0]).up({steps: STEPS});
            swarm1.at(heros[1]).up({steps: STEPS});
            swarm1.at(heros[2]).up({steps: STEPS});
            swarm1.at(heros[3]).up({steps: STEPS});
        }
        else if (key.name === 'f') {
            swarm1.backFlip();
        }
    }

    if (key && key.ctrl && key.name === 'c') {
        process.stdin.pause();
        process.exit()
    }
});
