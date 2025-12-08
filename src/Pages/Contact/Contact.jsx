import { useState } from "react";
import { motion } from "framer-motion";
import "./Contact.scss";

function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(""), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <motion.div
      className="contact"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="contact__container">
        <motion.h1
          className="contact__title"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Contactez-moi
        </motion.h1>


        <motion.form
          className="contact__form"
          onSubmit={handleSubmit}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className="contact__field">
            <label htmlFor="name" className="contact__label">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              className="contact__input"
              required
            />
          </div>

          <div className="contact__field">
            <label htmlFor="email" className="contact__label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              className="contact__input"
              required
            />
          </div>

          <div className="contact__field">
            <label htmlFor="message" className="contact__label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              className="contact__textarea"
              rows="6"
              required
            />
          </div>

          <button
            type="submit"
            className="contact__submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Envoi en cours..." : "Envoyer"}
          </button>

          {status === "success" && (
            <motion.p
              className="contact__message contact__message--success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✓ Message envoyé avec succès !
            </motion.p>
          )}

          {status === "error" && (
            <motion.p
              className="contact__message contact__message--error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ✗ Erreur lors de l'envoi. Réessayez plus tard.
            </motion.p>
          )}
        </motion.form>
      </div>
    </motion.div>
  );
}

export default Contact;