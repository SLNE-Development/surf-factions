plugins {
    id("dev.slne.surf.api.gradle.core")
}

dependencies {
    api(projects.surfFactionsClient.surfFactionsClientVelocity.surfFactionsClientVelocityApi)
    api(projects.surfFactionsModules.surfFactionsClaims.surfFactionsClaimsCore.surfFactionsClaimsCoreClient)
}