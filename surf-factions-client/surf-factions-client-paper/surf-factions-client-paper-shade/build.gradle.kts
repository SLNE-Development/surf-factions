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
    api(projects.surfFactionsModules.surfFactionsUser.surfFactionsUserClient.surfFactionsUserClientPaper)
    api(projects.surfFactionsModules.surfFactionsFractions.surfFactionsFractionsClient.surfFactionsFractionsClientPaper)
}