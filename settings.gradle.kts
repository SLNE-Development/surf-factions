pluginManagement {
    repositories {
        gradlePluginPortal()
        maven("https://reposilite.slne.dev/public/")
    }
}

plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "1.0.0"
    id("dev.slne.surf.api.gradle.settings") version "+"
}

rootProject.name = "surf-factions"

include("surf-factions-microservice:surf-factions-microservice-api")
include("surf-factions-microservice:surf-factions-microservice-shade")

include("surf-factions-fractions:surf-factions-fractions-api")
include("surf-factions-fractions:surf-factions-fractions-core:surf-factions-fractions-core-common")
include("surf-factions-fractions:surf-factions-fractions-core:surf-factions-fractions-core-client")
include("surf-factions-fractions:surf-factions-fractions-microservice")
include("surf-factions-fractions:surf-factions-client:surf-factions-fractions-client-velocity")
include("surf-factions-fractions:surf-factions-client:surf-factions-fractions-client-paper")