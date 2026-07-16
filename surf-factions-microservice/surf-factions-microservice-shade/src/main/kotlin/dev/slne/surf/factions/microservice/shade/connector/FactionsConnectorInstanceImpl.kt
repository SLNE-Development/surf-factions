package dev.slne.surf.factions.microservice.shade.connector

import com.google.auto.service.AutoService
import dev.slne.surf.database.DatabaseApi
import dev.slne.surf.factions.microservice.api.connector.FactionsConnectorInstance
import dev.slne.surf.factions.microservice.shade.microservice
import dev.slne.surf.rabbitmq.api.ServerRabbitMQApi

@AutoService(FactionsConnectorInstance::class)
class FactionsConnectorInstanceImpl : FactionsConnectorInstance {
    override val rabbitApi: ServerRabbitMQApi
        get() = microservice.rabbitApi

    override val databaseApi: DatabaseApi
        get() = microservice.databaseApi
}