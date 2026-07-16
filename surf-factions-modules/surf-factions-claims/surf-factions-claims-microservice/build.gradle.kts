plugins {
    id("dev.slne.surf.api.gradle.standalone")
    id("dev.slne.surf.microservice")
}

dependencies {
    api(projects.surfFactionsModules.surfFactionsClaims.surfFactionsClaimsCore.surfFactionsClaimsCoreCommon)
    api(projects.surfFactionsMicroservice.surfFactionsMicroserviceApi)
}