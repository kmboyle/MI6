$(document).ready(function() {
    /* global moment */

    // blogContainer holds all of our missions
    var blogContainer = $(".blog-container");
    var MissionCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    $(document).on("click", "button.delete", handleMissionDelete);
    $(document).on("click", "button.edit", handleMissionEdit);
    // Variable to hold our mission
    var mission;

    // The code below handles the case where we want to get a mission for a specific agent
    // Looks for a query param in the url for agent_id
    var url = window.location.search;
    var agentId;
    if (url.indexOf("?agent_id=") !== -1) {
        agentId = url.split("=")[1];
        getMission(agentId);
    }
    // If there's no agentId we just get all mission as usual
    else {
        getMission();
    }


    // This function grabs mission from the database and updates the view
    function getMission(agent) {
        agentId = agent || "";
        if (agentId) {
            agentId = "/?agent_id=" + agentId;
        }
        $.get("/api/mission" + agentId, function(data) {
            console.log("mission", data);
            mission = data;
            if (!mission || !mission.length) {
                displayEmpty(agent);
            } else {
                initializeRows();
            }
        });
    }

    // This function does an API call to delete mission
    function deleteMission(id) {
        $.ajax({
                method: "DELETE",
                url: "/api/mission/" + id
            })
            .done(function() {
                getMission(MissionCategorySelect.val());
            });
    }

    // InitializeRows handles appending all of our constructed Mission HTML inside blogContainer
    function initializeRows() {
        blogContainer.empty();
        var missionToAdd = [];
        for (var i = 0; i < mission.length; i++) {
            missionToAdd.push(createNewRow(mission[i]));
        }
        blogContainer.append(missionToAdd);
    }

    // This function constructs a Mission's HTML
    function createNewRow(mission) {
        var formattedDate = new Date(mission.createdAt);
        formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
        var newMissionPanel = $("<div>");
        newMissionPanel.addClass("panel panel-default");
        var newMissionPanelHeading = $("<div>");
        newMissionPanelHeading.addClass("panel-heading");
        var deleteBtn = $("<button>");
        deleteBtn.text("x");
        deleteBtn.addClass("delete btn btn-danger");
        var editBtn = $("<button>");
        editBtn.text("EDIT");
        editBtn.addClass("edit btn btn-info");
        var newMissionTitle = $("<h2>");
        var newMissionDate = $("<small>");
        var newMissionagent = $("<h5>");
        newMissionagent.text("Written by: " + mission.agent.name);
        newMissionagent.css({
            float: "right",
            color: "blue",
            "margin-top": "-10px"
        });
        var newMissionPanelBody = $("<div>");
        newMissionPanelBody.addClass("panel-body");
        var newMissionBody = $("<p>");
        newMissionTitle.text(mission.title + " ");
        newMissionBody.text(mission.body);
        newMissionDate.text(formattedDate);
        newMissionTitle.append(newMissionDate);
        newMissionPanelHeading.append(deleteBtn);
        newMissionPanelHeading.append(editBtn);
        newMissionPanelHeading.append(newMissionTitle);
        newMissionPanelHeading.append(newMissionagent);
        newMissionPanelBody.append(newMissionBody);
        newMissionPanel.append(newMissionPanelHeading);
        newMissionPanel.append(newMissionPanelBody);
        newMissionPanel.data("Mission", mission);
        return newMissionPanel;
    }

    // This function figures out which Mission we want to delete and then calls deleteMission
    function handleMissionDelete() {
        var currentMission = $(this)
            .parent()
            .parent()
            .data("mission");
        deleteMission(currentMission.id);
    }

    // This function figures out which Mission we want to edit and takes it to the appropriate url
    function handleMissionEdit() {
        var currentMission = $(this)
            .parent()
            .parent()
            .data("mission");
        window.location.href = "/cms?mission_id=" + currentMission.id;
    }

    // This function displays a messgae when there are no mission
    function displayEmpty(id) {
        var query = window.location.search;
        var partial = "";
        if (id) {
            partial = " for Agent #" + id;
        }
        blogContainer.empty();
        var messageh2 = $("<h2>");
        messageh2.css({ "text-align": "center", "margin-top": "50px" });
        messageh2.html("No mission yet" + partial + ", navigate <a href='/cms" + query +
            "'>here</a> in order to get started.");
        blogContainer.append(messageh2);
    }

});