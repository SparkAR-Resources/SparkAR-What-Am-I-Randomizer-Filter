// What Am I - Randomizer Filter v85
// by Luke Hurd :: @lukehurd

// Load modules
const Patches = require('Patches');
const Reactive = require('Reactive');

// Set a variable to hold our frametotals
let frameTotal = 0;

// Look for the "Frames" ToScript patch
Patches.outputs.getScalar('frames').then(signal => {

    // Pass that number to the script and the frameTotal variable
    signal.monitor({fireOnInitialValue: true}).subscribe(function () {
        frameTotal = signal.pinLastValue();
    });     

});

// Wait for sequence to be activated
Patches.outputs.getPulse('randomPick').then(signal => {
    signal.subscribe(evt => {

        // Select a random frame
        Patches.inputs.setScalar('selectedFrame', randomize());

        // Begin the animation
        Patches.inputs.setPulse('showRandom', Reactive.once());
    });
});

// General randomize function
let randomize = function (){
    return Math.round(Math.random() * frameTotal);
}

