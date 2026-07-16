plugins {
    id("dev.slne.surf.api.gradle.standalone")
    id("dev.slne.surf.microservice")
}

dependencies {
    api(projects.surfFactionsModules.surfFactionsFractions.surfFactionsFractionsCore.surfFactionsFractionsCoreCommon)
    api(projects.surfFactionsMicroservice.surfFactionsMicroserviceApi)
}