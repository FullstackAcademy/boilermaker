const db = require('../server/db')
const { User } = require('../server/db/models')

const seedUsers = async function () {
    const users = await Promise.all([
        /********************** USERS **********************/
        User.create({ firstName: 'Mike', lastName: 'Perry', userName: 'mikeyboy', email: 'mike@gmail.com', password: 'mike', admin: false }),
        User.create({ firstName: 'Harry', lastName: 'Kane', userName: 'kaney69', email: 'harry@gmail.com', password: 'harry', admin: false }),
        User.create({ firstName: 'Max', lastName: 'Valley', userName: 'maxipad', email: 'max@gmail.com', password: 'max', admin: false }),
        User.create({ firstName: 'Gary', lastName: 'Snail', userName: 'garysnail', email: 'gary@gmail.com', password: 'gary', admin: false }),
        User.create({ firstName: 'Corey', lastName: 'Hash', userName: 'hardcorey', email: 'corey@gmail.com', password: 'corey', admin: false }),
        User.create({ firstName: 'Dwight', lastName: 'Schrute', userName: 'nerdboi', email: 'dwight@gmail.com', password: 'dwight', admin: false }),
        User.create({ firstName: 'Kelly', lastName: 'Fair', userName: 'kellersmeller', email: 'kelly@gmail.com', password: 'kelly', admin: false }),
        User.create({ firstName: 'Hermoine', lastName: 'Wizard', userName: 'elwizard', email: 'hermoine@gmail.com', password: 'hermoine', admin: false }),
        User.create({ firstName: 'Jesus', lastName: 'Christ', userName: 'gogodgo', email: 'jesus@gmail.com', password: 'jesus', admin: false }),
        User.create({ firstName: 'Robin', lastName: 'Hood', userName: 'theify', email: 'robin@gmail.com', password: 'robin', admin: false }),
        User.create({ firstName: 'Alex', lastName: 'Aire', userName: 'wootwoot', email: 'alex@gmail.com', password: 'alex', admin: false }),
        User.create({ firstName: 'Mary', lastName: 'Harder', userName: 'marybeary', email: 'mary@gmail.com', password: 'mary', admin: false }),
        User.create({ firstName: 'Richard', lastName: 'Schmell', userName: 'smellydude', email: 'richard@gmail.com', password: 'richard', admin: false }),
        User.create({ firstName: 'Katelyn', lastName: 'Robbo', userName: 'tweakergirl', email: 'katelyn@gmail.com', password: 'katelyn', admin: false }),
        User.create({ firstName: 'Julia', lastName: 'Goolia', userName: 'ghoulie', email: 'julia@gmail.com', password: 'julia', admin: false }),
        User.create({ firstName: 'Rider', lastName: 'Lame', userName: 'lamerider', email: 'rider@gmail.com', password: 'rider', admin: false }),
        User.create({ firstName: 'Jeff', lastName: 'Sut', userName: 'sutterfutter', email: 'jeff@gmail.com', password: 'jeff', admin: false }),
        User.create({ firstName: 'Chris', lastName: 'Wiggle', userName: 'picklewiggle', email: 'chris@gmail.com', password: 'chris', admin: false }),
        User.create({ firstName: 'Spock', lastName: 'Trek', userName: 'kir4live', email: 'spock@gmail.com', password: 'spock', admin: false }),
        User.create({ firstName: 'Kylo', lastName: 'Swolo', userName: 'soswoll', email: 'kylo@gmail.com', password: 'kylo', admin: false }),
        /********************** ADMINS **********************/
        User.create({ firstName: 'Luke', lastName: 'Skywalker', userName: 'daddyissues', email: 'luke@gmail.com', password: 'luke', admin: true }),
        User.create({ firstName: 'Dwayne', lastName: 'Rock', userName: 'hardo', email: 'dwayne@gmail.com', password: 'dwayne', admin: true }),
        User.create({ firstName: 'asdf', lastName: 'asdf', userName: 'asdf', email: 'asdf@gmail.com', password: 'asdf', admin: true }),
    ])
    await console.log(`seeded ${users.length} users`)
}

module.exports = seedUsers;