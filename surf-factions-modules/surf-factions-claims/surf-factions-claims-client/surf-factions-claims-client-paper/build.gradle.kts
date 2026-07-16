plugins {
    id("dev.slne.surf.api.gradle.paper-raw")
}

dependencies {
    api(projects.surfFactionsClient.surfFactionsClientPaper.surfFactionsClientPaperApi)
    api(projects.surfFactionsModules.surfFactionsClaims.surfFactionsClaimsCore.surfFactionsClaimsCoreClient)
}