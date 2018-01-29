const db = require('../server/db')
const { User } = require('../server/db/models')

const seedUsers = async function () {
    const users = await Promise.all([
        /********************** USERS **********************/
        User.create({ name: 'Mike Perry', userName: 'mikeyboy', email: 'mike@gmail.com', password: 'mike', admin: false }),
        User.create({ name: 'Harry Kane', userName: 'kaney69', email: 'harry@gmail.com', password: 'harry', admin: false }),
        User.create({ name: 'Max Valley', userName: 'maxipad', email: 'max@gmail.com', password: 'max', admin: false }),
        User.create({ name: 'Gary Snail', userName: 'garysnail', email: 'gary@gmail.com', password: 'gary', admin: false }),
        User.create({ name: 'Corey Hash', userName: 'hardcorey', email: 'corey@gmail.com', password: 'corey', admin: false }),
        User.create({ name: 'Dwight Schrute', userName: 'nerdboi', email: 'dwight@gmail.com', password: 'dwight', admin: false }),
        User.create({ name: 'Kelly Fair', userName: 'kellersmeller', email: 'kelly@gmail.com', password: 'kelly', admin: false }),
        User.create({ name: 'Hermoine Wizard', userName: 'elwizard', email: 'hermoine@gmail.com', password: 'hermoine', admin: false }),
        User.create({ name: 'Jesus Christ', userName: 'gogodgo', email: 'jesus@gmail.com', password: 'jesus', admin: false }),
        User.create({ name: 'Robin Hood', userName: 'theify', email: 'robin@gmail.com', password: 'robin', admin: false }),
        User.create({ name: 'Alex Aire', userName: 'wootwoot', email: 'alex@gmail.com', password: 'alex', admin: false }),
        User.create({ name: 'Mary Harder', userName: 'marybeary', email: 'mary@gmail.com', password: 'mary', admin: false }),
        User.create({ name: 'Richard Schmell', userName: 'smellydude', email: 'richard@gmail.com', password: 'richard', admin: false }),
        User.create({ name: 'Katelyn Robbo', userName: 'tweakergirl', email: 'katelyn@gmail.com', password: 'katelyn', admin: false }),
        User.create({ name: 'Julia Goolia', userName: 'ghoulie', email: 'julia@gmail.com', password: 'julia', admin: false }),
        User.create({ name: 'Rider Lame', userName: 'lamerider', email: 'rider@gmail.com', password: 'rider', admin: false }),
        User.create({ name: 'Jeff Sut', userName: 'sutterfutter', email: 'jeff@gmail.com', password: 'jeff', admin: false }),
        User.create({ name: 'Chris Wiggle', userName: 'picklewiggle', email: 'chris@gmail.com', password: 'chris', admin: false }),
        User.create({ name: 'Spock Trek', userName: 'kir4live', email: 'spock@gmail.com', password: 'spock', admin: false }),
        User.create({ name: 'Kylo Swolo', userName: 'soswoll', email: 'kylo@gmail.com', password: 'kylo', admin: false }),
        /********************** ADMINS **********************/
        User.create({ name: 'Luke Skywalker', userName: 'daddyissues', email: 'luke@gmail.com', password: 'luke', admin: true }),
        User.create({ name: 'Dwayne Rock', userName: 'hardo', email: 'dwayne@gmail.com', password: 'dwayne', admin: true }),
        User.create({ name: 'asdf asdf', userName: 'asdf', email: 'asdf@gmail.com', password: 'asdf', admin: true }),
    ])
    await console.log(`seeded ${users.length} users`)
}

module.exports = seedUsers;