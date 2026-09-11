import test from "node:test";
import assert from "node:assert/strict";
import { validarReporte, TITULO_MAX, DESCRIPCION_MAX } from "./reporteProblema.js";

const base = { tipo: "bug", titulo: "El escáner no lee", descripcion: "Paso el código y no pasa nada." };

test("rechaza un tipo fuera de la lista permitida", () => {
  assert.equal(validarReporte({ ...base, tipo: "queja" }), "Elige si es un problema o una sugerencia.");
});

test("rechaza un título vacío", () => {
  assert.equal(validarReporte({ ...base, titulo: "" }), "Escribe un título corto que resuma el problema.");
});

test("rechaza un título compuesto solo por espacios", () => {
  assert.equal(validarReporte({ ...base, titulo: "   " }), "Escribe un título corto que resuma el problema.");
});

test("rechaza un título que rebasa el límite", () => {
  assert.equal(
    validarReporte({ ...base, titulo: "a".repeat(TITULO_MAX + 1) }),
    `El título no puede pasar de ${TITULO_MAX} caracteres.`
  );
});

test("rechaza una descripción vacía", () => {
  assert.equal(validarReporte({ ...base, descripcion: "\n\n" }), "Cuenta qué pasó y qué esperabas que pasara.");
});

test("rechaza una descripción que rebasa el límite", () => {
  assert.equal(
    validarReporte({ ...base, descripcion: "a".repeat(DESCRIPCION_MAX + 1) }),
    `La descripción no puede pasar de ${DESCRIPCION_MAX} caracteres.`
  );
});

test("acepta un reporte completo válido", () => {
  assert.equal(validarReporte(base), null);
  assert.equal(validarReporte({ ...base, tipo: "sugerencia" }), null);
});
