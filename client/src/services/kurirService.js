import axios from 'axios';

const API_BASE_URL = 'https://api.katsikat.id';

export const getKurirAntrianData = async (dateRange) => {
  try {
    // Ambil data orders dengan parameter yang sama seperti kasir
    const response = await axios.get(`${API_BASE_URL}/orders`, {
      params: {
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        pageSize: 1000,
        page: 1
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });

    // Pastikan response sesuai dengan pola kasir
    if (response.data && response.data.data && response.data.data.orders) {
      const ordersArray = Array.isArray(response.data.data.orders)
        ? response.data.data.orders
        : [];

      console.log('API Response - Orders:', ordersArray.length);
      if (ordersArray.length > 0) {
        console.log('Sample Order:', {
          id: ordersArray[0].id,
          order_details: ordersArray[0].order_details?.length || 0
        });
        if (ordersArray[0].order_details && ordersArray[0].order_details.length > 0) {
          console.log('Sample Order Detail:', {
            id: ordersArray[0].order_details[0].id,
            delivery_status: ordersArray[0].order_details[0].delivery_status,
            pickup_method: ordersArray[0].order_details[0].pickup_method,
            delivery_date: ordersArray[0].order_details[0].delivery_date
          });
        }
      }

      // FLATTEN order_details seperti di kasir
      const allDetails = ordersArray.flatMap(order =>
        Array.isArray(order.order_details)
          ? order.order_details.map(detail => ({ ...detail, order }))
          : []
      );

      // FILTER KHUSUS KURIR berdasarkan delivery_status dan pickup_method
      const filteredDelivery = allDetails.filter(
        detail =>
          detail.delivery_status === 'scheduled' &&
          detail.pickup_method === 'delivery' &&
          detail.delivery_date >= dateRange.startDate &&
          detail.delivery_date <= dateRange.endDate
      );

      const filteredPickup = allDetails.filter(
        detail =>
          detail.delivery_status === 'scheduled' &&
          detail.pickup_method === 'pickup' &&
          detail.delivery_date >= dateRange.startDate &&
          detail.delivery_date <= dateRange.endDate
      );

      console.log('Filter details:', {
        dateRange,
        totalDetails: allDetails.length,
        scheduledDetails: allDetails.filter(d => d.delivery_status === 'scheduled').length,
        statusDetails: allDetails.filter(d => d.status === 'siap').length,
        deliveryDetails: allDetails.filter(d => d.pickup_method === 'delivery').length,
        pickupDetails: allDetails.filter(d => d.pickup_method === 'pickup').length,
        scheduledAndDelivery: allDetails.filter(d => d.delivery_status === 'scheduled' && d.pickup_method === 'delivery').length,
        scheduledAndPickup: allDetails.filter(d => d.delivery_status === 'scheduled' && d.pickup_method === 'pickup').length,
        filteredDelivery: filteredDelivery.length,
        filteredPickup: filteredPickup.length
      });

      // MAP ke format frontend untuk delivery
      const transformedDelivery = filteredDelivery.map(detail => ({
        id: detail.id,
        customerName: detail.order?.customer?.name || 'N/A',
        address: detail.order?.customer?.address || 'N/A',
        phone: detail.order?.customer?.phone || 'N/A',
        requestTime: detail.delivery_date && detail.delivery_time
          ? new Date(`${detail.delivery_date}T${detail.delivery_time}`)
          : new Date(),
        googleMapsUrl: detail.order?.customer?.gmaps || '-',
        status: detail.delivery_status || detail.status || 'siap',
        delivery_status: detail.delivery_status || 'scheduled',
        pickup_method: detail.pickup_method,
        type: 'delivery'
      }));

      // MAP ke format frontend untuk pickup
      const transformedPickup = filteredPickup.map(detail => ({
        id: detail.id,
        customerName: detail.order?.customer?.name || 'N/A',
        address: detail.order?.customer?.address || 'N/A',
        phone: detail.order?.customer?.phone || 'N/A',
        requestTime: detail.delivery_date && detail.delivery_time
          ? new Date(`${detail.delivery_date}T${detail.delivery_time}`)
          : new Date(),
        googleMapsUrl: detail.order?.customer?.gmaps || '-',
        status: detail.delivery_status || detail.status || 'siap',
        pickup_method: detail.pickup_method,
        type: 'pickup'
      }));

      // Gabungkan data pickup dan delivery
      const transformedData = [...transformedPickup, ...transformedDelivery];

      // Validasi data sebelum dikembalikan
      const validData = transformedData.filter(item => 
        item.customerName !== 'N/A' && 
        item.address !== 'N/A' && 
        item.phone !== 'N/A'
      );

      // Log data yang tidak valid untuk debugging
      const invalidData = transformedData.filter(item => 
        item.customerName === 'N/A' || 
        item.address === 'N/A' || 
        item.phone === 'N/A'
      );
      
      if (invalidData.length > 0) {
        console.log('Invalid data found:', invalidData.slice(0, 3));
      }

      console.log('Kurir data:', {
        totalOrders: ordersArray.length,
        totalDetails: allDetails.length,
        filteredPickup: filteredPickup.length,
        filteredDelivery: filteredDelivery.length,
        validPickup: transformedPickup.filter(item => 
          item.customerName !== 'N/A' && 
          item.address !== 'N/A' && 
          item.phone !== 'N/A'
        ).length,
        validDelivery: transformedDelivery.filter(item => 
          item.customerName !== 'N/A' && 
          item.address !== 'N/A' && 
          item.phone !== 'N/A'
        ).length,
        validData: validData.length,
        finalPickupCount: validData.filter(item => item.pickup_method === 'pickup').length,
        finalDeliveryCount: validData.filter(item => item.pickup_method === 'delivery').length,
        sampleData: validData.slice(0, 2).map(item => ({
          id: item.id,
          status: item.status,
          pickup_method: item.pickup_method,
          type: item.type,
          customerName: item.customerName
        }))
      });

      return validData;
    }

    return [];
  } catch (error) {
    console.error('Error fetching kurir antrian data:', error);
    if (error.response?.status === 401) {
      console.error('Token tidak valid atau expired');
      // Redirect ke login jika token expired
      window.location.href = '/login';
    }
    return [];
  }
};

export const updateOrderStatus = async (orderDetailId, status) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/order-details/${orderDetailId}`, {
      delivery_status: status
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error updating order detail status:', error);
    if (error.response?.status === 401) {
      console.error('Token tidak valid atau expired');
      window.location.href = '/login';
    }
    throw error;
  }
}; 