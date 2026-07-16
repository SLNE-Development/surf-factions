plugins {
    id("dev.slne.surf.api.gradle.core")
}

dependencies {
    api(projects.surfFactionsClient.surfFactionsClientVelocity.surfFactionsClientVelocityApi)
    api(projects.surfFactionsFractions.surfFactionsFractionsCore.surfFactionsFractionsCoreClient)
}