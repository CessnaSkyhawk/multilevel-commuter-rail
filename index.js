(function () {
    const api = window.SubwayBuilderAPI;

    // ==========================================
    // 1st Train: Electric MultiLevel (ALP-46)
    // ==========================================
    const originalCommuter = api.trains.getTrainType('commuter-rail');

    if (originalCommuter) {
        const electricMultilevelRail = JSON.parse(JSON.stringify(originalCommuter));

        electricMultilevelRail.id = 'electric-multilevel-rail';
        electricMultilevelRail.name = 'Electric MultiLevel Rail';
        electricMultilevelRail.description = 'Higher-capacity electric multilevel commuter rail modeled after NJ Transit\'s Bombardier ALP-46 pulling MultiLevel II Coaches';
        
        electricMultilevelRail.stats.maxAcceleration = 0.76;
        electricMultilevelRail.stats.minCars = 3;
        electricMultilevelRail.stats.maxCars = 14;
        electricMultilevelRail.stats.carsPerCarSet = 1;
        electricMultilevelRail.stats.capacityPerCar = 142;
        electricMultilevelRail.stats.trainWidth = 3.05;
        electricMultilevelRail.stats.seatsPerCar = 142;
        electricMultilevelRail.stats.doorsPerCar = 4;
        electricMultilevelRail.stats.carCost = 6_000_000;
        electricMultilevelRail.stats.trainOperationalCostPerHour = 625;
        electricMultilevelRail.stats.carOperationalCostPerHour = 43.75;

        // Tells the electric train to run on standard commuter track first
        electricMultilevelRail.compatibleTrackTypes = ['commuter-rail', 'electric-multilevel-rail'];

        api.trains.registerTrainType(electricMultilevelRail);
        console.log("Successfully cloned the electric commuter rail!");
    } else {
        console.error("Electric commuter rail ID not found.");
    }

    // ==========================================
    // 2nd Train: Diesel MultiLevel (ALP-45DP)
    // ==========================================
    const originalDieselCommuter = api.trains.getTrainType('commuter-rail-diesel');

    if (originalDieselCommuter) {
        const dieselMultilevelRail = JSON.parse(JSON.stringify(originalDieselCommuter));

        dieselMultilevelRail.id = 'diesel-multilevel-rail';
        dieselMultilevelRail.name = 'Diesel MultiLevel Rail';
        dieselMultilevelRail.description = 'Diesel multilevel commuter rail for longer routes where there\'s not money for electrification. Modeled after NJ Transit\'s Bombardier ALP-45DP pulling MultiLevel II Coaches';
        
        dieselMultilevelRail.stats.maxAcceleration = 0.34;
        dieselMultilevelRail.stats.minCars = 3;
        dieselMultilevelRail.stats.maxCars = 14;
        dieselMultilevelRail.stats.carsPerCarSet = 1;
        dieselMultilevelRail.stats.capacityPerCar = 142;
        dieselMultilevelRail.stats.trainWidth = 3.05;
        dieselMultilevelRail.stats.seatsPerCar = 142;
        dieselMultilevelRail.stats.doorsPerCar = 4;
        dieselMultilevelRail.stats.carCost = 4_000_000;
        dieselMultilevelRail.stats.trainOperationalCostPerHour = 812.5;
        dieselMultilevelRail.stats.carOperationalCostPerHour = 43.75;

        dieselMultilevelRail.compatibleTrackTypes = [
        'commuter-rail-diesel',
        'commuter-rail',
        'diesel-multilevel-rail',
        'electric-multilevel-rail' 
        ];

        api.trains.registerTrainType(dieselMultilevelRail);
        console.log("Successfully cloned the diesel commuter rail!");
    } else {
        console.error("Diesel commuter rail ID not found.");
    }

    // ==========================================
    // 3. Update Base Game Trains for Compatibility
    // ==========================================

    // Update base Electric Commuter
    const baseElectric = api.trains.getTrainType('commuter-rail');
    if (baseElectric) {
        const existingElectricTracks = baseElectric.compatibleTrackTypes || ['commuter-rail'];
        api.trains.modifyTrainType('commuter-rail', {
            compatibleTrackTypes: [...new Set([...existingElectricTracks, 'electric-multilevel-rail'])]
        });
        console.log("Updated base electric train with new track compatibility.");
    }

    // Update base Diesel Commuter
    const baseDiesel = api.trains.getTrainType('commuter-rail-diesel');
    if (baseDiesel) {
        const existingDieselTracks = baseDiesel.compatibleTrackTypes || ['commuter-rail-diesel', 'commuter-rail'];
        api.trains.modifyTrainType('commuter-rail-diesel', {
            compatibleTrackTypes: [...new Set([...existingDieselTracks, 'diesel-multilevel-rail', 'electric-multilevel-rail'])]
        });
        console.log("Updated base diesel train with new track compatibility.");
    }
})();