import assert from 'node:assert/strict';
import { test } from 'node:test';
import { ErrorApi, TIPO_ERROR, tipoPorStatus } from '../src/api/errores.js';
import { esSlugValido } from '../src/utils/validacion.js';

test('clasifica los códigos HTTP', () => {
  assert.equal(tipoPorStatus(404), TIPO_ERROR.NO_ENCONTRADO);
  assert.equal(tipoPorStatus(500), TIPO_ERROR.SERVIDOR);
  assert.equal(tipoPorStatus(503), TIPO_ERROR.SERVIDOR);
  assert.equal(tipoPorStatus(400), TIPO_ERROR.SOLICITUD);
});

test('solo los errores transitorios son reintentables', () => {
  assert.equal(new ErrorApi(TIPO_ERROR.RED).reintentable, true);
  assert.equal(new ErrorApi(TIPO_ERROR.SERVIDOR, 500).reintentable, true);
  assert.equal(new ErrorApi(TIPO_ERROR.NO_ENCONTRADO, 404).reintentable, false);
});

test('valida el slug de categoría', () => {
  assert.equal(esSlugValido('ciencia-ficcion'), true);
  assert.equal(esSlugValido('Ficción'), false);
  assert.equal(esSlugValido('a&categoria=b'), false);
  assert.equal(esSlugValido('../admin'), false);
  assert.equal(esSlugValido(''), false);
});
