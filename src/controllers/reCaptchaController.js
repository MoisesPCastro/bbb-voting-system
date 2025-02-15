class ReCaptchaController {

    async generateToken(_req, res) {

        try {
            const siteKey = process.env.RECAPTCHA_SITE_KEY;

            if (!siteKey) {
                return res.status(500).json({ error: "Chave pública do reCAPTCHA não configurada." });
            }

            //TODO Simular a geração do token pelo Google no front-end
            const token = `fake-token-${Date.now()}`; // Token fictício para testes

            return res.json({ recaptchaToken: token });
        } catch (error) {
            console.error("Erro ao gerar o token do reCAPTCHA:", error);
            return res.status(500).json({ error: "Erro interno ao gerar token do reCAPTCHA." });
        }
    };
}

export default new ReCaptchaController();
