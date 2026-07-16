plugins {
    id("dev.slne.surf.api.gradle.core")
}

surfCoreApi {
    withCoreCommon()
}

dependencies {
    api(projects.surfFactionsShared)
    api(projects.surfFactionsModules.surfFactionsFractions.surfFactionsFractionsApi)
}