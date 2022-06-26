const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const assert = chai.assert;

describe("Matrix raised to power by element test", function () {
    this.timeout(100000000);

    it("should raise a 3 by 3 matrix to third power", async () => {
        const circuit = await wasm_tester(path.join(__dirname, "circuits", "matPow_test.circom"));
        //await circuit.loadConstraints();
        //assert.equal(circuit.nVars, 64);
        //assert.equal(circuit.constraints.length, 54);

        const INPUT = {
            "a": [["1","2","3"],["4","5","6"],["7","8","9"]]
        }

        const witness = await circuit.calculateWitness(INPUT, true);

        //console.log(witness);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(9*52)));
        assert(Fr.eq(Fr.e(witness[2]),Fr.e(9*64)));
        assert(Fr.eq(Fr.e(witness[3]),Fr.e(9*76)));
        assert(Fr.eq(Fr.e(witness[4]),Fr.e(9*118)));
        assert(Fr.eq(Fr.e(witness[5]),Fr.e(9*145)));
        assert(Fr.eq(Fr.e(witness[6]),Fr.e(9*172)));
        assert(Fr.eq(Fr.e(witness[7]),Fr.e(9*184)));
        assert(Fr.eq(Fr.e(witness[8]),Fr.e(9*226)));
        assert(Fr.eq(Fr.e(witness[9]),Fr.e(9*268)));
    });
});