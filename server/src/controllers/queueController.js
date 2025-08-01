const { OrderDetail, Order, Customer, Treatment, Item, Op, User, ShoePhoto } = require('../models');
const { successResponse, errorResponse } = require('../helpers/responseHelper');

class QueueController {
  static async getUserById(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      return res.json(successResponse(user));
    } catch (error) {
      return res.status(500).json(errorResponse(error.message));
    }
  }

  static async getOrderDetails(req, res) {
    try {
      const orders = await OrderDetail.findAll({
        where: {
          status: {
            [Op.or]: ["not_yet", null]
          }
        }
      });
      return res.json(successResponse(orders));
    } catch (error) {
      return res.status(500).json(errorResponse(error.message));
    }
  }

  static async getTreatmentDetails(req, res) {
    try {
      const treatments = await OrderDetail.findAll({
        where: {
          status: {
            [Op.or]: ["not_yet", null]
          }
        },
        include: [
          {
            model: Order,
            as: 'order',
            include: [{
              model: Customer,
              as: 'customer',
              attributes: ['name']
            }]
          },
          {
            model: Treatment,
            as: 'treatment',
            attributes: ['name']
          },
          {
            model: Item,
            as: 'item',
            attributes: ['name']
          }
        ],
        order: [['due_date', 'ASC']]
      });

      return res.json(successResponse(treatments));
    } catch (error) {
      return res.status(500).json(errorResponse(error.message));
    }
  }

  static async getOrderDetailsByProcessTime(req, res) {
    try {
      const processTime = req.params.processTime;
      const allowedProcessTimes = ['regular', 'next_day', 'same_day'];
      
      if (!allowedProcessTimes.includes(processTime)) {
        return res.status(400).json(
          errorResponse('Process time tidak valid. Gunakan: regular, next_day, atau same_day')
        );
      }

      const orders = await OrderDetail.findAll({
        where: {
          process_time: processTime,
          status: {
            [Op.or]: ["not_yet", null]
          }
        },
        include: [
          {
            model: Order,
            as: 'order',
            include: [{
              model: Customer,
              as: 'customer',
              attributes: ['name']
            }]
          },
          {
            model: Treatment,
            as: 'treatment',
            attributes: ['name']
          },
          {
            model: Item,
            as: 'item',
            attributes: ['name']
          },
          {
            model: ShoePhoto,
            as: 'shoes_photos',
            attributes: ['url_photo']
          }
        ],
        order: [['due_date', 'ASC']]
      });

      return res.json(successResponse(orders));
    } catch (error) {
      return res.status(500).json(errorResponse(error.message));
    }
  }
}

module.exports = QueueController;