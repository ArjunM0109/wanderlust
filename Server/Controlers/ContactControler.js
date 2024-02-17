const Contact = require("../Models/ContactSchema");

const contact = async (req, res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({ message: "message sent successfully" });
    } catch (error) {
        return res.status(500).json({ message: "message not delivered" });
    }
}

module.exports = {contact};