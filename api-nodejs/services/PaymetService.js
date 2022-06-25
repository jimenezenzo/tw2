import axios from 'axios';

class PaymentService {

    async createPayment(productos) {

        const url = "https://api.mercadopago.com/checkout/preferences";

        const body = {
            payer_email: 'comprador@gmail.com',
            items: productos,
            // items: [
            //     {
            //         title: "Dummy Title",
            //         description: "Dummy description",
            //         picture_url: "http://www.myapp.com/myimage.jpg",
            //         category_id: "category123",
            //         quantity: 1,
            //         unit_price: 10
            //     }
            // ],
            // payer: {
            //     first_name: "Test",
            //     last_name: "Test",
            //     phone: {
            //       area_code: 11,
            //       number: "987654321"
            //     },
            //     address: {}
            // },
            // shipments: {
            //     receiver_address: {
            //       zip_code: "12312-123",
            //       state_name: "Rio de Janeiro",
            //       city_name: "Buzios",
            //       street_name: "Av das Nacoes Unidas",
            //       street_number: 3003
            //     }
            // },
            back_urls: {
                failure: "http://localhost:4200/estado-compra",
                pending: "http://localhost:4200/estado-compra",
                success: "http://localhost:4200/estado-compra"
            }
        };

        const payment = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        return payment.data;
    }

    async createSubscription() {
        
        const url = "https://api.mercadopago.com/preapproval";

        const body = {
            reason: "Suscripción de ejemplo",
            auto_recurring: {
                frequency: 1,
                frequency_type: "months",
                transaction_amount: 10,
                currency_id: "ARS"
            },
            back_url: "https://google.com.ar",
            payer_email: "test_user_46945293@testuser.com"
        };

        const subscription = await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
            }
        });

        return subscription.data;
    }
}

export default PaymentService;