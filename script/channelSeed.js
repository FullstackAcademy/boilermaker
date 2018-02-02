const db = require('../server/db')
const { Channel } = require('../server/db/models')

const seedChannels = async function () {
  const channels = await Promise.all([
    Channel.create({ name: 'Politico Hardos', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 1, size: 250 }),
    Channel.create({ name: 'NYC Town Hall', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 1, size: 200 }),

    Channel.create({ name: 'Herro Prease', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 3, size: 150 }),

    Channel.create({ name: 'Welcome to the Jungle', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 2, size: 100 }),
    Channel.create({ name: 'EA Lovers', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 2, size: 50 }),
    Channel.create({ name: 'Fanboys Xbox vs PS4', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 2, size: 200 }),
    Channel.create({ name: 'Get Smashed', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 2, size: 125 }),

    Channel.create({ name: 'Winter is Coming', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 5, size: 200 }),
    Channel.create({ name: 'Oscars Predictions', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 5, size: 250 }),
    Channel.create({ name: 'Basic Girls', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 5, size: 75 }),

    Channel.create({ name: 'Roger Gooddell 4 President', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 4, size: 200 }),
    Channel.create({ name: 'ESPN Sucks', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 4, size: 250 }),
    Channel.create({ name: 'NBA MVP Candidanpmtes', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 4, size: 75 }),

    Channel.create({ name: 'The Symbolif Motif', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 6, size: 200 }),
    Channel.create({ name: 'themes THemes THEMES', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 6, size: 250 }),
    Channel.create({ name: 'Boo Radley Fan Club', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 6, size: 75 }),

    Channel.create({ name: 'Fantasy Pros', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 7, size: 200 }),
    Channel.create({ name: 'Worst Fantasy Sport', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 7, size: 250 }),
    Channel.create({ name: 'What should be next fantasy sport', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 7, size: 75 }),

    Channel.create({ name: 'Fatty McGoos', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 8, size: 200 }),
    Channel.create({ name: '820 Good Eatz', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 8, size: 250 }),
    Channel.create({ name: 'Greasy Meals', type: 'Debate', description: 'BLANK DESCRIPTION', categoryId: 8, size: 75 }),
  ])
  await console.log(`seeded ${channels.length} channels`)
}

module.exports = seedChannels;