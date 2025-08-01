const {
  OrderDetail,
  Order,
  Customer,
  Treatment,
  Item,
  ShoePhoto,
} = require("../models");
const { Op } = require("sequelize");

const orderDetailController = {
  getByProcessTimeAndDateRange: async (req, res) => {
    try {
      const { processTime } = req.params;
      const { startDate, endDate, serviceType, searchQuery } = req.query;

      console.log("Received request:", {
        processTime,
        startDate,
        endDate,
        serviceType,
        searchQuery
      });

      // Definisikan ID treatment untuk masing-masing kategori
      const treatmentCategories = {
        cleaning: [1, 2, 21, 25], // ID untuk Deep Clean dan Outside Clean
        repair: [
          5, 6, 7, 8, 9, 10, 11, 12, 13, 35, 41, 43, 63, 64, 67, 71, 74, 75, 79,
          80, 81, 82,
        ], // ID untuk jenis Repair
      };

      const query = {
        where: {
          process_time: processTime,
          status: {
            [Op.or]: ["not_yet", null],
          },
          due_date: {
            [Op.between]: [startDate, endDate],
          },
        },
        include: [
          {
            model: Order,
            as: "order",
            include: [
              {
                model: Customer,
                as: "customer",
                attributes: ["name"],
                where: searchQuery ? {
                  name: {
                    [Op.like]: `%${searchQuery}%`
                  }
                } : {}
              },
            ],
          },
          {
            model: Treatment,
            as: "treatment",
            where: {
              [Op.and]: [
                serviceType ? {
                  id: {
                    [Op.in]: treatmentCategories[serviceType],
                  }
                } : {},
                searchQuery ? {
                  name: {
                    [Op.like]: `%${searchQuery}%`
                  }
                } : {}
              ]
            },
            attributes: ["id", "name", "type_service"],
          },
          {
            model: Item,
            as: "item",
            attributes: ["name"],
          },
          {
            model: ShoePhoto,
            as: "shoes_photos",
            attributes: ["url_photo"],
          },
        ],
        order: [["due_date", "ASC"]],
      };

      // Log query untuk debugging
      console.log("Query filter:", {
        treatmentIds: serviceType ? treatmentCategories[serviceType] : "all",
        processTime,
        dateRange: { startDate, endDate },
      });

      const orderDetails = await OrderDetail.findAll(query);

      // Log hasil untuk debugging
      console.log("Found orders:", {
        total: orderDetails.length,
        treatments: orderDetails.map((od) => ({
          id: od.treatment?.id,
          name: od.treatment?.name,
          type: od.treatment?.type_service,
        })),
      });

      return res.json({
        status: "success",
        data: orderDetails,
        meta: {
          total: orderDetails.length,
          filters: {
            processTime,
            serviceType,
            searchQuery,
            treatmentIds: serviceType ? treatmentCategories[serviceType] : null,
            dateRange: {
              start: startDate,
              end: endDate,
            },
          },
        },
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
        status: "error",
        message: "Gagal mengambil data orderan",
        error: error.message,
      });
    }
  },

  getAllOrderDetails: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;

      const query = {
        where: {
          status: {
            [Op.or]: ["not_yet", null],
          },
        },
      };

      // Tambahkan filter tanggal jika ada
      if (startDate && endDate) {
        query.where.due_date = {
          [Op.between]: [startDate, endDate],
        };
      }

      // Tambahkan includes
      query.include = [
        {
          model: Order,
          as: "order",
          include: [
            {
              model: Customer,
              as: "customer",
              attributes: ["name"],
            },
          ],
        },
        {
          model: Treatment,
          as: "treatment",
          attributes: ["name"],
        },
        {
          model: Item,
          as: "item",
          attributes: ["name"],
        },
        {
          model: ShoePhoto,
          as: "shoes_photos",
          attributes: ["url_photo"],
        },
      ];

      query.order = [["due_date", "ASC"]];

      const orderDetails = await OrderDetail.findAll(query);

      console.log(
        `Found ${orderDetails.length} total orders${
          startDate ? ` between ${startDate} and ${endDate}` : ""
        }`
      );

      return res.json({
        status: "success",
        data: orderDetails,
        meta: {
          total: orderDetails.length,
          filters: startDate
            ? {
                dateRange: {
                  start: startDate,
                  end: endDate,
                },
              }
            : null,
        },
      });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
        status: "error",
        message: "Gagal mengambil semua data orderan",
        error: error.message,
      });
    }
  },
};

module.exports = orderDetailController;
