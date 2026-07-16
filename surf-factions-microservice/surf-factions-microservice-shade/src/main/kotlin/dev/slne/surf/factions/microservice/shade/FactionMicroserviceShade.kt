package dev.slne.surf.factions.microservice.shade

import com.google.auto.service.AutoService
import dev.slne.surf.database.DatabaseApi
import dev.slne.surf.microservice.api.microservice.Microservice
import dev.slne.surf.microservice.api.microservice.getMicroservice
import dev.slne.surf.rabbitmq.api.ServerRabbitMQApi
import java.nio.file.Path
import kotlin.io.path.Path

@AutoService(Microservice::class)
class FactionMicroserviceShade : Microservice() {
    override val dataPath: Path = Path("config")

    val rabbitApi = ServerRabbitMQApi.create("surf-factions", dataPath)
    val databaseApi = DatabaseApi.create(dataPath)

    override suspend fun onBootstrap(args: List<String>) {
        FactionMicroserviceManager.onBootstrap(args)

        rabbitApi.freezeAndConnect()
    }

    override suspend fun onDisable() {
        FactionMicroserviceManager.onDisable()

        rabbitApi.disconnect()
        databaseApi.shutdown()
    }
}

val microservice get() = getMicroservice<FactionMicroserviceShade>()