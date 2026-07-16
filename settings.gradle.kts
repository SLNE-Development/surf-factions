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

// ------------------------------
// Main
// ------------------------------
// Utils
include("surf-factions-shared")

// Client
include("surf-factions-client:surf-factions-client-common:surf-factions-client-common-api")
include("surf-factions-client:surf-factions-client-common:surf-factions-client-common-shade")
include("surf-factions-client:surf-factions-client-paper:surf-factions-client-paper-api")
include("surf-factions-client:surf-factions-client-paper:surf-factions-client-paper-shade")
include("surf-factions-client:surf-factions-client-velocity:surf-factions-client-velocity-api")
include("surf-factions-client:surf-factions-client-velocity:surf-factions-client-velocity-shade")

// Microservice
include("surf-factions-microservice:surf-factions-microservice-api")
include("surf-factions-microservice:surf-factions-microservice-shade")

// ------------------------------
// Features
// ------------------------------

// Fractions
include("surf-factions-modules:surf-factions-fractions:surf-factions-fractions-api")
include("surf-factions-modules:surf-factions-fractions:surf-factions-fractions-core:surf-factions-fractions-core-common")
include("surf-factions-modules:surf-factions-fractions:surf-factions-fractions-core:surf-factions-fractions-core-client")
include("surf-factions-modules:surf-factions-fractions:surf-factions-fractions-microservice")
include("surf-factions-modules:surf-factions-fractions:surf-factions-fractions-client:surf-factions-fractions-client-velocity")
include("surf-factions-modules:surf-factions-fractions:surf-factions-fractions-client:surf-factions-fractions-client-paper")

// User
include("surf-factions-modules:surf-factions-user:surf-factions-user-api")
include("surf-factions-modules:surf-factions-user:surf-factions-user-core:surf-factions-user-core-common")
include("surf-factions-modules:surf-factions-user:surf-factions-user-core:surf-factions-user-core-client")
include("surf-factions-modules:surf-factions-user:surf-factions-user-microservice")
include("surf-factions-modules:surf-factions-user:surf-factions-user-client:surf-factions-user-client-paper")
include("surf-factions-modules:surf-factions-user:surf-factions-user-client:surf-factions-user-client-velocity")

// Claims
include("surf-factions-modules:surf-factions-claims:surf-factions-claims-api")
include("surf-factions-modules:surf-factions-claims:surf-factions-claims-core:surf-factions-claims-core-common")
include("surf-factions-modules:surf-factions-claims:surf-factions-claims-core:surf-factions-claims-core-client")
include("surf-factions-modules:surf-factions-claims:surf-factions-claims-microservice")
include("surf-factions-modules:surf-factions-claims:surf-factions-claims-client:surf-factions-claims-client-paper")
include("surf-factions-modules:surf-factions-claims:surf-factions-claims-client:surf-factions-claims-client-velocity")