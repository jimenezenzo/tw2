class PaymentController {

    constructor(subscriptionService) {
      this.subscriptionService = subscriptionService;
    }
  
    async getPaymentLink(req, res) {
      try {
        const {items} = req.body

        const payment = await this.subscriptionService.createPayment(items);
  
        return res.json(payment);
      } catch (error) {
        console.log(error);
  
        return res.status(500).json({ error: true, msg: "Failed to create payment" });
      }
    }
  
    webhook(req, res) { 
      if (req.method === "POST") { 
        let body = ""; 
        req.on("data", chunk => {  
          body += chunk.toString();
        });
        req.on("end", () => {  
          console.log(body, "webhook response"); 
          res.end("ok");
        });
      }
      return res.status(200); 
    }
}
  
export default PaymentController;