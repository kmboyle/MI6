$(document).ready(function() {
    // Getting jQuery references to the mission body, title, form, and agent select
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var cmsForm = $("#cms");
    var agentSelect = $("#agent");
    // Adding an event listener for when the form is submitted
    $(cmsForm).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a mission)
    var url = window.location.search;
    var missionId;
    var agentId;
    // Sets a flag for whether or not we're updating a mission to be false initially
    var updating = false;

    // If we have this section in our url, we pull out the mission id from the url
    // In '?mission_id=1', missionId is 1
    if (url.indexOf("?mission_id=") !== -1) {
        missionId = url.split("=")[1];
        getMissionData(missionId, "mission");
    }
    // Otherwise if we have an agent_id in our url, preset the agent select box to be our agent
    else if (url.indexOf("?agent_id=") !== -1) {
        agentId = url.split("=")[1];
    }

    // Getting the agents, and their missions
    getAgent();

    // A function for handling what happens when the form to create a new mission is submitted
    function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the mission if we are missing a body, title, or agent
        if (!titleInput.val().trim() || !bodyInput.val().trim() || !agentSelect.val()) {
            return;
        }
        // Constructing a newMission object to hand to the database
        var newMission = {
            title: titleInput
                .val()
                .trim(),
            body: bodyInput
                .val()
                .trim(),
            agentId: agentSelect.val()
        };

        // If we're updating a mission run updateMission to update a mission
        // Otherwise run submitmission to create a whole new mission
        if (updating) {
            newMission.id = missionId;
            updateMission(newmission);
        } else {
            submitmission(newmission);
        }
    }

    // Submits a new mission and brings user to blog page upon completion
    function submitmission(mission) {
        $.mission("/api/mission", mission, function() {
            window.location.href = "/blog";
        });
    }

    // Gets mission data for the current mission if we're editing, or if we're adding to an agent's existing missions
    function getMissionData(id, type) {
        var queryUrl;
        switch (type) {
            case "mission":
                queryUrl = "/api/mission/" + id;
                break;
            case "agent":
                queryUrl = "/api/agent/" + id;
                break;
            default:
                return;
        }
        $.get(queryUrl, function(data) {
            if (data) {
                console.log(data.agentId || data.id);
                // If this mission exists, prefill our cms forms with its data
                titleInput.val(data.title);
                bodyInput.val(data.body);
                agentId = data.agentId || data.id;
                // If we have a mission with this id, set a flag for us to know to update the mission
                // when we hit submit
                updating = true;
            }
        });
    }

    // A function to get agents and then render our list of agents
    function getAgent() {
        $.get("/api/agent", renderAgentList);
    }
    // Function to either render a list of agents, or if there are none, direct the user to the page
    // to create an agent first
    function renderAgentList(data) {
        if (!data.length) {
            window.location.href = "/agent";
        }
        $(".hidden").removeClass("hidden");
        var rowsToAdd = [];
        for (var i = 0; i < data.length; i++) {
            rowsToAdd.push(createagentRow(data[i]));
        }
        agentSelect.empty();
        console.log(rowsToAdd);
        console.log(agentSelect);
        agentSelect.append(rowsToAdd);
        agentSelect.val(agentId);
    }

    // Creates the agent options in the dropdown
    function createagentRow(agent) {
        var listOption = $("<option>");
        listOption.attr("value", agent.id);
        listOption.text(agent.name);
        return listOption;
    }

    // Update a given mission, bring user to the blog page when done
    function updateMission(mission) {
        $.ajax({
                method: "PUT",
                url: "/api/missions",
                data: mission
            })
            .done(function() {
                window.location.href = "/blog";
            });
    }
});