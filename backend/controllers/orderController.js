const nodemailer = require('nodemailer');

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const createTransporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });
};

const sendEmail = async (transporter, mailOptions, retries = 3) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            console.log(`Tentative d'envoi d'email (${attempt}/${retries}) à: ${mailOptions.to}`);
            const info = await transporter.sendMail(mailOptions);
            console.log(`Email envoyé avec succès à ${mailOptions.to}:`, info.messageId);
            return info;
        } catch (error) {
            console.error(`Erreur lors de la tentative ${attempt}:`, error);
            if (attempt === retries) throw error;
            await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
    }
};

const sendOrderConfirmation = async (req, res) => {
    try {
        const { items, totalAmount, customerEmail } = req.body;
        
        // Validation des données
        if (!items || !Array.isArray(items) || items.length === 0) {
            throw new Error('Les détails de la commande sont invalides');
        }
        if (!totalAmount || isNaN(totalAmount)) {
            throw new Error('Le montant total est invalide');
        }
        if (!customerEmail || !validateEmail(customerEmail)) {
            throw new Error('L\'adresse email du client est invalide');
        }

        console.log('Données de commande validées:', { 
            itemCount: items.length, 
            totalAmount, 
            customerEmail 
        });

        const transporter = createTransporter();

        // Email pour le client
        const customerMailOptions = {
            from: process.env.EMAIL_USER,
            to: customerEmail,
            subject: 'Confirmation de votre commande - BintaShop',
            html: `
                <h1>Merci pour votre commande !</h1>
                <p>Votre commande a bien été enregistrée.</p>
                <h2>Détails de la commande :</h2>
                <ul>
                    ${items.map(item => `<li>${item.name} - Quantité: ${item.quantity} - Prix: ${item.price}€</li>`).join('')}
                </ul>
                <p><strong>Total : ${totalAmount}€</strong></p>
                <p>Nous vous remercions de votre confiance !</p>
                <p>L'équipe BintaShop</p>
            `
        };

        // Email pour l'administrateur
        const adminMailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: 'Nouvelle commande reçue - BintaShop',
            html: `
                <h1>Nouvelle commande reçue</h1>
                <p>Une nouvelle commande a été passée par : ${customerEmail}</p>
                <h2>Détails de la commande :</h2>
                <ul>
                    ${items.map(item => `<li>${item.name} - Quantité: ${item.quantity} - Prix: ${item.price}€</li>`).join('')}
                </ul>
                <p><strong>Total : ${totalAmount}€</strong></p>
            `
        };

        // Envoi des emails avec retry
        const [clientInfo, adminInfo] = await Promise.all([
            sendEmail(transporter, customerMailOptions),
            sendEmail(transporter, adminMailOptions)
        ]);

        res.status(200).json({ 
            success: true,
            message: 'Emails de confirmation envoyés avec succès',
            clientEmailId: clientInfo.messageId,
            adminEmailId: adminInfo.messageId
        });
    } catch (error) {
        console.error('Erreur lors du processus de confirmation:', error);
        res.status(500).json({ 
            success: false,
            message: 'Erreur lors de l\'envoi des emails de confirmation',
            error: error.message,
            details: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

module.exports = {
    sendOrderConfirmation
};
