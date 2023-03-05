QBCore = exports['qb-core']:GetCoreObject()
-- Define the list of vehicles
local vehicles = {
    { name = 'Adder', model = 'adder' },
    { name = 'Bullet', model = 'bullet' },
    { name = 'Cheetah', model = 'cheetah' },
    { name = 'Entity XF', model = 'entityxf' },
    { name = 'Turismo R', model = 'turismor' },
}

-- Define the location of the UI interaction
local interactionLocation = vector3(1819.48, 2149.5, 54.33)

-- Draw the interaction UI
function DrawInteractionUI()
    local distance = GetDistanceBetweenCoords(GetEntityCoords(PlayerPedId()), interactionLocation, true)
    if distance <= 3.0 then
        -- Display the interaction prompt
        SetTextScale(0.0, 0.5)
        SetTextFont(0)
        SetTextProportional(1)
        SetTextColour(255, 255, 255, 255)
        SetTextEntry('STRING')
        SetTextCentre(true)
        AddTextComponentString('Press ~INPUT_CONTEXT~ to interact')
        DrawText(0.5, 0.8)
        
        -- Execute the interaction when the player presses the interaction key
        if IsControlJustPressed(0, 51) then -- 51 is the default value for the INPUT_CONTEXT key
            OpenVehicleMenu()
        end
    end
end


-- Open the vehicle selection menu
function OpenVehicleMenu()
    local elements = {}
    for i = 1, #vehicles do
        table.insert(elements, { label = vehicles[i].name, value = vehicles[i].model })
    end
    QBCore.Functions.TriggerCallback('qb-menu:showMenu', function(data)
        if data then
            SpawnVehicle(data.current.value)
        end
    end, 'default', 'Vehicle Selection', elements, {trigger = 'client', anim = {enable = true}}) -- add QB-Core UI parameters
end


-- Spawn a vehicle with the specified model name
function SpawnVehicle(modelName)
    -- Get the hash for the vehicle model name
    local modelHash = GetHashKey(modelName)
    
    -- Request the model
    RequestModel(modelHash)
    while not HasModelLoaded(modelHash) do
        Wait(0)
    end
    
    -- Spawn the vehicle
    local playerPed = PlayerPedId()
    local spawnCoords = GetOffsetFromEntityInWorldCoords(playerPed, 0.0, 5.0, 0.0)
    local vehicle = CreateVehicle(modelHash, spawnCoords, GetEntityHeading(playerPed), true, false)
    
    -- Set the player as the driver
    SetPedIntoVehicle(playerPed, vehicle, -1)
end

-- Add an event listener for drawing the interaction UI
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        DrawInteractionUI()
    end
end)
