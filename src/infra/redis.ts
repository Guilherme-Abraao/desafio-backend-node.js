import Redis from 'ioredis'

const redisHost = process.env.REDIS_HOST || 'localhost'

export const redis = new Redis({
  host: redisHost,
  port: 6379,
  maxRetriesPerRequest: null,
})

redis.on('connect', () => {
  console.log(`📦 Redis conectado em: ${redisHost}`)
})

redis.on('error', (err) => {
  console.log('❌ Erro no Redis:', err.message)
})
