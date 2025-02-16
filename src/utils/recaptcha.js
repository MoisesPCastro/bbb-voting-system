import axios from 'axios';
import logger from '../utils/logger.js';

export async function verifyRecaptcha(token) {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    /**
     * TODO: Simulação de validação do Google reCAPTCHA
     *
     *  O token reCAPTCHA normalmente deve ser gerado no front-end usando `grecaptcha.execute()`
     *  No fluxo real, o front-end envia esse token na requisição para o back-end.
     *  O back-end então faz uma requisição à API do Google reCAPTCHA para verificar se o token é válido.
     *
     *  Como não temos um front-end integrado neste teste, vou simular a resposta do Google.
     *  Qualquer token que começar com "fake-token-" será considerado válido para fins de teste local.
     *  Isso permite que a API funcione sem necessidade de uma implementação real do reCAPTCHA no front-end.
     *
     * IMPORTANTE: Essa simulação deve ser **removida em produção** e substituída pela validação real com o Google reCAPTCHA.
     */
    if (token.startsWith("fake-token-")) {
        return true;
    }

    if (!secretKey) {
        throw new Error('Chave secreta do reCAPTCHA não está configurada.');
    }

    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify`,
            null,
            {
                params: {
                    secret: secretKey,
                    response: token
                }
            }
        );

        return response.data.success;
    } catch (error) {
        logger.error(`Erro ao consultar validação no recaptha: ${error.message}`);
        console.error('Erro na verificação do reCAPTCHA:', error);
        return false;
    }
}
