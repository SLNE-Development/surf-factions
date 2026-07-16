plugins {
    id("dev.slne.surf.api.gradle.velocity")
}

dependencies {
    api(projects.surfFactionsClient.surfFactionsClientCommon.surfFactionsClientCommonShade)
    api(projects.surfFactionsClient.surfFactionsClientVelocity.surfFactionsClientVelocityApi)
}