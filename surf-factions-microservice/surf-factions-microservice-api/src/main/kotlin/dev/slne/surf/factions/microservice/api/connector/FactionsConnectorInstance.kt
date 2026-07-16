package dev.slne.surf.factions.microservice.api.connector

import dev.slne.surf.api.core.util.requiredService
import dev.slne.surf.database.DatabaseApi
import dev.slne.surf.rabbitmq.api.ServerRabbitMQApi

interface FactionsConnectorInstance {
    val rabbitApi: ServerRabbitMQApi
    val databaseApi: DatabaseApi

    companion object : FactionsConnectorInstance by instance {
        val INSTANCE get() = instance
    }
}

private val instance = requiredService<FactionsConnectorInstance>()