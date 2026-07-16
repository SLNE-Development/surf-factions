plugins {
    id("dev.slne.surf.api.gradle.standalone")
}

dependencies {
    api(projects.surfFactionsMicroservice.surfFactionsMicroserviceApi)

    api(projects.surfFactionsUser.surfFactionsUserMicroservice)
    api(projects.surfFactionsFractions.surfFactionsFractionsMicroservice)
}