plugins {
    id("dev.slne.surf.api.gradle.paper-plugin")
}

surfPaperPluginApi {
    mainClass("dev.slne.surf.factions.client.paper.PaperMain")
}

dependencies {
    api(projects.surfFactionsClient.surfFactionsClientCommon.surfFactionsClientCommonShade)
    api(projects.surfFactionsClient.surfFactionsClientPaper.surfFactionsClientPaperApi)

    // Modules
    api(projects.surfFactionsUser.surfFactionsUserClient.surfFactionsUserClientPaper)
    api(projects.surfFactionsFractions.surfFactionsClient.surfFactionsFractionsClientPaper)
}