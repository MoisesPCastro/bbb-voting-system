import test from 'node:test';
import assert from 'node:assert';
import { fetch } from 'undici';

const BASE_URL = 'http://localhost:3333/api';

test('Deve criar um candidato com sucesso', async () => {
    const response = await fetch(`${BASE_URL}/candidates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate: 'Fulano' })
    });

    assert.strictEqual(response.status, 201);
    const data = await response.json();
    assert.ok(data.message.includes('adicionado à lista de votação'), 'A resposta deve confirmar a adição do candidato.');
});

test('Deve retornar lista de candidatos', async () => {
    const response = await fetch(`${BASE_URL}/candidates`);

    assert.strictEqual(response.status, 200);
    const data = await response.json();
    assert.ok(Array.isArray(data.candidates), 'A resposta deve ser um array de candidatos');
});

test('Deve registrar um voto com sucesso', async () => {
    const response = await fetch(`${BASE_URL}/votes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            candidate: 'Fulano',
            recaptchaToken: 'fake-token-123456'
        })
    });

    assert.strictEqual(response.status, 200);
    const data = await response.json();
    assert.strictEqual(data.message, 'Voto enviado para processamento.');
});

test('Deve retornar estatísticas da votação', async () => {
    const response = await fetch(`${BASE_URL}/stats`);

    assert.strictEqual(response.status, 200);
    const data = await response.json();
    assert.ok(data.totalVotes >= 0, 'O total de votos deve ser um número');
});
