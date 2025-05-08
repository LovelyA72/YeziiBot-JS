const craftingRecipes = [
    // Format: [outputID, outputQuantity, {materialID: quantity}, ...]
    [100036, 1, {100035: 1}, {100040: 2}],
    [100037, 1, {100034: 1}, {100040: 2}],
];

function parseMaterialInput(input) {
    // Handle formats like: "100040", "100040*2", "100040x3"
    const match = input.match(/^(\d+)(?:[x*](\d+))?$/);
    if (!match) return null;
    
    const id = parseInt(match[1], 10);
    const quantity = match[2] ? parseInt(match[2], 10) : 1;
    
    return { id, quantity };
}

function createMaterialMap(materials) {
    const materialMap = {};
    
    for (const material of materials) {
        const parsed = parseMaterialInput(material);
        if (!parsed) continue;
        
        materialMap[parsed.id] = (materialMap[parsed.id] || 0) + parsed.quantity;
    }
    
    return materialMap;
}

function materialMapsEqual(map1, map2) {
    const keys1 = Object.keys(map1);
    const keys2 = Object.keys(map2);
    
    if (keys1.length !== keys2.length) return false;
    
    for (const key of keys1) {
        if (map1[key] !== map2[key]) return false;
    }
    
    return true;
}

function doCraft() {
    const argc = parseInt(getVar("argc"), 10);
    // Check param count
    if (argc <= 1) {
        addMessage("Error: No materials provided.");
        return;
    }

    // Collect all material arguments
    const materialInputs = [];
    for (let i = 1; i < argc; i++) {
        materialInputs.push(getVars(`argv${i}`));
    }

    // Parse inputs into material map
    const inputMaterials = createMaterialMap(materialInputs);
    if (Object.keys(inputMaterials).length === 0) {
        addMessage("Error: Invalid material format. Use ID, ID*QTY, or IDxQTY.");
        return;
    }

    // Check inventory for all materials first
    for (const materialId in inputMaterials) {
        const available = invGetItemQty(parseInt(materialId, 10));
        if (available < inputMaterials[materialId]) {
            addMessage(`Error: Not enough of item ${materialId} (need ${inputMaterials[materialId]}, have ${available}).`);
            return;
        }
    }

    // Find matching recipe
    for (const recipe of craftingRecipes) {
        const outputId = recipe[0];
        const outputQty = recipe[1];
        const recipeMaterials = {};
        
        // Combine recipe materials into a map
        for (let i = 2; i < recipe.length; i++) {
            const materialObj = recipe[i];
            for (const id in materialObj) {
                recipeMaterials[id] = (recipeMaterials[id] || 0) + materialObj[id];
            }
        }
        
        if (materialMapsEqual(inputMaterials, recipeMaterials)) {
            // Deduct materials from inventory
            for (const materialId in inputMaterials) {
                const currentQty = invGetItemQty(parseInt(materialId, 10));
                const newQty = currentQty - inputMaterials[materialId];
                invSetItemQty(parseInt(materialId, 10), newQty);
            }
            
            // Add crafted item
            const currentOutputQty = invGetItemQty(outputId);
            invSetItemQty(outputId, currentOutputQty + outputQty);
            
            addMessage(`Crafting successful! Result ID: ${outputId}, Quantity: ${outputQty}`);
            return [outputId, outputQty];
        }
    }

    addMessage("Error: No matching recipe found.");
    return null;
}

// Log crafting result to console
consoleLog(doCraft());