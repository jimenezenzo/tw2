import axios from 'axios';

class PaymentService {

    async createPayment(productos) {

        const url = "https://api.mercadopago.com/checkout/preferences";

        const body = {
            items: productos,
            external_reference: "Taller Web 2", 
            payer: { 
              name: "Lalo",
              surname: "Landa",
              email: "test_user_34224223@testuser.com", 
              phone: {
                area_code: "11",
                number: "22223333"
              },
              address: {
                zip_code: "1111",
                street_name: "False",
                street_number: "123"
              }
            }, 
            payment_methods: {
              excluded_payment_methods: [
                {
                  id: "amex"
                }
              ],
              excluded_payment_types: [{ id: "atm" }],
              installments: 6, 
              default_installments: 6 
            }, 
            //notification_url: "http://localhost:4000/api/webhook", 
            back_urls: {
                failure: "http://localhost:4200",
                pending: "http://localhost:4200",
                success: "http://localhost:4200"
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
}

export default PaymentService;