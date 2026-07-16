plugins {
    id("dev.slne.surf.api.gradle.core")
}

dependencies {
    api(projects.surfFactionsShared)
    api(projects.surfFactionsModules.surfFactionsUser.surfFactionsUserApi)
}