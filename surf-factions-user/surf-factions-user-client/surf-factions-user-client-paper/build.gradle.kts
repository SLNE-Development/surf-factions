plugins {
    id("dev.slne.surf.api.gradle.core")
}

dependencies {
    api(projects.surfFactionsClient.surfFactionsClientPaper.surfFactionsClientPaperApi)
    api(projects.surfFactionsUser.surfFactionsUserCore.surfFactionsUserCoreClient)
}