plugins {
    id("dev.slne.surf.api.gradle.standalone")
}

dependencies {
    api(projects.surfFactionsMicroservice.surfFactionsMicroserviceApi)

    api(projects.surfFactionsModules.surfFactionsUser.surfFactionsUserMicroservice)
    api(projects.surfFactionsModules.surfFactionsFractions.surfFactionsFractionsMicroservice)
    api(projects.surfFactionsModules.surfFactionsClaims.surfFactionsClaimsMicroservice)
}