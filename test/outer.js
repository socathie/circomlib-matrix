const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const assert = chai.assert;

describe("Outer product test", function () {
    this.timeout(100000000);

    it("should compute the outer product of two vectors", async () => {
        const circuit = await wasm_tester(path.join(__dirname, "circuits", "outer_test.circom"));
        //await circuit.loadConstraints();
        //assert.equal(circuit.nVars, 12);
        //assert.equal(circuit.constraints.length, 6);

        const INPUT = {
            "a": ["1","2"],
            "b": ["3","4","5"]
        }

        const witness = await circuit.calculateWitness(INPUT, true);

        //console.log(witness);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(1*3)));
        assert(Fr.eq(Fr.e(witness[2]),Fr.e(1*4)));
        assert(Fr.eq(Fr.e(witness[3]),Fr.e(1*5)));
        assert(Fr.eq(Fr.e(witness[4]),Fr.e(2*3)));
        assert(Fr.eq(Fr.e(witness[5]),Fr.e(2*4)));
        assert(Fr.eq(Fr.e(witness[6]),Fr.e(2*5)));
    });
});