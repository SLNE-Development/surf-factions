import dev.slne.surf.microservice.gradle.plugin.rabbit.RabbitModule

plugins {
    id("dev.slne.surf.api.gradle.standalone")
    id("dev.slne.surf.microservice")
}

dependencies {
    api(projects.surfFactionsShared)
}

surfStandaloneApi {
    withSurfDatabaseR2dbc("2.3.0", "dev.slne.surf.factions.libs.db")
}

surfMicroservice {
    withRabbitModule(RabbitModule.SERVER_API, true)
    withMicroserviceApi()
}