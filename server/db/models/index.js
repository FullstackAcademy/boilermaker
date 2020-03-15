const User = require('./user')
const Place = require('./place')
const Hotel = require('./hotel')
const Restaurant = require('./restaurant')
const Activity = require('./activity')
const {Op} = require('sequelize')

Hotel.belongsTo(Place)
Restaurant.belongsTo(Place)
Activity.belongsTo(Place)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Place.bbQuery = async function(minLat, maxLat, minLng, maxLng) {
  return await Place.findAll({
    where: {
      [Op.and]: [
        {
          latitude: {
            [Op.and]: [{[Op.lt]: maxLat}, {[Op.gt]: minLat}]
          },
          longitude: {
            [Op.and]: [{[Op.lt]: maxLng}, {[Op.gt]: minLng}]
          }
        }
      ]
    },
    attributes: ['address', 'city', 'state', 'phone', 'longitude', 'latitude']
  })
}

Activity.bbQuery = async function(minLat, maxLat, minLng, maxLng) {
  const activities = await Activity.findAll({
    include: [
      {
        model: Place,
        where: {
          [Op.and]: [
            {
              latitude: {
                [Op.and]: [{[Op.lt]: maxLat}, {[Op.gt]: minLat}]
              },
              longitude: {
                [Op.and]: [{[Op.lt]: maxLng}, {[Op.gt]: minLng}]
              }
            }
          ]
        }
      }
    ]
  })

  return activities
}

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Hotel,
  Restaurant,
  Activity,
  Place
}
