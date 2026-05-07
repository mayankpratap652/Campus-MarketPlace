let paypal = require('paypal-rest-sdk')

paypal.configure({
    mode: "sandbox",
    client_id: "AUZc_IQGRlUTeq9TLwHeVzDu7dL2CVui0bb5hyAln-o0Jd1DzDO3cgPMwpP7evhm8G7d2XAc4VXfNlkB",
    client_secret:"EKj4Z2xQUvDFgGYZzIvVd3Zk574xHUINtjX6xzil0MAxCvavESrU9-yyUYrekGBGipPxAaI-dxnSERDT",
});

module.exports = paypal;