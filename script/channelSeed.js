const db = require('../server/db')
const { Channel } = require('../server/db/models')

const seedChannels = async function () {
  const channels = await Promise.all([
    Channel.create({ name: 'Politico Hardos', type: 'Debate', categoryId: 1, size: 250 }),
    Channel.create({ name: 'NYC Town Hall', type: 'Debate', categoryId: 1, size: 200 }),

    Channel.create({ name: 'Herro Prease', type: 'Debate', categoryId: 2, size: 150 }),
    //Channel.create({ name: 'Herro Prease', type: 'Debate', categoryId: 2, size: 150 }),

    Channel.create({ name: 'Welcome to the Jungle (LoL)', type: 'Debate', categoryId: 3, size: 100 }),
    Channel.create({ name: 'EA Lovers', type: 'Debate', categoryId: 3, size: 50 }),
    Channel.create({ name: 'Fanboys: Xbox vs. PS4', type: 'Debate', categoryId: 3, size: 200 }),
    Channel.create({ name: 'Get Smashed', type: 'Debate', categoryId: 3, size: 125 }),

    Channel.create({ name: 'Winter is Coming', type: 'Debate', categoryId: 4, size: 200 }),
    Channel.create({ name: 'Oscars Predictions', type: 'Debate', categoryId: 4, size: 250 }),
    Channel.create({ name: 'Basic Girls', type: 'Debate', categoryId: 4, size: 75 }),
  ])
  await console.log(`seeded ${channels.length} channels`)
}

module.exports = seedChannels;