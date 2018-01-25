const db = require('../server/db')
const { Channel } = require('../server/db/models')

const seedChannels = async function () {
  const channels = await Promise.all([
    Channel.create({ name: 'Politico Hardos', type: 'Debate', category: 'Politics', size: 250 }),
    Channel.create({ name: 'NYC Town Hall', type: 'Debate', category: 'Politics', size: 200 }),

    Channel.create({ name: 'Herro Prease', type: 'Debate', category: 'Anime', size: 150 }),
    Channel.create({ name: 'Herro Prease', type: 'Debate', category: 'Anime', size: 150 }),

    Channel.create({ name: 'Welcome to the Jungle (LoL)', type: 'Debate', category: 'Gaming', size: 100 }),
    Channel.create({ name: 'EA Lovers', type: 'Debate', category: 'Gaming', size: 50 }),
    Channel.create({ name: 'Fanboys: Xbox vs. PS4', type: 'Debate', category: 'Gaming', size: 200 }),
    Channel.create({ name: 'Get Smashed', type: 'Debate', category: 'Gaming', size: 125 }),

    Channel.create({ name: 'Winter is Coming', type: 'Debate', category: 'TV/Film', size: 200 }),
    Channel.create({ name: 'Oscars Predictions', type: 'Debate', category: 'TV/Film', size: 250 }),
    Channel.create({ name: 'Basic Girls', type: 'Debate', category: 'TV/Film', size: 75 }),
  ])
  await console.log(`seeded ${channels.length} channels`)
}

module.exports = seedChannels;